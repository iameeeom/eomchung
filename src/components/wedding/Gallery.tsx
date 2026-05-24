import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // 스와이프 감지를 위한 터치 시작 좌표 저장용 ref
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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

// 스와이프 방향을 판별하는 공통 로직 (최소 50px 이상 움직여야 작동)
  const handleSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        onSwipeLeft(); // 오른쪽에서 왼쪽으로 쉭 (다음 사진)
      } else {
        onSwipeRight(); // 왼쪽에서 오른쪽으로 쉭 (이전 사진)
      }
    }
  };

  // 1. 메인 카드 스택용 스와이프 제어
  const handleMainSwipeLeft = () => {
    if (currentIndex < photos.length) setCurrentIndex((prev) => prev + 1);
  };
  const handleMainSwipeRight = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // 2. 확대 뷰어용 스와이프 제어
  const handleModalSwipeLeft = () => {
    if (selectedImageIndex !== null && selectedImageIndex < photos.length - 1) {
      setSelectedImageIndex((prev) => prev! + 1);
    }
  };
  const handleModalSwipeRight = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev! - 1);
    }
  };

  return (
    <section className="py-12 flex flex-col items-center overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GALLERY</p>
        <h2 className="text-xl">우리의 순간</h2>
        <p className="text-xs text-foreground/40 mt-1">카드를 좌우로 쓸어 넘겨보세요</p>
      </div>

      {/* [상단] 메인 카드 영역 (터치 이벤트 바인딩) */}
      <div 
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          touchEndX.current = e.changedTouches[0].clientX;
          handleSwipe(handleMainSwipeLeft, handleMainSwipeRight);
        }}
        className="relative w-[280px] h-[420px] flex items-center justify-start mb-8"
      >
        {photos.map((src, index) => {
          const isGone = index < currentIndex;
          const isTop = index === currentIndex;
          
          const stackOrder = index - currentIndex;
          const translateX = stackOrder >= 0 && stackOrder < 3 ? stackOrder * 14 : 0;
          const scale = stackOrder >= 0 && stackOrder < 3 ? 1 - stackOrder * 0.05 : 0.9;
          const opacity = stackOrder >= 0 && stackOrder < 3 ? 1 - stackOrder * 0.35 : 0;

          return (
            <div
              key={index}
              style={{
                transform: isGone 
                  ? "translateX(-150%) rotate(-10deg)" 
                  : `translateX(${translateX}px) scale(${scale})`,
                opacity: isGone ? 0 : opacity,
                zIndex: photos.length - index,
                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="absolute w-full h-full rounded-2xl bg-secondary/30 shadow-xl overflow-hidden origin-bottom-left select-none pointer-events-auto"
            >
              <img src={src} className="w-full h-full object-cover pointer-events-none" />
              
              {isTop && (
                <button 
                  onClick={() => setSelectedImageIndex(index)}
                  className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm z-10"
                >
                  확대보기
                </button>
              )}
            </div>
          );
        })}

        {currentIndex >= photos.length && (
          <div className="w-full text-center animate-in fade-in zoom-in duration-300 z-10">
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
          const isActive = index === (currentIndex >= photos.length ? photos.length - 1 : currentIndex);
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
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

      {/* [팝업] 원본 확대 Dialog (여기서도 스와이프 가능!) */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent 
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            touchEndX.current = e.changedTouches[0].clientX;
            handleSwipe(handleModalSwipeLeft, handleModalSwipeRight);
          }}
          className="max-w-full w-full h-full p-0 border-0 bg-black/95 flex items-center justify-center outline-none"
        >
          {selectedImageIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={photos[selectedImageIndex]} 
                key={selectedImageIndex} // 사진 바뀔 때 페이드인 효과 주려고 key 바인딩
                className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg animate-in fade-in duration-200" 
              />
              <p className="absolute bottom-6 text-white/40 text-xs tracking-widest">
                {selectedImageIndex + 1} / {photos.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}