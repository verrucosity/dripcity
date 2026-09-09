import { Resend } from "resend";
import { event } from "./event";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let client: Resend | undefined;

function getResend() {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }
  return client;
}

export async function sendTicketEmail(input: {
  to: string;
  buyerName: string;
  ticketId: string;
  tierLabel: string;
  qrCodeDataUrl: string;
}) {
  const base64 = input.qrCodeDataUrl.split(",")[1];

  const { error } = await getResend().emails.send({
    from: "Drip City Records <tickets@dripcityrecords.com>",
    to: input.to,
    subject: `Your ticket for ${event.name}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0b0b0c; padding: 28px 24px; text-align: center;">
          <p style="margin: 0; color: #f4f2ec; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Drip City Records</p>
          <p style="margin: 6px 0 0; color: #d6321f; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Your Ticket</p>
        </div>
        <div style="padding: 32px 24px;">
          <h1 style="margin: 0 0 4px; font-size: 26px; color: #111; line-height: 1.2;">${event.name}</h1>
          <p style="margin: 0 0 24px; color: #666; font-size: 14px; line-height: 1.6;">${event.venue}<br />${event.address}<br />${event.date}, ${event.time}</p>
          <div style="border-top: 2px solid #d6321f; padding-top: 16px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888;">${input.tierLabel}</p>
            <p style="margin: 4px 0 0; font-size: 17px; color: #111; font-weight: bold;">${escapeHtml(input.buyerName)}</p>
          </div>
          <div style="text-align: center; border: 1px solid #e5e5e5; padding: 24px; background: #fafafa;">
            <img src="cid:ticket-qr" alt="Ticket QR code" width="220" height="220" style="display: block; margin: 0 auto;" />
            <p style="margin: 16px 0 0; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #888;">Show this QR code at the door</p>
            <p style="margin: 4px 0 0; font-size: 11px; color: #aaa;">Ticket ID: ${input.ticketId}</p>
          </div>
        </div>
        <div style="background: #f4f2ec; padding: 16px 24px; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: #888; letter-spacing: 1px; text-transform: uppercase;">Drip City Records</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "ticket-qr.png",
        content: base64,
        contentId: "ticket-qr",
      },
    ],
  });

  if (error) {
    throw new Error(`Failed to send ticket email: ${error.message}`);
  }
}

export async function sendInquiryEmail(input: {
  name: string;
  email: string;
  service: string;
  details: string;
}) {
  const { error } = await getResend().emails.send({
    from: "Drip City Records <bookings@dripcityrecords.com>",
    to: "su@dripcityrecords.com",
    replyTo: input.email,
    subject: `New booking request: ${input.service}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0b0b0c; padding: 24px; text-align: center;">
          <p style="margin: 0; color: #f4f2ec; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Drip Lab</p>
          <p style="margin: 6px 0 0; color: #d6321f; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">New Booking Request</p>
        </div>
        <div style="padding: 28px 24px;">
          <h1 style="margin: 0 0 20px; font-size: 22px; color: #111;">${input.service}</h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; width: 70px; vertical-align: top;">From</td>
              <td style="padding: 8px 0; font-size: 14px; color: #111;">${escapeHtml(input.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; font-size: 14px; color: #111;">${escapeHtml(input.email)}</td>
            </tr>
          </table>
          <div style="border-left: 3px solid #d6321f; padding: 4px 16px; background: #fafafa;">
            <p style="margin: 0; font-size: 14px; color: #444; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(input.details) || "No additional details provided."}</p>
          </div>
        </div>
        <div style="background: #f4f2ec; padding: 16px 24px; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: #888; letter-spacing: 1px; text-transform: uppercase;">Drip City Records</p>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send inquiry email: ${error.message}`);
  }
}
