"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

function LoginInner() {
  const params = useSearchParams();
  const next = params.get("next") || "/portal";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't send the link.");
    }
  }

  return (
    <section className="container-vaelo flex min-h-[70vh] items-center justify-center py-20">
      <div className="glass w-full max-w-md rounded-2xl p-8">
        <p className="eyebrow">Client portal</p>
        <h1 className="font-display mt-3 text-3xl">Sign in</h1>

        {status === "sent" ? (
          <p className="mt-6 text-ink-soft">
            Check your inbox — we&apos;ve sent a secure sign-in link to{" "}
            <span className="text-ink">{email}</span>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="email" className="eyebrow block">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                className="mt-3 w-full border-b border-line bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
              />
            </div>
            {status === "error" && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Email me a sign-in link"}
            </button>
            <p className="text-center text-xs text-muted">
              No password needed — we&apos;ll email you a secure link.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
