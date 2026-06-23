import Image from "next/image";

/**
 * Media block. If `src` is provided (a file in /public, e.g. "/images/hero.jpg"),
 * it renders the real image. Otherwise it shows a refined gradient placeholder.
 *
 * To use real images: drop files into /public/images and set the path in
 * lib/content.ts. No code changes needed.
 */
export function Media({
  src,
  alt,
  label,
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-paper-2 ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-end justify-between p-5"
          style={{
            backgroundImage:
              "radial-gradient(120% 120% at 0% 0%, #f4f3f0 0%, #e9e7e1 45%, #ddd9d0 100%)",
          }}
          aria-hidden
        >
          <span className="font-display text-sm text-muted">{label ?? "Vaelo"}</span>
          <span className="eyebrow text-muted">Visual</span>
        </div>
      )}
    </div>
  );
}
