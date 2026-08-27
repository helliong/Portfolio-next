import { redirect } from "next/navigation";

/** Redirects the legacy pricing URL to the default localized pricing page. */
export default function PricingPage() {
  redirect("/en/pricing");
}
