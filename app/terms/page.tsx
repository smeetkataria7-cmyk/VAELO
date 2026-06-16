import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

// TODO: replace with proper terms of service.
export default function TermsPage() {
  return (
    <section className="container-vaelo py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-6 max-w-2xl text-muted">
        This is a placeholder. Vaelo Creative&apos;s terms of service will be
        published here before launch.
      </p>
    </section>
  );
}
