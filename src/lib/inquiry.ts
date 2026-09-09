"use server";

import { headers } from "next/headers";
import { sendInquiryEmail } from "./email";
import { isRateLimited, recordAttempt } from "./rate-limit";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const INQUIRY_LIMIT = 5;
const INQUIRY_WINDOW_MS = 10 * 60 * 1000;

export async function submitInquiryAction(
  _prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const service = formData.get("service");
  const details = formData.get("details");

  if (typeof name !== "string" || !name || typeof email !== "string" || !email) {
    return { status: "error", message: "Name and email are required." };
  }

  const headerList = await headers();
  const clientKey = `inquiry:${headerList.get("x-forwarded-for") ?? "unknown"}`;

  if (isRateLimited(clientKey, INQUIRY_LIMIT)) {
    return {
      status: "error",
      message: "Too many requests. Try again in a few minutes.",
    };
  }
  recordAttempt(clientKey, INQUIRY_WINDOW_MS);

  try {
    await sendInquiryEmail({
      name,
      email,
      service: typeof service === "string" ? service : "",
      details: typeof details === "string" ? details : "",
    });
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your request. Try again or reach out directly.",
    };
  }

  return { status: "success" };
}
