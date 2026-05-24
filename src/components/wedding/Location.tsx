import { MapPin, Car, Bus, Train } from "lucide-react";

const ADDRESS = "서울 송파구 법원로9길 26 H비즈니스파크 D동 루이비스컨벤션 B1층";

export function Location() {
  return (
    <section className="px-8 py-12 text-center">
      <p className="text-xs tracking-[0.3em] text-lime mb-2">LOCATION</p>
      <h2 className="text-xl mb-6">오시는 길</h2>

      <div className="rounded-2xl overflow-hidden shadow-lg mb-4 bg-card">
        <iframe
          title="kakao map"
          src="https://map.kakao.com/?urlX=509316&urlY=1107616&itemId=&q=루이비스컨벤션&srcid=&map_type=TYPE_MAP"
          className="w-full h-56 border-0"
          loading="lazy"
        />
      </div>

      <p className="font-serif-ko text-sm text-foreground/90 leading-relaxed">{ADDRESS}</p>
      <p className="text-xs text-foreground/60 mt-1">루이비스컨벤션 · B1층</p>

      {/* --- 버튼 수정된 부분 시작 --- */}
      <div className="flex gap-2 mt-5">
        <a
          href="여기에_네이버_지도_URL_넣기"
          target="_blank" rel="noreferrer"
          className="flex-1 py-3 rounded-xl border border-lime/40 text-lime text-sm hover:bg-lime hover:text-lime-foreground transition text-center"
        >
          네이버 지도
        </a>
        <a
          href="여기에_카카오_지도_URL_넣기"
          target="_blank" rel="noreferrer"
          className="flex-1 py-3 rounded-xl bg-lime text-lime-foreground text-sm font-medium hover:opacity-90 transition text-center flex items-center justify-center"
        >
          <MapPin className="inline h-4 w-4 mr-1" />
          카카오 지도
        </a>
      </div>
      {/* --- 버튼 수정된 부분 끝 --- */}

      <div className="mt-6 text-left bg-secondary/40 rounded-xl p-4 space-y-3">
        <div className="flex gap-3">
          <Bus className="h-4 w-4 text-lime flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-lime mb-1">셔틀버스</p>
            <p className="text-xs text-foreground/80">8호선 문정역 4번 출구 앞 셔틀버스 10분 배차 운행</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Train className="h-4 w-4 text-lime flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-lime mb-1">대중교통</p>
            <p className="text-xs text-foreground/80">지하철 8호선 문정역 4번 출구 도보 10분 / 버스 이용시 문정로데오거리 하차</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Car className="h-4 w-4 text-lime flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-lime mb-1">주차 안내</p>
            <p className="text-xs text-foreground/80">건물 내 지하 주차장 이용 (2시간 무료), 최대 1,300대 수용</p>
          </div>
        </div>
      </div>
    </section>
  );
}