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
