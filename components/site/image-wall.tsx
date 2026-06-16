import Image from "next/image";

/** Two columns of creatives scrolling in opposite directions. */
export function ImageWall({ images }: { images: string[] }) {
  const colA = images;
  const colB = [...images].slice().reverse();

  const Col = ({ imgs, down = false }: { imgs: string[]; down?: boolean }) => (
    <div className={`img-col ${down ? "down" : ""}`}>
      {[...imgs, ...imgs].map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-paper-2"
        >
          <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="img-wall grid grid-cols-2 gap-4" aria-hidden>
      <Col imgs={colA} />
      <Col imgs={colB} down />
    </div>
  );
}
