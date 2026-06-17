import Link from "next/link";
import { getBrandBrainForEmail } from "@/lib/brand-brain";
import { BrandForm } from "@/components/site/brand-form";
import { saveBrandForEmail } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Brand · Admin", robots: { index: false } };

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email: raw } = await params;
  const email = decodeURIComponent(raw);
  const brand = await getBrandBrainForEmail(email);

  return (
    <section className="container-vaelo max-w-2xl py-12">
      <Link href="/admin/brand-brain" className="text-sm text-muted hover:text-ink">← Brand Brain</Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Brand profile</h1>
      <p className="mt-1 text-muted">{email}</p>

      <div className="mt-8">
        <BrandForm
          initial={brand as unknown as Record<string, string> | null}
          action={saveBrandForEmail.bind(null, email)}
        />
      </div>
    </section>
  );
}
