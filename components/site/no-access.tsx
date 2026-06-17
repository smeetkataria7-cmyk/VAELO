import Link from "next/link";

export function NoAccess() {
  return (
    <section className="container-vaelo py-24 text-center sm:py-32">
      <p className="eyebrow">Access denied</p>
      <h1 className="font-display mt-4 text-4xl">This isn&apos;t your document.</h1>
      <p className="mt-3 text-ink-soft">
        It belongs to a different account. Sign in with the right email to view it.
      </p>
      <Link
        href="/portal"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink-soft"
      >
        Go to your portal
      </Link>
    </section>
  );
}
