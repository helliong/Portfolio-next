import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json();

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "saoffabg@gmail.com",
      subject: `New request from ${name}`,
      replyTo: email,
      html: `
        <h2>New Project Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project type:</strong> ${projectType || "not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: "Failed to send email" },
      { status: 500 },
    );
  }
}