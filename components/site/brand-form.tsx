"use client";

import { useState } from "react";
import { BRAND_FIELDS } from "@/lib/brand-brain";

export function BrandForm({
  initial,
  action,
}: {
  initial: Record<string, string> | null;
  action: (formData: FormData) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <form
      action={async (fd) => {
        setSaving(true);
        setSaved(false);
        await action(fd);
        setSaving(false);
        setSaved(true);
      }}
      className="space-y-5"
    >
      {BRAND_FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="eyebrow block">{f.label}</label>
          {f.name === "client_name" ? (
            <input
              id={f.name}
              name={f.name}
              defaultValue={initial?.[f.name] ?? ""}
              placeholder={f.placeholder}
              className="mt-2 w-full border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
            />
          ) : (
            <textarea
              id={f.name}
              name={f.name}
              rows={2}
              defaultValue={initial?.[f.name] ?? ""}
              placeholder={f.placeholder}
              className="mt-2 w-full resize-none border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
            />
          )}
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save brand profile"}
        </button>
        {saved && <span className="text-sm text-accent">Saved ✓</span>}
      </div>
    </form>
  );
}
