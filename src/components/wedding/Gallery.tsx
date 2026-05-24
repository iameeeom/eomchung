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
export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [ /* R2 주소들 */ ];

  return (
    <section className="py-12">
      {/* ... 제목 부분 ... */}
      <div className="flex gap-3 overflow-x-auto px-8 snap-x snap-mandatory pb-4 scrollbar-none">
        {photos.map((src, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(src)} // 클릭 시 이미지 설정!
            className="h-[420px] w-[280px] flex-shrink-0 rounded-2xl snap-center shadow-lg bg-secondary/30 overflow-hidden cursor-pointer"
          >
            <img src={src} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 2단계: 확대 뷰어 (Modal) 추가 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)} // 아무데나 누르면 닫힘
        >
          <img src={selectedImage} className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </section>
  );
}
