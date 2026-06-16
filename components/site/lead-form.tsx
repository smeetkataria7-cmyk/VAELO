"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-ink pt-8">
        <p className="font-display text-3xl">Thank you.</p>
        <p className="mt-3 text-ink-soft">
          We&apos;ve got your details and will be in touch shortly with a free AI
          sample for your brand.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Field label="Your name" name="name" placeholder="Jane Doe" required />
      <Field label="Brand name" name="brand" placeholder="Your brand" required />
      <Field label="Email" name="email" type="email" placeholder="you@brand.com" required />
      <Field label="Instagram handle" name="instagram" placeholder="@yourbrand" />

      <div>
        <label htmlFor="goal" className="eyebrow block">
          What do you want to achieve?
        </label>
        <textarea
          id="goal"
          name="goal"
          rows={3}
          placeholder="More sales, a refreshed feed, visuals for a launch…"
          className="mt-3 w-full resize-none border-b border-line bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-all hover:gap-3 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send my request"}
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
      </button>
      <p className="text-xs text-muted">
        No spam — we&apos;ll only use this to reach out about your brand.
      </p>
    </form>
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
      <label htmlFor={name} className="eyebrow block">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-3 w-full border-b border-line bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
      />
    </div>
  );
}
