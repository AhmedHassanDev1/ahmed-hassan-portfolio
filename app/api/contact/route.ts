import nodemailer from "nodemailer";

export const runtime = "nodejs";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5000;

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

function jsonResponse(
  body: { success: boolean; message?: string },
  status: number,
) {
  return Response.json(body, { status });
}

function normalizeLine(value: string) {
  return value.trim().replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");
}

function normalizeMessage(value: string) {
  return value
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\0/g, "");
}

function isObject(value: unknown): value is ContactRequestBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidEmail(value: string) {
  return (
    value.length <= EMAIL_MAX_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

function parseContactForm(body: unknown): ContactFormData | null {
  if (!isObject(body)) {
    return null;
  }

  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return null;
  }

  const name = normalizeLine(body.name);
  const email = normalizeLine(body.email).toLowerCase();
  const message = normalizeMessage(body.message);

  if (
    name.length < NAME_MIN_LENGTH ||
    name.length > NAME_MAX_LENGTH ||
    !isValidEmail(email) ||
    message.length < MESSAGE_MIN_LENGTH ||
    message.length > MESSAGE_MAX_LENGTH
  ) {
    return null;
  }

  return { name, email, message };
}

function isHoneypotFilled(body: unknown) {
  return (
    isObject(body) &&
    typeof body.website === "string" &&
    body.website.trim().length > 0
  );
}

function createEmailText({ name, email, message }: ContactFormData) {
  return [
    "New Portfolio Inquiry",
    "",
    "Name:",
    name,
    "",
    "Email:",
    email,
    "",
    "Message:",
    message,
    "",
    "Source:",
    "Portfolio Contact Form",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      { success: false, message: "Invalid form data." },
      400,
    );
  }

  if (isHoneypotFilled(body)) {
    return jsonResponse({ success: true }, 200);
  }

  const formData = parseContactForm(body);

  if (!formData) {
    return jsonResponse(
      { success: false, message: "Invalid form data." },
      400,
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!gmailUser || !gmailAppPassword || !contactEmail) {
    console.error(
      "Contact form email delivery is not configured: GMAIL_USER, GMAIL_APP_PASSWORD, and CONTACT_EMAIL are required.",
    );

    return jsonResponse(
      { success: false, message: "Unable to send message." },
      500,
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: contactEmail,
      replyTo: formData.email,
      subject: `New Portfolio Inquiry - ${formData.name}`,
      text: createEmailText(formData),
    });

    return jsonResponse({ success: true }, 200);
  } catch (error) {
    console.error("Contact email failed:", error);

    return jsonResponse(
      { success: false, message: "Unable to send message." },
      502,
    );
  }
}
