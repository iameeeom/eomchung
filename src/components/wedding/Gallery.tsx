import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // 기존에 쓰던 Dialog 활용

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      
      <div className="flex gap-3 overflow-x-auto px-8 snap-x snap-mandatory pb-4 scrollbar-none">
        {photos.map((src, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(src)} // 여기서 사진 선택
            className="h-[420px] w-[280px] flex-shrink-0 rounded-2xl snap-center shadow-lg bg-secondary/30 overflow-hidden cursor-pointer"
          >
            <img src={src} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 이미 설치된 Dialog 컴포넌트 사용 */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[80vh] p-0 border-0 bg-transparent flex items-center justify-center">
          {selectedImage && (
            <img src={selectedImage} className="max-w-full max-h-full object-contain rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}