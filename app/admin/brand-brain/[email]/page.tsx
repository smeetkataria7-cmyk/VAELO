import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { getBrandBrainForEmail } from "@/lib/brand-brain";
import { BrandForm } from "@/components/site/brand-form";
import { saveBrandForEmail } from "../actions";
import { ClientAvatar } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Brand" };

const ACCENTS = ["#c8331f", "#2a9d8f", "#e76f51", "#9b59b6", "#3b82f6", "#d4af37"];
function accentFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}

export default async function EditBrandPage({ params }: { params: Promise<{ email: string }> }) {
  const { email: raw } = await params;
  const email = decodeURIComponent(raw);
  const brand = await getBrandBrainForEmail(email);
  const accent = accentFor(email);
  const clientName = (brand as { client_name?: string } | null)?.client_name;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/brand-brain" className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft size={14} /> Brand Brain
      </Link>

      <div className="mb-6 mt-4 flex items-center gap-3">
        <ClientAvatar name={clientName || email} accent={accent} size={48} rounded={12} />
        <div>
          <h1 className="font-display text-[26px] text-ink">{clientName || "Brand profile"}</h1>
          <p className="text-[12px] text-muted">{email}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-[6px] bg-[#d4af371f] px-2.5 py-1 text-[11px] font-medium text-[#d4af37]">
          <Sparkles size={12} /> AI uses this context
        </span>
      </div>

      <div className="os-card p-6">
        <BrandForm
          initial={brand as unknown as Record<string, string> | null}
          action={saveBrandForEmail.bind(null, email)}
        />
      </div>
    </div>
  );
}
