import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { listAllWorks, WORK_CATEGORIES } from "@/lib/works";
import { addWorkAction, deleteWorkAction, togglePublishedAction } from "./actions";
import { PageHeader, SectionLabel } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Creatives" };

export default async function AdminWorksPage() {
  const viewer = await getViewer();
  if (!viewer.isAdmin) redirect("/admin");

  const works = await listAllWorks().catch(() => []);

  return (
    <div>
      <PageHeader
        title="Creatives"
        subtitle="Portfolio pieces shown on the public /work page · lower sort order shows first"
      />

      {/* Add work */}
      <form action={addWorkAction} className="os-card mb-5 space-y-5 p-6">
        <SectionLabel>Add a creative</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-4">
          <input name="title" required placeholder="Title * (e.g. Hardee's)" className="os-field sm:col-span-2" />
          <input name="slug" placeholder="Slug (auto from title)" className="os-field" />
          <input name="sort_order" type="number" defaultValue={0} placeholder="Sort order" className="os-field" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="os-label">Image upload</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="block w-full text-[13px] text-muted file:mr-3 file:rounded-[8px] file:border-0 file:bg-[#d4af37] file:px-4 file:py-1.5 file:text-[#0a0a0a]"
            />
          </div>
          <div>
            <label className="os-label">…or paste image URL</label>
            <input name="image_url" placeholder="https://…" className="os-field" />
          </div>
        </div>

        <div className="grid items-end gap-4 sm:grid-cols-3">
          <div>
            <label className="os-label">Panel colour</label>
            <input
              name="accent_color"
              type="color"
              defaultValue="#1a1a1a"
              className="h-9 w-14 rounded border border-line-strong bg-transparent"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="os-label">See-case link (optional)</label>
            <input name="case_url" placeholder="https://…" className="os-field" />
          </div>
        </div>

        <div>
          <label className="os-label">Categories</label>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {WORK_CATEGORIES.map((c) => (
              <label key={c} className="flex items-center gap-2 text-[13px] text-ink-soft">
                <input type="checkbox" name="categories" value={c} className="accent-[#d4af37]" />
                {c}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-[13px] text-ink-soft">
          <input type="checkbox" name="published" defaultChecked className="accent-[#d4af37]" />
          Published (visible on /work)
        </label>

        <button className="os-btn-primary">Add creative</button>
      </form>

      {/* Existing */}
      <div className="os-card overflow-hidden p-0">
        <div className="os-scroll overflow-x-auto">
          <table className="os-table min-w-[640px]">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Categories</th>
                <th>Published</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {works.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted">
                    No creatives yet. Add one above.
                  </td>
                </tr>
              ) : (
                works.map((w) => (
                  <tr key={w.id}>
                    <td className="text-muted">{w.sort_order}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block h-6 w-6 shrink-0 rounded"
                          style={{ backgroundColor: w.accent_color }}
                          aria-hidden
                        />
                        <span className="font-medium text-ink">{w.title}</span>
                      </div>
                    </td>
                    <td className="text-muted">{w.categories.join(", ") || "—"}</td>
                    <td>
                      <form action={togglePublishedAction.bind(null, w.id, !w.published)}>
                        <button className={w.published ? "text-[#10b981] hover:underline" : "text-muted hover:underline"}>
                          {w.published ? "Published" : "Hidden"}
                        </button>
                      </form>
                    </td>
                    <td>
                      <form action={deleteWorkAction.bind(null, w.id)}>
                        <button className="text-[#ef4444] hover:underline">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
