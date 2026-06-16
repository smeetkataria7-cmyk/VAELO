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
      <div className="rounded-2xl border border-accent/30 bg-paper-2 p-8 text-center">
        <p className="text-xl font-semibold">Thanks — we&apos;ve got it. 🎉</p>
        <p className="mt-2 text-muted">
          We&apos;ll review your brand and get back to you shortly with a free AI
          sample.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Your name" name="name" placeholder="Jane Doe" required />
      <Field label="Brand name" name="brand" placeholder="Your brand" required />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@brand.com"
        required
      />
      <Field
        label="Instagram handle"
        name="instagram"
        placeholder="@yourbrand"
      />
      <div>
        <label htmlFor="goal" className="mb-1.5 block text-sm font-medium">
          What do you want to achieve?
        </label>
        <textarea
          id="goal"
          name="goal"
          rows={4}
          placeholder="e.g. More sales, a refreshed feed, product visuals for a launch…"
          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send my free AI sample request"}
      </button>
      <p className="text-center text-xs text-muted">
        No spam. We&apos;ll only use this to reach out about your brand.
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
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
