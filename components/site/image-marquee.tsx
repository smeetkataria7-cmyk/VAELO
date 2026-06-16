import Image from "next/image";

/** Auto-scrolling wall of creatives. CSS-only, pauses on hover. */
export function ImageMarquee({ images }: { images: string[] }) {
  const Row = () => (
    <div className="flex gap-4 pr-4">
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative aspect-[4/5] h-[58vh] max-h-[520px] min-h-[360px] shrink-0 overflow-hidden rounded-xl bg-paper-2"
        >
          <Image
            src={src}
            alt={`Vaelo AI creative ${i + 1}`}
            fill
            className="object-cover"
            sizes="40vw"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee-track fast" aria-hidden>
        <Row />
        <Row />
      </div>
    </div>
  );
}
