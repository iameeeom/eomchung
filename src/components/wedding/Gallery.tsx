import photo1 from "@/assets/1.jpg"; 
import photo2 from "@/assets/2.jpg";
import photo3 from "@/assets/3.jpg";
import photo4 from "@/assets/4.jpg";
import photo5 from "@/assets/5.jpg";
import photo6 from "@/assets/6.jpg";
import photo7 from "@/assets/7.jpg";
import photo8 from "@/assets/8.jpg";

// 이렇게 사진들을 하나의 배열로 묶어두면 편해요!
const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

export function Gallery() {
  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GALLERY</p>
        <h2 className="text-xl">우리의 순간</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto px-8 snap-x snap-mandatory pb-4 scrollbar-none">
        {photos.map((src, index) => (
          <div
            key={index}
            className="h-[420px] w-[280px] flex-shrink-0 rounded-2xl snap-center shadow-lg bg-secondary/30 overflow-hidden"
          >
            <img 
              src={src} 
              alt={`wedding-photo-${index}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
