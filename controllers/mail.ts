import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function sendMail(email, code) {
  try {
    const respuesta = await resend.emails.send({
      from: `Password Code <onboarding@resend.dev>`,
      to: ["gonza.cunet@outlook.com"], //acá iría el email
      subject: "Login Code",
      html: `Tu código de acceso es: <strong>${code}</strong>.`,
    });
  } catch (error) {
    throw error;
  }
}
