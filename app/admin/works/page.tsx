import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { listAllWorks, WORK_CATEGORIES } from "@/lib/works";
import { AdminTabs } from "@/components/site/admin-tabs";
import { addWorkAction, deleteWorkAction, togglePublishedAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Works · Admin", robots: { index: false } };

const field = "border-b border-line bg-transparent pb-2 outline-none focus:border-accent";

export default async function AdminWorksPage() {
  const viewer = await getViewer();
  if (!viewer.isAdmin) redirect("/admin");

  const works = await listAllWorks().catch(() => []);

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Works</h1>
      <p className="mt-2 text-sm text-muted">
        These appear on the public{" "}
        <a href="/work" className="link-underline">/work</a> page. Lower sort order shows first.
      </p>

      {/* Add work */}
      <form
        action={addWorkAction}
        className="mt-8 space-y-5 rounded-2xl border border-line p-6"
      >
        <div className="grid gap-4 sm:grid-cols-4">
          <input name="title" required placeholder="Title * (e.g. Hardee's)" className={`sm:col-span-2 ${field}`} />
          <input name="slug" placeholder="Slug (auto from title)" className={field} />
          <input name="sort_order" type="number" defaultValue={0} placeholder="Sort order" className={field} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="eyebrow block">Image upload</label>
            <input name="image" type="file" accept="image/*" className="mt-2 w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-1.5 file:text-paper" />
          </div>
          <input name="image_url" placeholder="…or paste image URL" className={field} />
        </div>

        <div className="grid items-center gap-4 sm:grid-cols-3">
          <label className="flex items-center gap-3 text-sm">
            Panel colour
            <input name="accent_color" type="color" defaultValue="#1a1a1a" className="h-9 w-14 rounded border border-line bg-transparent" />
          </label>
          <input name="case_url" placeholder="See-case link (optional)" className={`sm:col-span-2 ${field}`} />
        </div>

        <div>
          <label className="eyebrow block">Categories</label>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {WORK_CATEGORIES.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="categories" value={c} className="accent-[var(--accent)]" />
                {c}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked className="accent-[var(--accent)]" />
          Published (visible on /work)
        </label>

        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft">
          Add work
        </button>
      </form>

      {/* Existing */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Categories</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {works.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-3 text-muted">No works yet. Add one above.</td></tr>
            ) : (
              works.map((w) => (
                <tr key={w.id} className="border-t border-line align-middle">
                  <td className="px-4 py-3 text-muted">{w.sort_order}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block h-6 w-6 shrink-0 rounded"
                        style={{ backgroundColor: w.accent_color }}
                        aria-hidden
                      />
                      <span className="font-medium">{w.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{w.categories.join(", ") || "—"}</td>
                  <td className="px-4 py-3">
                    <form action={togglePublishedAction.bind(null, w.id, !w.published)}>
                      <button className={w.published ? "text-green-400 hover:underline" : "text-muted hover:underline"}>
                        {w.published ? "Published" : "Hidden"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <form action={deleteWorkAction.bind(null, w.id)}>
                      <button className="text-red-400 hover:underline">Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
