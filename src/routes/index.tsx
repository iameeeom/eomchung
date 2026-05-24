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
      { name: "description", content: "7년의 기다림이 이뤄낸 아름다운 계절의 시작. 2026년 10월 24일 오후 6시, 루이비스컨벤션." },
      { property: "og:title", content: "엄희승 ❤️ 정원재 결혼합니다" },
      { property: "og:description", content: "2026.10.24 SAT 6PM · 루이비스컨벤션" },
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
      <Venue />
      <Divider />
      <Account />
      <Divider />
      <RSVP />
      <Divider />
      <Guestbook />
      <Divider />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
