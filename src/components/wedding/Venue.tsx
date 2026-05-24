export function Venue() {
  return (
    <section className="px-8 py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">VENUE</p>
        <h2 className="text-xl">예식장 안내</h2>
      </div>
      <div className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-lg">
        <div className="w-full h-48 bg-black/20 flex items-center justify-center">
          <span className="text-lime/40 font-mono text-sm">photo.png</span>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="font-serif-ko text-base">루이비스컨벤션</p>
            <p className="text-xs text-card-foreground/60 mt-1">H비즈니스파크 D동 B1층</p>
          </div>
          <hr className="border-card-foreground/10" />
          <div className="text-xs text-card-foreground/80 space-y-2 leading-relaxed">
            <p>· 모던 컨벤션 홀, 최대 400석 규모</p>
            <p>· 가든 스타일 인테리어와 자연 채광</p>
            <p>· 한식·양식 코스 뷔페 제공</p>
          </div>
        </div>
      </div>
    </section>
  );
}
