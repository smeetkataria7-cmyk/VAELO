import { listAllFiles, signedUrlFor } from "@/lib/files";
import { uploadFileAction, deleteFileAction } from "./actions";
import { AdminTabs } from "@/components/site/admin-tabs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Files · Admin", robots: { index: false } };

const statusColor: Record<string, string> = {
  pending: "text-ink-soft",
  approved: "text-green-400",
  revision: "text-red-400",
};

export default async function AdminFilesPage() {
  const files = await listAllFiles();
  const withUrls = await Promise.all(
    files.map(async (f) => ({ ...f, url: await signedUrlFor(f.path) }))
  );

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Files</h1>

      <form action={uploadFileAction} className="mt-6 space-y-5 rounded-2xl border border-line p-6">
        <div>
          <label className="eyebrow block">Client email</label>
          <input
            name="client_email"
            type="email"
            required
            placeholder="client@brand.com"
            className="mt-2 w-72 border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="eyebrow block">Upload a file (image / video / PDF, up to ~20 MB)</label>
            <input
              name="file"
              type="file"
              accept="image/*,video/*,application/pdf"
              className="mt-2 block text-sm text-ink-soft"
            />
          </div>
          <div>
            <label className="eyebrow block">…or paste a link (Google Drive, etc. — for big files)</label>
            <input
              name="link"
              type="url"
              placeholder="https://drive.google.com/…"
              className="mt-2 w-full border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
            />
            <input
              name="link_name"
              placeholder="Name for the link (optional)"
              className="mt-3 w-full border-b border-line bg-transparent pb-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft">
          Deliver to client
        </button>
        <p className="text-xs text-muted">Upload a file <em>or</em> paste a link — whichever you fill in.</p>
      </form>

      {withUrls.length === 0 ? (
        <p className="mt-8 text-muted">No files delivered yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">File</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {withUrls.map((f) => (
                <tr key={f.id} className="border-t border-line">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{new Date(f.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3 text-muted">{f.client_email}</td>
                  <td className={`px-4 py-3 capitalize ${statusColor[f.status] ?? ""}`}>
                    {f.status}
                    {f.status === "revision" && f.comment ? ` — "${f.comment}"` : ""}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      {f.link || f.url ? (
                        <a href={f.link || f.url!} target="_blank" className="text-accent hover:underline">Open</a>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                      <form action={deleteFileAction.bind(null, f.id)}>
                        <button className="text-red-400 hover:underline">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
