import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [emblaRef] = useEmblaCarousel({ loop: true });

const photos = [
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/1.jpg",
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/2.jpg",
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/3.jpg",
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/4.jpg",
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/5.jpg",
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/6.jpg",
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/7.jpg",
  "https://pub-80239440eb7a4b0f866e6b54bd8660f9.r2.dev/8.jpg",
];
return (
    <section className="py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GALLERY</p>
        <h2 className="text-xl">우리의 순간</h2>
      </div>
      
      {/* 썸네일 리스트 */}
      <div className="flex gap-3 overflow-x-auto px-8 snap-x snap-mandatory pb-4 scrollbar-none">
        {photos.map((src, index) => (
          <div key={index} onClick={() => setSelectedIndex(index)} className="h-[420px] w-[280px] flex-shrink-0 rounded-2xl cursor-pointer overflow-hidden shadow-lg">
            <img src={src} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 슬라이드 뷰어 */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-full w-full h-full p-0 border-0 bg-black/95 flex items-center justify-center">
          <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex w-full h-full">
              {photos.map((src, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] flex items-center justify-center">
                  <img src={src} className="max-h-[90vh] max-w-[95vw] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}