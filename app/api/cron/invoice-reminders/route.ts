import { NextResponse } from "next/server";
import { listInvoices, markInvoiceReminded } from "@/lib/invoices";
import { sendInvoiceReminder } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily invoice reminders. Triggered by Vercel Cron (see vercel.json).
 * Reminds 3 days before, 1 day before, on the due date, and every 3rd day overdue.
 * Protected by CRON_SECRET (Vercel sends it as a Bearer token automatically).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://vaelo-2fo7.vercel.app";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  let invoices;
  try {
    invoices = await listInvoices();
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }

  let sent = 0;
  for (const inv of invoices) {
    if (inv.status !== "sent" || !inv.due_date || !inv.client_email) continue;
    if (inv.last_reminded_on === todayStr) continue; // already reminded today

    const due = new Date(inv.due_date);
    due.setHours(0, 0, 0, 0);
    const days = Math.round((due.getTime() - today.getTime()) / 86_400_000);

    const shouldRemind =
      days === 3 || days === 1 || days === 0 || (days < 0 && Math.abs(days) % 3 === 0);
    if (!shouldRemind) continue;

    const ok = await sendInvoiceReminder(inv, site);
    if (ok) {
      await markInvoiceReminded(inv.id);
      sent++;
    }
  }

  return NextResponse.json({ ok: true, checked: invoices.length, sent });
}
