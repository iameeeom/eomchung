import hero from "@/assets/hero.jpg";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <img src={hero} alt="엄희승 정원재 결혼식" className="absolute inset-0 h-full w-full object-cover" width={768} height={1024} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/90" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center">
        <p className="text-xs tracking-[0.4em] text-lime mb-3 fade-in-up">WE ARE GETTING MARRIED</p>
        <h1 className="font-serif-ko text-3xl text-foreground fade-in-up" style={{ animationDelay: "0.2s" }}>
          엄희승 <span className="text-lime mx-2">&</span> 정원재
        </h1>
        <p className="mt-4 text-sm text-foreground/80 fade-in-up" style={{ animationDelay: "0.4s" }}>
          2026. 10. 24 SAT · 6:00 PM
        </p>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bounce-slow text-lime">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
