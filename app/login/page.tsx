"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { viewerIsAdmin } from "@/app/admin/client-options-action";

function LoginInner() {
  const params = useSearchParams();
  const next = params.get("next") || "/portal";
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "confirm" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const supabase = createClient();
    const creds = { email: email.trim(), password };

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp(creds);
        if (error) throw error;
        if (!data.session) {
          // Email confirmation is on — tell them to confirm.
          setStatus("confirm");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword(creds);
        if (error) throw error;
      }
      // Route by role (checked server-side).
      const isAdmin = await viewerIsAdmin().catch(() => false);
      const dest = isAdmin ? "/admin" : next;
      window.location.assign(dest);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "confirm") {
    return (
      <section className="container-vaelo flex min-h-[70vh] items-center justify-center py-20">
        <div className="glass w-full max-w-md rounded-2xl p-8 text-center">
          <p className="font-display text-2xl">Almost there</p>
          <p className="mt-3 text-ink-soft">
            We&apos;ve emailed <span className="text-ink">{email}</span> a confirmation
            link. Click it, then come back and sign in.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-vaelo flex min-h-[70vh] items-center justify-center py-20">
      <div className="glass w-full max-w-md rounded-2xl p-8">
        <p className="eyebrow">{mode === "signin" ? "Sign in" : "Create account"}</p>
        <h1 className="font-display mt-3 text-3xl">
          {mode === "signin" ? "Welcome back" : "Set up your login"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="eyebrow block">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@brand.com"
              className="mt-3 w-full border-b border-line bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="eyebrow block">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
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
            {status === "loading"
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {mode === "signin" ? "First time here? " : "Already have an account? "}
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setStatus("idle");
              setError(null);
            }}
            className="text-accent hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
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
