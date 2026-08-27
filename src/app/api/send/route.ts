import { createHmac } from "node:crypto";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

export const runtime = "nodejs";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const deploymentEnvironment = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development";
const isVercelDeployment = process.env.VERCEL === "1";

// Keep the Redis client outside the handler so warm Vercel instances can reuse it.
const redis =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

const rateLimitMax = 1;
const rateLimitWindowMs = 3 * 60 * 1_000;

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

// Each accepted request resets the key TTL, so the window starts at the last message.
const rateLimitScript = `
  local current = tonumber(redis.call("GET", KEYS[1]) or "0")
  if current >= tonumber(ARGV[1]) then
    local ttl = redis.call("PTTL", KEYS[1])
    return {0, current, ttl}
  end
  current = redis.call("INCR", KEYS[1])
  redis.call("PEXPIRE", KEYS[1], ARGV[2])
  return {1, current, tonumber(ARGV[2])}
`;

const allowedProjectTypes = new Set([
  "Landing page",
  "Business card website",
  "Online store",
  "Web application / MVP",
  "Additional services",
  "Employment opportunity",
]);

type ContactRequest = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

/** Returns the public client IP supplied by Vercel or another trusted proxy. */
function getClientIp(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip")
  )
    ?.split(",")[0]
    .trim();
}

/** Creates a stable Redis key without storing the raw client IP address. */
function getRateLimitIdentifier(ip: string) {
  // The Redis token is already a server-only secret and prevents storing raw IPs in Redis keys.
  return createHmac("sha256", redisToken!).update(ip).digest("hex");
}

/** Applies an inactivity window independently to project and employment forms. */
async function applyRateLimit(ip: string, category: "project" | "employment"): Promise<RateLimitResult | null> {
  if (!redis) return null;

  const key = `portfolio:${deploymentEnvironment}:contact-v2:${category}:${getRateLimitIdentifier(ip)}`;
  const [allowed, count, ttl] = await redis.eval<
    [string, string],
    [number, number, number]
  >(
    rateLimitScript,
    [key],
    [String(rateLimitMax), String(rateLimitWindowMs)],
  );
  const safeTtl = Math.max(1_000, Number(ttl));

  return {
    success: Number(allowed) === 1,
    limit: rateLimitMax,
    remaining: Math.max(0, rateLimitMax - Number(count)),
    resetAt: Date.now() + safeTtl,
    retryAfter: Math.max(1, Math.ceil(safeTtl / 1_000)),
  };
}

/** Normalizes and validates untrusted JSON before it reaches the email provider. */
function parseContactRequest(value: unknown): ContactRequest | null {
  if (!value || typeof value !== "object") return null;

  const body = value as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const projectType =
    typeof body.projectType === "string" ? body.projectType.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !name ||
    name.length > 100 ||
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !projectType ||
    !message ||
    (projectType === "Additional services" && message.length < 20) ||
    message.length > 5_000 ||
    !allowedProjectTypes.has(projectType)
  ) {
    return null;
  }

  return { name, email, projectType, message };
}

/** Escapes user-provided values before inserting them into the email HTML. */
function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );
}

/** Rate-limits, validates, and forwards a contact form submission to Resend. */
export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return Response.json(
        { success: false, message: "Service temporarily unavailable" },
        { status: 503 },
      );
    }

    if (!redis && isVercelDeployment) {
      console.error("Missing Upstash Redis environment variables");
      return Response.json(
        { success: false, message: "Service temporarily unavailable" },
        { status: 503 },
      );
    }

    const ip = getClientIp(request);

    if (!ip && isVercelDeployment) {
      return Response.json(
        { success: false, message: "Unable to identify request source" },
        { status: 400 },
      );
    }

    let rawBody: unknown;

    try {
      rawBody = await request.json();
    } catch {
      return Response.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      );
    }

    const contactRequest = parseContactRequest(rawBody);

    if (!contactRequest) {
      return Response.json(
        { success: false, message: "Invalid form data" },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, projectType, message } = contactRequest;
    const category = projectType === "Employment opportunity" ? "employment" : "project";
    const rateLimit = await applyRateLimit(ip ?? "local-development", category);

    if (rateLimit && !rateLimit.success) {
      return Response.json(
        {
          success: false,
          code: "RATE_LIMITED",
          message: "Too many requests",
          retryAfter: rateLimit.retryAfter,
          rateLimit,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetAt),
          },
        },
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "saoffabg@gmail.com",
      subject: `${projectType === "Employment opportunity" ? "New employment offer" : "New request"} from ${name}`,
      replyTo: email,
      html: `
        <h2>${projectType === "Employment opportunity" ? "New Employment Offer" : "New Project Request"}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectType || "not specified")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { success: false, message: "Failed to send email" },
        { status: 502 },
      );
    }

    return Response.json({ success: true, rateLimit });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: "Failed to send email" },
      { status: 500 },
    );
  }
}
