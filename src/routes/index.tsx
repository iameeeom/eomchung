import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";
import { Invitation } from "@/components/wedding/Invitation";
import { Contact } from "@/components/wedding/Contact";
import { Gallery } from "@/components/wedding/Gallery";
import { Countdown } from "@/components/wedding/Countdown";
import { Location } from "@/components/wedding/Location";
import { Venue } from "@/components/wedding/Venue";
import { Account } from "@/components/wedding/Account";
import { RSVP } from "@/components/wedding/RSVP";
import { Guestbook } from "@/components/wedding/Guestbook";
import { Footer } from "@/components/wedding/Footer";
import { Divider } from "@/components/wedding/Divider";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "엄희승 ❤️ 정원재 결혼합니다 · 2026.10.24" },
      { name: "description", content: "2026.10.24 (토) 18시\n\n루이비스컨벤션 송파문정" },
      { property: "og:title", content: "엄희승 ❤️ 정원재 결혼합니다" },
      { property: "og:description", content: "2026.10.24 (토) 18시\n\n루이비스컨벤션 송파문정" },
      { property: "og:image", content: "https://pub-8f580169132843aba335fb45f2847fd7.r2.dev/ogimage.jpg"},
    ],
script: [
      {
        // ⚠️ [핵심 변경 포인트] 
        // 일반 openapi 주소가 아니라, 네이버 클라우드 플랫폼(NCP) 전용 주소인 'openapi.map.naver.com/openapi/v3/maps.js' 형식으로 정확히 호출합니다.
        // ncpClientId 파라미터 뒤에 Heeseung님의 진짜 ID '5v6tozs9n6'를 완벽하게 결합했습니다.
        src: "https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=5v6tozs9n1",
        type: "text/javascript",
      },
    ],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" }
  ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="shell">
      <Hero />
      <Invitation />
      <Divider />
      <Contact />
      <Divider />
      <Gallery />
      <Divider />
      <Countdown />
      <Divider />
      <Location />
      <Divider />
      {/*<Venue />*/}
      <Divider />
      <Account />
      <Divider />
      {/*<<RSVP />*/}
      <Divider />
      <Guestbook />
      <Divider />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
