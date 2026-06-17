import { Resend } from "resend";
import type { Lead } from "./leads";
import { inr, type Invoice } from "./invoices";

/**
 * Email notifications via Resend. Gracefully no-ops if RESEND_API_KEY is unset,
 * so the app keeps working before email is wired up.
 *
 * Set these env vars:
 *   RESEND_API_KEY   - from resend.com
 *   LEAD_NOTIFY_TO   - where new-lead alerts go (defaults to hello@vaelocreative.com)
 *   LEAD_NOTIFY_FROM - verified sender (use onboarding@resend.dev for testing)
 */
export async function notifyOwnerOfLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set — skipping owner notification.");
    return;
  }

  const resend = new Resend(apiKey);
  const to = process.env.LEAD_NOTIFY_TO ?? "hello@vaelocreative.com";
  const from = process.env.LEAD_NOTIFY_FROM ?? "Vaelo <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from,
      to,
      subject: `New lead: ${lead.brand} (${lead.name})`,
      text: [
        `New lead from the Vaelo website:`,
        ``,
        `Name:      ${lead.name}`,
        `Brand:     ${lead.brand}`,
        `Email:     ${lead.email}`,
        `Instagram: ${lead.instagram || "—"}`,
        `Goal:      ${lead.goal || "—"}`,
        ``,
        `Received:  ${new Date(lead.created_at).toLocaleString()}`,
      ].join("\n"),
    });
  } catch (err) {
    // Don't fail the lead submission if email fails.
    console.error("[email] Failed to send lead notification:", err);
  }
}

/** Sends an invoice reminder to the client. No-ops if email isn't configured. */
export async function sendInvoiceReminder(inv: Invoice, siteUrl: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !inv.client_email) return false;

  const resend = new Resend(apiKey);
  const from = process.env.LEAD_NOTIFY_FROM ?? "Vaelo <onboarding@resend.dev>";
  const due = inv.due_date ? new Date(inv.due_date) : null;
  const overdue = !!due && due < new Date(new Date().toDateString());
  const link = `${siteUrl}/i/${inv.public_token}`;

  try {
    await resend.emails.send({
      from,
      to: inv.client_email,
      subject: overdue
        ? `Overdue: invoice ${inv.number} — ${inr(inv.total)}`
        : `Reminder: invoice ${inv.number} — ${inr(inv.total)}`,
      text: [
        `Hi ${inv.client_name},`,
        ``,
        overdue
          ? `This is a friendly reminder that invoice ${inv.number} for ${inr(inv.total)} is now overdue${due ? ` (was due ${due.toLocaleDateString()})` : ""}.`
          : `This is a friendly reminder that invoice ${inv.number} for ${inr(inv.total)} is due${due ? ` on ${due.toLocaleDateString()}` : " soon"}.`,
        ``,
        `View it here: ${link}`,
        ``,
        `Thank you,`,
        `Vaelo Creative`,
      ].join("\n"),
    });
    return true;
  } catch (err) {
    console.error("[email] Failed to send invoice reminder:", err);
    return false;
  }
}
