import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";

const images = [g1, g2, g3];

export function Gallery() {
  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GALLERY</p>
        <h2 className="text-xl">우리의 순간</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto px-8 snap-x snap-mandatory pb-4 scrollbar-none">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`gallery ${i + 1}`}
            loading="lazy"
            width={800}
            height={1024}
            className="h-[420px] w-[280px] flex-shrink-0 object-cover rounded-2xl snap-center shadow-lg"
          />
        ))}
      </div>
    </section>
  );
}
