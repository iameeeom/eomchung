import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
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
// 메인 카드를 탭했을 때 다음 장으로 넘기는 함수
  const handleCardClick = (index: number) => {
    if (index === currentIndex && currentIndex < photos.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // 팜플렛 미니 썸네일을 눌렀을 때 원하는 장으로 이동하는 함수
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 flex flex-col items-center overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GALLERY</p>
        <h2 className="text-xl">우리의 순간</h2>
        <p className="text-xs text-foreground/40 mt-1">카드를 넘기거나 하단 팜플렛을 눌러보세요</p>
      </div>

      {/* [상단] 카드 스택 영역 */}
      <div className="relative w-[300px] h-[430px] flex items-center justify-center mb-8">
        {photos.map((src, index) => {
          const isGone = index < currentIndex;
          const isTop = index === currentIndex;
          
          const stackOrder = index - currentIndex;
          const translateY = stackOrder >= 0 && stackOrder < 3 ? stackOrder * 10 : 0;
          const scale = stackOrder >= 0 && stackOrder < 3 ? 1 - stackOrder * 0.04 : 0.92;
          const opacity = stackOrder >= 0 && stackOrder < 3 ? 1 - stackOrder * 0.3 : 0;

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              style={{
                transform: isGone 
                  ? "translateX(-150%) rotate(-15deg)" 
                  : `translateY(${translateY}px) scale(${scale})`,
                opacity: isGone ? 0 : opacity,
                zIndex: photos.length - index,
                transition: "all 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="absolute w-full h-full rounded-2xl bg-secondary/30 shadow-xl overflow-hidden cursor-pointer origin-bottom-left select-none"
            >
              <img src={src} className="w-full h-full object-cover pointer-events-none" />
              
              {isTop && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(src);
                  }}
                  className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm z-10"
                >
                  확대보기
                </div>
              )}
            </div>
          );
        })}

        {/* 모든 사진을 다 넘겼을 때 웰컴 메시지 */}
        {currentIndex >= photos.length && (
          <div className="text-center animate-in fade-in zoom-in duration-300 z-10">
            <p className="text-sm text-foreground/60 mb-2">사진을 모두 확인하셨습니다 ✨</p>
            <button
              onClick={() => setCurrentIndex(0)}
              className="text-xs text-lime underline underline-offset-4"
            >
              처음부터 다시보기
            </button>
          </div>
        )}
      </div>

      {/* [하단] 미니 팜플렛 인디케이터 */}
      <div className="flex gap-1.5 px-6 max-w-full overflow-x-auto scrollbar-none py-2">
        {photos.map((src, index) => {
          // 현재 활성화된(맨 위) 사진인지 체크
          const isActive = index === (currentIndex >= photos.length ? photos.length - 1 : currentIndex);
          
          return (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-11 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                isActive 
                  ? "border-lime scale-110 shadow-md ring-2 ring-lime/20" 
                  : "border-transparent opacity-40 hover:opacity-70"
              }`}
            >
              <img src={src} className="w-full h-full object-cover pointer-events-none" />
            </button>
          );
        })}
      </div>

      {/* 원본 확대 Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-full w-full h-full p-0 border-0 bg-black/95 flex items-center justify-center">
          {selectedImage && (
            <img src={selectedImage} className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}