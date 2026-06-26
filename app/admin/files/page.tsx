import { listAllFiles, signedUrlFor } from "@/lib/files";
import { uploadFileAction, deleteFileAction } from "./actions";
import { ClientEmailInput } from "@/components/site/client-email-input";
import { PageHeader, SectionLabel, StatusBadge } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Files" };

export default async function AdminFilesPage() {
  const files = await listAllFiles();
  const withUrls = await Promise.all(files.map(async (f) => ({ ...f, url: await signedUrlFor(f.path) })));

  return (
    <div>
      <PageHeader title="Files" subtitle="Deliverables shared with clients in their portal" />

      <form action={uploadFileAction} className="os-card mb-5 space-y-5 p-6">
        <SectionLabel>Deliver a file</SectionLabel>
        <div>
          <label className="os-label">Client email</label>
          <ClientEmailInput required className="os-field max-w-md" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="os-label">Upload a file (image / video / PDF, up to ~20 MB)</label>
            <input
              name="file"
              type="file"
              accept="image/*,video/*,application/pdf"
              className="block w-full text-[13px] text-ink-soft"
            />
          </div>
          <div>
            <label className="os-label">…or paste a link (Drive, etc. — for big files)</label>
            <input name="link" type="url" placeholder="https://drive.google.com/…" className="os-field" />
            <input name="link_name" placeholder="Name for the link (optional)" className="os-field mt-3" />
          </div>
        </div>

        <button className="os-btn-primary">Deliver to client</button>
        <p className="text-[12px] text-muted">
          Upload a file <em>or</em> paste a link — whichever you fill in.
        </p>
      </form>

      {withUrls.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No files delivered yet</p>
          <p className="mt-1 text-[13px] text-muted">Uploads appear in the client&apos;s portal for approval.</p>
        </div>
      ) : (
        <div className="os-card overflow-hidden p-0">
          <div className="os-scroll overflow-x-auto">
            <table className="os-table min-w-[680px]">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>File</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {withUrls.map((f) => (
                  <tr key={f.id}>
                    <td className="whitespace-nowrap text-muted">{new Date(f.created_at).toLocaleDateString()}</td>
                    <td className="font-medium text-ink">{f.name}</td>
                    <td className="text-muted">{f.client_email}</td>
                    <td>
                      <StatusBadge
                        status={f.status}
                        label={
                          f.status === "revision" && f.comment ? `Revision · "${f.comment}"` : f.status
                        }
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-4">
                        {f.link || f.url ? (
                          <a href={f.link || f.url!} target="_blank" className="text-[#d4af37] hover:underline">
                            Open
                          </a>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                        <form action={deleteFileAction.bind(null, f.id)}>
                          <button className="text-[#ef4444] hover:underline">Delete</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
