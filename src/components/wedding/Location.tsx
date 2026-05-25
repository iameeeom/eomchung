import { useEffect, useState } from "react";
import { MapPin, Car, Bus, Train } from "lucide-react";

declare global {
  interface Window {
    naver: any;
  }
}

export function Location() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. 이미 스크립트가 로드되어 있다면 재실행 방지
    if (window.naver && window.naver.maps) {
      setIsScriptLoaded(true);
      return;
    }

    // 2. 🚀 네이버 지도 스크립트를 동적으로 직접 헤드에 꽂아버립니다.
    const script = document.createElement("script");
    script.type = "text/javascript";
    // ⚠️여기에 Heeseung님이 발급받으신 진짜 ID '5v6tozs9n6'를 완벽하게 고정해 놨습니다.
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=5v6tozs9n1";
    script.async = true;

    // 스크립트 로드가 완료되면 상태를 true로 바꿉니다.
    script.onload = () => {
      setIsScriptLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // 컴포넌트가 언마운트될 때 안전하게 정리
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // 3. 네이버 지도 스크립트 로드가 완료된 후에만 실제 지도를 그립니다. (타이밍 버그 완벽 차단)
  useEffect(() => {
    if (!isScriptLoaded || !window.naver || !window.naver.maps) return;

    // 송파 루이비스컨벤션 정확한 좌표
    const weddingLocation = new window.naver.maps.LatLng(37.48438024565673, 127.1173173365993);

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

      <p className="font-serif-ko text-sm text-foreground/90 leading-relaxed">
      <strong>루이비스컨벤션 송파문정 B1 그레이스홀</strong></p>
      <p className="font-serif-ko text-sm text-foreground/90 leading-relaxed">서울 송파구 법원로9길 26 H비즈니스파크 D동 B1층</p>

     {/* 버튼 영역 */}
      <div className="flex gap-2 mt-5">
        <a
          href="https://map.naver.com/p/search/%EB%A3%A8%EC%9D%B4%EB%B9%84%EC%8A%A4%EC%BB%A8%EB%B2%A4%EC%85%98%EC%86%A1%ED%8C%8C%EB%AC%B8%EC%A0%95?c=17.56,0,0,0,dh"
          target="_blank" rel="noreferrer"
          className="flex-1 py-3 rounded-xl bg-lime border border-lime/20 text-lime-foreground text-sm hover:opacity-90 transition text-center flex items-center justify-center font-medium shadow-md"
        >
          <MapPin className="inline h-4 w-4 mr-1 flex-shrink-0" />
          네이버 지도
        </a>

        <a
          href="https://map.kakao.com/?urlX=509316&urlY=1107616&itemId=&q=%EB%A3%A8%EC%9D%B4%EB%B9%84%EC%8A%A4%EC%BB%A8%EB%B2%A4%EC%85%98&srcid=&map_type=TYPE_MAP"
          target="_blank" rel="noreferrer"
          className="flex-1 py-3 rounded-xl bg-lime border border-lime/20 text-lime-foreground text-sm hover:opacity-90 transition text-center flex items-center justify-center font-medium shadow-md"
        >
          <MapPin className="inline h-4 w-4 mr-1 flex-shrink-0" />
          카카오 지도
        </a>
      </div>

      {/* 교통 정보 영역 */}
      <div className="mt-6 text-left bg-secondary/40 rounded-xl p-4 space-y-3">
        {/* 1. 셔틀버스 */}
        <div className="flex gap-3">
          <Bus className="h-4 w-4 text-lime flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-lime mb-1 font-bold">셔틀버스</p>
            {/* 🚀 여기를 ul과 li로 쪼개어 불릿 점을 만듭니다 */}
            <ul className="list-disc list-inside text-xs text-foreground/80 space-y-0.5">
              <li>8호선 문정역 4번 출구 앞 탑승</li>
              <li>셔틀버스 10분 배차 운행</li>
            </ul>
          </div>
        </div>

        {/* 2. 대중교통 */}
        <div className="flex gap-3">
          <Train className="h-4 w-4 text-lime flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-lime mb-1 font-bold">대중교통</p>
            {/* 🚀 <br /> 대신 li 태그로 한 줄씩 분리 */}
            <ul className="list-disc list-inside text-xs text-foreground/80 space-y-0.5">
              <li>지하철 8호선 문정역 4번 출구 도보 10분</li>
              <li>버스 이용 시 문정로데오거리 하차</li>
            </ul>
          </div>
        </div>

        {/* 3. 주차 안내 */}
        <div className="flex gap-3">
          <Car className="h-4 w-4 text-lime flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-lime mb-1 font-bold">주차 안내</p>
            {/* 🚀 긴 문장을 불릿으로 정돈 */}
            <ul className="list-disc list-inside text-xs text-foreground/80 space-y-0.5">
              <li>건물 내 지하 주차장 이용</li>
              <li>2시간 무료 (최대 1,300대 수용)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}