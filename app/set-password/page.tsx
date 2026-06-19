"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { viewerIsAdmin } from "@/app/admin/client-options-action";

export default function SetPasswordPage() {
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setHasSession(!!data.user));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    const isAdmin = await viewerIsAdmin().catch(() => false);
    window.location.assign(isAdmin ? "/admin" : "/portal");
  }

  return (
    <section className="container-vaelo flex min-h-[70vh] items-center justify-center py-20">
      <div className="glass w-full max-w-md rounded-2xl p-8">
        <p className="eyebrow">Welcome to Vaelo</p>
        <h1 className="font-display mt-3 text-3xl">Set your password</h1>

        {hasSession === false ? (
          <p className="mt-6 text-ink-soft">
            This page needs to be opened from your email invite link. Please click the
            link we emailed you, then set your password here.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="password" className="eyebrow block">Choose a password</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-3 w-full border-b border-line bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
              />
            </div>
            {status === "error" && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
            >
              {status === "loading" ? "Saving…" : "Set password & continue"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
