"use client";

import { useState } from "react";
import Link from "next/link";
import { createInvoiceAction } from "../actions";

export default function NewInvoicePage() {
  const [rows, setRows] = useState([{ desc: "", amount: "" }]);
  const [gst, setGst] = useState("");

  const subtotal = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const total = Math.round(subtotal * (1 + (Number(gst) || 0) / 100));

  return (
    <section className="container-vaelo max-w-2xl py-12">
      <Link href="/admin/invoices" className="text-sm text-muted hover:text-ink">← Invoices</Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">New invoice</h1>

      <form action={createInvoiceAction} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Client name" name="client_name" placeholder="Brand name" required />
          <Field label="Client email" name="client_email" type="email" placeholder="client@brand.com" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Due date" name="due_date" type="date" />
          <Field label="GST %" name="gst_percent" type="number" placeholder="18" value={gst} onChange={setGst} />
        </div>

        <div>
          <label className="eyebrow block">Line items</label>
          <div className="mt-3 space-y-3">
            {rows.map((r, i) => (
              <div key={i} className="flex gap-3">
                <input
                  name="itemDesc"
                  value={r.desc}
                  onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)))}
                  placeholder="Description"
                  className="flex-1 border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
                />
                <div className="flex w-40 items-center gap-1 border-b border-line pb-2 focus-within:border-accent">
                  <span className="text-muted">₹</span>
                  <input
                    name="itemAmount"
                    type="text"
                    inputMode="decimal"
                    value={r.amount}
                    onChange={(e) =>
                      setRows(rows.map((x, j) => (j === i ? { ...x, amount: e.target.value.replace(/[^\d.]/g, "") } : x)))
                    }
                    placeholder="0"
                    className="w-full bg-transparent text-right outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setRows([...rows, { desc: "", amount: "" }])}
            className="mt-3 text-sm text-accent hover:underline"
          >
            + Add item
          </button>
          <div className="mt-4 space-y-1 text-right text-sm">
            <p className="text-muted">Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
            <p className="text-lg font-medium">Total: ₹{total.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="eyebrow block">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Payment terms, UPI / bank details…"
            className="mt-3 w-full border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          Create invoice
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">{label}{required && <span className="text-accent"> *</span>}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="mt-3 w-full border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
      />
    </div>
  );
}
