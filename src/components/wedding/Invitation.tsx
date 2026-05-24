import { Star } from "lucide-react";

export function Invitation() {
  return (
    <section className="px-8 py-16 text-center">
      <div className="flex justify-center gap-2 mb-8">
        <Star className="h-3 w-3 text-lime fill-lime" />
        <Star className="h-4 w-4 text-lime fill-lime" />
        <Star className="h-3 w-3 text-lime fill-lime" />
      </div>
      <p className="text-xs tracking-[0.3em] text-lime mb-6">INVITATION</p>
      <div className="font-serif-ko text-foreground/95 leading-loose text-[15px] space-y-6">
        <p>
          가을이 천천히 세상을 물들이듯,<br />
          저희도 서로의 삶을 닮아가려 합니다.
        </p>
        <p>
          7년의 기다림이 이뤄낸<br />
          이 아름다운 계절의 시작 앞에<br />
          소중한 여러분을 모십니다.
        </p>
      </div>

      <div className="mt-12 space-y-3 text-sm text-foreground/90">
        <p><span className="text-foreground/60">엄홍식 · 고현경</span><span className="mx-2">의 아들</span><span className="text-lime font-medium">희승</span></p>
        <p><span className="text-foreground/60">정해정 · 지유신</span><span className="mx-2">의 딸</span><span className="text-lime font-medium">원재</span></p>
      </div>

      <p className="font-serif-ko text-base text-foreground mt-10">
        엄희승 · 정원재 <span className="text-foreground/60 text-sm">드림</span>
      </p>
    </section>
  );
}
