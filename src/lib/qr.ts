import QRCode from "qrcode";

export async function generateTicketQrCode(ticketId: string) {
  return QRCode.toDataURL(ticketId, {
    width: 480,
    margin: 2,
    color: {
      dark: "#0b0b0c",
      light: "#f4f2ec",
    },
  });
}
