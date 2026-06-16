"use client";

import { useState } from "react";
import Link from "next/link";
import { createProposalAction } from "../actions";

export default function NewProposalPage() {
  const [rows, setRows] = useState([{ desc: "", amount: "" }]);

  const total = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);

  return (
    <section className="container-vaelo max-w-2xl py-12">
      <Link href="/admin/proposals" className="text-sm text-muted hover:text-ink">← Proposals</Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">New proposal</h1>

      <form action={createProposalAction} className="mt-8 space-y-6">
        <Field label="Title" name="title" placeholder="Growth retainer — Q3" required />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Client name" name="client_name" placeholder="Brand name" required />
          <Field label="Client email" name="client_email" type="email" placeholder="client@brand.com" />
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
                  placeholder="Deliverable"
                  className="flex-1 border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
                />
                <input
                  name="itemAmount"
                  type="number"
                  value={r.amount}
                  onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, amount: e.target.value } : x)))}
                  placeholder="₹"
                  className="w-32 border-b border-line bg-transparent pb-2 text-right outline-none focus:border-accent"
                />
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
          <p className="mt-4 text-right text-lg font-medium">
            Total: ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <label htmlFor="notes" className="eyebrow block">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Scope, timeline, terms…"
            className="mt-3 w-full border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          Create &amp; get link
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        className="mt-3 w-full border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
      />
    </div>
  );
}
