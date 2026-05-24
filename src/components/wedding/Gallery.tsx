export function Gallery() {
  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GALLERY</p>
        <h2 className="text-xl">우리의 순간</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto px-8 snap-x snap-mandatory pb-4 scrollbar-none">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[420px] w-[280px] flex-shrink-0 rounded-2xl snap-center shadow-lg bg-secondary/30 flex items-center justify-center"
          >
            <span className="text-lime/40 font-mono text-sm">photo.png</span>
          </div>
        ))}
      </div>
    </section>
  );
}
