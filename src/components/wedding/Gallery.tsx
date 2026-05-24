import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RotateCcw } from "lucide-react"; // 다시보기 아이콘

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
// 카드를 밀어내는 함수
  const handleCardClick = (index: number) => {
    // 맨 위에 있는 카드만 작동하도록 제어
    if (index === currentIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // 모든 사진을 다 봤을 때 처음으로 되돌리는 함수
  const handleReset = () => {
    setCurrentIndex(0);
  };

  return (
    <section className="py-12 flex flex-col items-center overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GALLERY</p>
        <h2 className="text-xl">우리의 순간</h2>
        <p className="text-xs text-foreground/40 mt-1">카드를 터치해서 넘겨보세요</p>
      </div>

      {/* 카드 스택 컨테이너 */}
      <div className="relative w-[300px] h-[450px] flex items-center justify-center">
        {photos.map((src, index) => {
          // 이미 넘어간 카드는 화면 왼쪽으로 날려버림
          const isGone = index < currentIndex;
          // 현재 맨 위에 보여야 하는 카드인지 확인
          const isTop = index === currentIndex;
          
          // 스택 효과를 주기 위해 뒤에 있는 카드들은 살짝 아래로 내리고 작게 만듦
          const stackOrder = index - currentIndex;
          const translateY = stackOrder >= 0 && stackOrder < 3 ? stackOrder * 12 : 0;
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
              className={`absolute w-full h-full rounded-2xl bg-secondary/30 shadow-xl overflow-hidden cursor-pointer origin-bottom-left select-none`}
            >
              <img src={src} className="w-full h-full object-cover pointer-events-none" />
              
              {/* 맨 위 카드를 '길게 누르면' 원본 확대 팝업 오픈 */}
              {isTop && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 넘어가기 버블링 방지
                    setSelectedImage(src);
                  }}
                  className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm"
                >
                  확대보기
                </div>
              )}
            </div>
          );
        })}

        {/* 모든 카드를 다 넘겼을 때 나타나는 Reset 화면 */}
        {currentIndex >= photos.length && (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <p className="text-sm text-foreground/60 mb-4">사진을 모두 확인하셨습니다 ✨</p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 mx-auto bg-lime text-lime-foreground px-5 py-2.5 rounded-full text-xs font-medium hover:opacity-90 transition shadow-md"
            >
              <RotateCcw size={14} />
              처음부터 다시보기
            </button>
          </div>
        )}
      </div>

      {/* 원본 확대 Dialog (기존 기능 유지) */}
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