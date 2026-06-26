"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createInvoiceAction } from "../actions";
import { ClientEmailInput } from "@/components/site/client-email-input";

export default function NewInvoicePage() {
  const [rows, setRows] = useState([{ desc: "", amount: "" }]);
  const [gst, setGst] = useState("");

  const subtotal = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const total = Math.round(subtotal * (1 + (Number(gst) || 0) / 100));

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/invoices" className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft size={14} /> Invoices
      </Link>
      <h1 className="mt-4 font-display text-[28px] text-ink">New invoice</h1>

      <form action={createInvoiceAction} className="os-card mt-6 space-y-5 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="os-label">Client name *</label>
            <input name="client_name" required placeholder="Brand name" className="os-field" />
          </div>
          <div>
            <label className="os-label">Client email</label>
            <ClientEmailInput required className="os-field" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="os-label">Due date</label>
            <input name="due_date" type="date" className="os-field" />
          </div>
          <div>
            <label className="os-label">GST %</label>
            <input
              name="gst_percent"
              type="number"
              placeholder="18"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              className="os-field"
            />
          </div>
        </div>

        <div>
          <label className="os-label">Line items</label>
          <div className="mt-2 space-y-2">
            {rows.map((r, i) => (
              <div key={i} className="flex gap-3">
                <input
                  name="itemDesc"
                  value={r.desc}
                  onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)))}
                  placeholder="Description"
                  className="os-field flex-1"
                />
                <div className="relative w-36">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted">₹</span>
                  <input
                    name="itemAmount"
                    type="text"
                    inputMode="decimal"
                    value={r.amount}
                    onChange={(e) =>
                      setRows(rows.map((x, j) => (j === i ? { ...x, amount: e.target.value.replace(/[^\d.]/g, "") } : x)))
                    }
                    placeholder="0"
                    className="os-field w-full pl-7 text-right"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setRows([...rows, { desc: "", amount: "" }])}
            className="mt-3 text-[13px] text-[#d4af37] hover:underline"
          >
            + Add item
          </button>
          <div className="mt-4 space-y-1 text-right text-[13px]">
            <p className="text-muted">Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
            {gst && <p className="text-muted">GST ({gst}%): ₹{(total - subtotal).toLocaleString("en-IN")}</p>}
            <p className="text-[15px] font-semibold text-ink">Total: ₹{total.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <div>
          <label className="os-label">Notes (optional)</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Payment terms, UPI / bank details…"
            className="os-field"
          />
        </div>

        <button type="submit" className="os-btn-primary">Create invoice</button>
      </form>
    </div>
  );
}
