import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

// TODO: replace with a proper privacy policy (required for Meta API + payments).
export default function PrivacyPage() {
  return (
    <section className="container-vaelo py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-6 max-w-2xl text-muted">
        This is a placeholder. A full privacy policy describing what data VAELO
        Creative collects, why, and how it is stored will be published here before
        launch. It is also required for Meta API approval and payment processing.
      </p>
    </section>
  );
}
