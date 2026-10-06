import { createServerFn } from "@tanstack/react-start";

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  source?: string;
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadFormData) => data)
  .handler(async ({ data }) => {
    const { name, email, phone, source = "Landing Page" } = data;

    const apiKey = typeof process !== "undefined" ? process.env?.RESEND_API_KEY : undefined;
    const toEmail =
      (typeof process !== "undefined" && process.env?.RESEND_TO_EMAIL) || "contato@cemip.med.br";
    const fromEmail =
      (typeof process !== "undefined" && process.env?.RESEND_FROM_EMAIL) ||
      "CEMIP Coworking <onboarding@resend.dev>";

    if (!apiKey) {
      console.error("RESEND_API_KEY não foi encontrada nas variáveis de ambiente (.env).");
      return {
        success: false,
        error: "Configuração de envio incompleta no servidor (RESEND_API_KEY ausente).",
      };
    }

    if (!name || !email || !phone) {
      throw new Error("Nome, e-mail e celular são obrigatórios.");
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const now = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: "short",
      timeStyle: "short",
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Novo Lead - Coworking CEMIP</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f8f6; margin: 0; padding: 24px; color: #242b24;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e3e8e2; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    <div style="background: linear-gradient(135deg, #4d6b53 0%, #3a543f 100%); padding: 28px 24px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 600;">Novo Contato para Coworking Médico</h1>
      <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Recebido através da Landing Page (CEMIP Pacaembu)</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; color: #647466; font-size: 13px; width: 120px;">Nome:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; font-weight: 600; font-size: 15px; color: #1a221b;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; color: #647466; font-size: 13px;">E-mail:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; font-size: 15px; color: #1a221b;">
            <a href="mailto:${email}" style="color: #4d6b53; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; color: #647466; font-size: 13px;">Celular / WhatsApp:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; font-weight: 600; font-size: 15px; color: #1a221b;">
            ${phone}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; color: #647466; font-size: 13px;">Origem:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf1eb; font-size: 14px; color: #4b584d;">${source}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #647466; font-size: 13px;">Data e Hora:</td>
          <td style="padding: 10px 0; font-size: 14px; color: #4b584d;">${now}</td>
        </tr>
      </table>

      ${cleanPhone
        ? `
      <div style="margin-top: 24px; text-align: center;">
        <a href="https://wa.me/55${cleanPhone}?text=Ol%C3%A1%20${encodeURIComponent(name)}%2C%20tudo%20bem%3F%20Recebemos%20seu%20contato%20sobre%20o%20coworking%20m%C3%A9dico%20na%20CEMIP." 
           style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px;">
          Abrir Conversa no WhatsApp com ${name}
        </a>
      </div>`
        : ""
      }
    </div>

    <div style="background-color: #f7f9f6; padding: 14px 24px; border-top: 1px solid #e3e8e2; text-align: center; font-size: 12px; color: #879589;">
      CEMIP — Clínica e Cirurgia do Aparelho Digestivo · Pacaembu, São Paulo
    </div>
  </div>
</body>
</html>
    `.trim();

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          bcc: ['masptj@gmail.com'],
          cc: ['administracao@cemip.med.br'],
          subject: `Novo Lead Coworking: ${name} (${phone})`,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resend API error:", response.status, errorText);
        return {
          success: false,
          error: `Resend error ${response.status}`,
        };
      }

      const resData = (await response.json()) as { id?: string };
      return {
        success: true,
        id: resData.id,
      };
    } catch (err) {
      console.error("Failed to send lead email via Resend:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erro desconhecido",
      };
    }
  });
