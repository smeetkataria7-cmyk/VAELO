"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createProposalAction } from "../actions";
import { ClientEmailInput } from "@/components/site/client-email-input";

export default function NewProposalPage() {
  const [rows, setRows] = useState([{ desc: "", amount: "" }]);

  const total = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/proposals" className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft size={14} /> Proposals
      </Link>
      <h1 className="mt-4 font-display text-[28px] text-ink">New proposal</h1>

      <form action={createProposalAction} className="os-card mt-6 space-y-5 p-6">
        <div>
          <label className="os-label">Title *</label>
          <input name="title" required placeholder="Growth retainer — Q3" className="os-field" />
        </div>
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

        <div>
          <label className="os-label">Line items</label>
          <div className="mt-2 space-y-2">
            {rows.map((r, i) => (
              <div key={i} className="flex gap-3">
                <input
                  name="itemDesc"
                  value={r.desc}
                  onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)))}
                  placeholder="Deliverable"
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
          <p className="mt-4 text-right text-[15px] font-semibold text-ink">
            Total: ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <label className="os-label">Notes (optional)</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Scope, timeline, terms…"
            className="os-field"
          />
        </div>

        <button type="submit" className="os-btn-primary">Create & get link</button>
      </form>
    </div>
  );
}
