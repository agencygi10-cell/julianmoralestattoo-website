import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  // Step 1 — Qualifier
  firstTattoo?: string;
  bodyArea?: string;
  color?: string; // "bg" | "color"
  appointmentType?: string; // "consultation" | "appointment"
  // Step 2 — Tattoo details
  description?: string;
  budget?: string;
  // Step 3 — Contact info + consent
  fullName?: string;
  phone?: string;
  city?: string;
  preferredDay?: string;
  email?: string;
  smsServiceConsent?: boolean;
  smsMarketingConsent?: boolean;
};

const COLOR_LABELS: Record<string, string> = {
  bg: "Black and Grey",
  color: "Color",
};
const APPT_LABELS: Record<string, string> = {
  consultation: "Consultation appointment",
  appointment: "Tattoo appointment",
};
const BUDGET_LABELS: Record<string, string> = {
  "1000-2500": "$1,000 – $2,500",
  "2500-5000": "$2,500 – $5,000",
  "5000+": "$5,000+",
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    firstTattoo,
    bodyArea,
    color,
    appointmentType,
    description,
    budget,
    fullName,
    phone,
    city,
    preferredDay,
    email,
    smsServiceConsent,
    smsMarketingConsent,
  } = body;

  // Required fields (no `color` — Julian works exclusively in black & grey)
  if (
    !fullName ||
    !email ||
    !phone ||
    !description ||
    !firstTattoo ||
    !bodyArea ||
    !appointmentType
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  // A2P rule: SMS consent is OPTIONAL — a lead without consent is still a
  // valid lead, and requiring consent to submit is a carrier rejection.
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  const nowIso = new Date().toISOString();
  const firstName = fullName.trim().split(/\s+/)[0];
  const lastName = fullName.trim().split(/\s+/).slice(1).join(" ");
  const colorLabel = color ? COLOR_LABELS[color] ?? color : "Black and Grey";
  const apptLabel = APPT_LABELS[appointmentType] ?? appointmentType;
  const budgetLabel = budget ? BUDGET_LABELS[budget] ?? budget : "";

  // Single, human-readable block of the whole submission. GHL Inbound Webhooks
  // don't auto-map nested custom fields, so we also send this ready-to-read
  // `summary` (and `summaryHtml` for the email) at the TOP LEVEL. In the GHL
  // workflow, map {{inboundWebhookRequest.summary}} into an "Add Note" action.
  const summaryLines = [
    `New tattoo request — julianmoralestattoo.com`,
    ``,
    `Idea: ${description}`,
    `First tattoo: ${firstTattoo === "yes" ? "Yes" : "No"}`,
    `Body area: ${bodyArea}`,
    `Color: ${colorLabel}`,
    `Appointment: ${apptLabel}`,
    budget ? `Budget: ${budgetLabel}` : null,
    city ? `City: ${city}` : null,
    preferredDay ? `Preferred day: ${preferredDay}` : null,
    ``,
    `Contact: ${fullName} · ${phone} · ${email}`,
    `SMS consent — transactional: ${smsServiceConsent ? "YES" : "no"} · promotional: ${smsMarketingConsent ? "YES" : "no"}`,
    `Submitted: ${nowIso}`,
  ].filter((line) => line !== null);
  const summary = summaryLines.join("\n");
  const summaryHtml = summary.replace(/\n/g, "<br>");

  // Segmentation tags for GHL (internal — never shown on the public site).
  const colorTag = color === "color" ? "color-tattoo" : "bw-tattoo";
  const tags = [
    "website-lead",
    "julian-morales",
    ...(smsServiceConsent ? ["sms-consent-given"] : []),
    firstTattoo === "yes" ? "first-tattoo" : "returning-client",
    colorTag,
    appointmentType === "consultation"
      ? "consultation-request"
      : "tattoo-appointment-request",
    ...(budget ? [`budget-${budget === "5000+" ? "5000-plus" : budget}`] : []),
    ...(smsMarketingConsent ? ["promo-sms-opt-in"] : []),
  ];
  const tagsCsv = tags.join(", ");

  if (webhookUrl) {
    try {
      const ghlRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message: description,
          summary,
          summaryHtml,
          tags,
          tagsCsv,
          source: "julianmoralestattoo.com",
          customFields: {
            is_first_tattoo: firstTattoo,
            body_area: bodyArea,
            color_type: colorLabel,
            appointment_type: apptLabel,
            design_description: description,
            budget: budgetLabel,
            city: city ?? "",
            preferred_day: preferredDay ?? "",
            service_sms_consent: smsServiceConsent ? "yes" : "no",
            promotional_sms_consent: smsMarketingConsent ? "yes" : "no",
            sms_consent_timestamp:
              smsServiceConsent || smsMarketingConsent ? nowIso : "",
          },
        }),
      });

      if (!ghlRes.ok) {
        console.error(
          "GHL webhook responded",
          ghlRes.status,
          await ghlRes.text()
        );
        return NextResponse.json(
          {
            error:
              "Could not send your request. Please try again or DM us on Instagram.",
          },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("GHL webhook fetch error:", err);
      return NextResponse.json(
        { error: "Could not reach our booking system. Please try again." },
        { status: 502 }
      );
    }
  } else {
    console.warn(
      "[julian/contact] GHL_WEBHOOK_URL not set — lead received but NOT forwarded.",
      { fullName, email, phone }
    );
  }

  return NextResponse.json({ success: true });
}
