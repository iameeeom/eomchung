import { useEffect, useState } from "react";

const TARGET = new Date("2026-10-24T18:00:00+09:00");

function daysBetween() {
  const now = new Date();
  return Math.max(0, Math.ceil((TARGET.getTime() - now.getTime()) / 86400000));
}

export function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      const diff = Math.max(0, TARGET.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Build October 2026 calendar (starts Thursday)
  const year = 2026, month = 9; // Oct = 9
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <section className="px-8 py-12 text-center">
      <p className="text-xs tracking-[0.3em] text-lime mb-2">THE DAY</p>
      <h2 className="text-xl mb-6">2026년 10월 24일 토요일 오후 6시</h2>

      <div className="bg-card text-card-foreground rounded-2xl p-5 shadow-lg">
        <p className="font-serif-ko text-sm mb-3 text-card-foreground/70">October 2026</p>
        <div className="grid grid-cols-7 gap-1 text-[11px] text-card-foreground/60 mb-2">
          {["일","월","화","수","목","금","토"].map((d, i) => (
            <div key={d} className={i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : ""}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {cells.map((d, i) => {
            const isTarget = d === 24;
            const col = i % 7;
            return (
              <div key={i} className={`aspect-square grid place-items-center rounded-full ${
                isTarget ? "bg-lime text-lime-foreground font-bold" :
                col === 0 ? "text-red-400" : col === 6 ? "text-blue-400" : "text-card-foreground"
              }`}>
                {d ?? ""}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {[["DAYS", t.d], ["HOUR", t.h], ["MIN", t.m], ["SEC", t.s]].map(([l, v]) => (
          <div key={l as string} className="bg-secondary/40 rounded-xl py-3">
            <p className="text-xl font-bold text-lime">{String(v).padStart(2, "0")}</p>
            <p className="text-[10px] text-foreground/60 tracking-widest mt-1">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-foreground/80">
        <span className="text-lime">엄희승</span> ❤️ <span className="text-lime">정원재</span>의 결혼식이 <span className="text-lime font-bold">{daysBetween()}</span>일 남았습니다
      </p>
    </section>
  );
}
