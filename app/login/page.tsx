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
          setStatus("confirm");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword(creds);
        if (error) throw error;
      }
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
      <div className="os flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="os-card w-full max-w-[400px] p-8 text-center">
          <p className="font-display text-[26px] text-ink">Almost there</p>
          <p className="mt-3 text-[13px] text-muted">
            We emailed <span className="text-ink">{email}</span> a confirmation link. Click it, then come back and sign in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="os flex min-h-screen bg-[#0a0a0a]">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-[55%]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 10%, rgba(212,175,55,0.07) 0%, transparent 60%), #0d0d0d",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[10px] font-display text-xl font-bold text-[#0a0a0a]"
              style={{ background: "linear-gradient(135deg,#d4af37,#f0cc5a)" }}
            >
              V
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold text-ink">Vaelo</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d4af37]">Agency OS</div>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <p className="font-display text-[42px] leading-[1.15] text-ink">
            Creative that<br />moves brands<br />
            <span style={{ color: "#d4af37" }}>forward.</span>
          </p>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted">
            Your portal for proposals, projects, invoices, and brand assets — all in one place.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right,#d4af3730,transparent)" }} />
          <span className="text-[11px] text-muted">Crafted with intention</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-16 lg:bg-[#080808]">
        <div className="w-full max-w-[340px]">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[9px] font-display text-lg font-bold text-[#0a0a0a]"
              style={{ background: "linear-gradient(135deg,#d4af37,#f0cc5a)" }}
            >
              V
            </div>
            <span className="font-display text-[18px] text-ink">Vaelo</span>
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d4af37]">
            {mode === "signin" ? "Welcome back" : "Get started"}
          </p>
          <h1 className="mt-2 font-display text-[30px] text-ink">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="os-label">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                className="os-field"
              />
            </div>
            <div>
              <label className="os-label">Password</label>
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="os-field"
              />
            </div>

            {status === "error" && (
              <p className="rounded-[8px] bg-[#ef444412] px-3 py-2 text-[12px] text-[#ef4444]">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="os-btn-primary mt-2 w-full disabled:opacity-60"
            >
              {status === "loading"
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-muted">
            {mode === "signin" ? "First time here? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setStatus("idle"); setError(null); }}
              className="text-[#d4af37] hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
