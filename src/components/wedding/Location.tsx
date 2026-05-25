import { useEffect, useState } from "react";
import { MapPin, Car, Bus, Train } from "lucide-react";

declare global {
  interface Window {
    naver: any;
  }
}

const ADDRESS = "서울 송파구 법원로9길 26 H비즈니스파크 D동 루이비스컨벤션 B1층";

export function Location() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

useEffect(() => {
    // 1. 메인 대가리(index.tsx)가 이미 네이버 스크립트를 잘 로드했는지 체크합니다.
    if (window.naver && window.naver.maps) {
      setIsScriptLoaded(true);
      return;
    }

    // 2. 혹시나 아직 로드가 안 되었다면, 로드될 때까지 0.1초마다 체크하는 안전장치
    const interval = setInterval(() => {
      if (window.naver && window.naver.maps) {
        setIsScriptLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  // 3. 네이버 지도 스크립트 로드가 완료된 후에만 실제 지도를 그립니다. (타이밍 버그 완벽 차단)
  useEffect(() => {
    if (!isScriptLoaded || !window.naver || !window.naver.maps) return;

    // 송파 루이비스컨벤션 정확한 좌표
    const weddingLocation = new window.naver.maps.LatLng(37.483446, 127.121543);

    const map = new window.naver.maps.Map("map", {
      center: weddingLocation,
      zoom: 16,
      zoomControl: false,
      scrollWheel: false, 
    });

    // 순정 핀 하나만 딱 꽂기
    new window.naver.maps.Marker({
      map: map,
      position: weddingLocation,
    });
  }, [isScriptLoaded]);

  return (
    <section className="px-8 py-12 text-center">
      <p className="text-xs tracking-[0.3em] text-lime mb-2">LOCATION</p>
      <h2 className="text-xl mb-6">오시는 길</h2>

      <div className="rounded-2xl overflow-hidden shadow-lg mb-4 bg-card">
        {/* 지도가 그려질 캔버스 영역 */}
        <div 
          id="map" 
          style={{ width: "100%", height: "224px", backgroundColor: "#f5f5f5" }} 
        />
      </div>

      <p className="font-serif-ko text-sm text-foreground/90 leading-relaxed">{ADDRESS}</p>
      <p className="text-xs text-foreground/60 mt-1">루이비스컨벤션 · B1층</p>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mt-5">
        <a
          href="https://map.naver.com/p/search/%EB%A3%A8%EC%9D%B4%EB%B9%84%EC%8A%A4%EC%BB%A8%EB%B2%A4%EC%85%98%EC%86%A1%ED%8C%8C%EB%AC%B8%EC%A0%95?c=17.56,0,0,0,dh"
          target="_blank" rel="noreferrer"
          className="flex-1 py-3 rounded-xl border border-lime/40 text-lime text-sm hover:bg-lime hover:text-lime-foreground transition text-center"
        >
          네이버 지도
        </a>
        <a
          href="https://map.kakao.com/?urlX=509316&urlY=1107616&itemId=&q=%EB%A3%A8%EC%9D%B4%EB%B9%84%EC%8A%A4%EC%BB%A8%EB%B2%A4%EC%85%98&srcid=&map_type=TYPE_MAP"
          target="_blank" rel="noreferrer"
          className="flex-1 py-3 rounded-xl bg-lime text-lime-foreground text-sm font-medium hover:opacity-90 transition text-center flex items-center justify-center"
        >
          <MapPin className="inline h-4 w-4 mr-1" />
          카카오 지도
        </a>
      </div>

      {/* 교통 정보 영역 */}
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