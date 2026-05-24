import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HIDE_KEY = "rsvp-hide-date";

export function RSVP() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"신랑측" | "신부측">("신랑측");
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"참석" | "불참석">("참석");
  const [count, setCount] = useState("");
  const [companion, setCompanion] = useState("");
  const [meal, setMeal] = useState<"예정" | "안함" | "미정">("예정");
  const [hideToday, setHideToday] = useState(false);
  const [submitting, setSubmitting] = useState(false);

// 주석 처리된 모습
  /*
  useEffect(() => {
    const today = new Date().toDateString();
    if (typeof window !== "undefined" && localStorage.getItem(HIDE_KEY) !== today) {
      const t = setTimeout(() => setOpen(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);
  */

  const submit = async () => {
    if (!name.trim()) { toast.error("성함을 입력해주세요"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("rsvp_submissions").insert({
      side, name, attendance,
      guest_count: count ? parseInt(count) : 1,
      companion: companion || null,
      meal_preference: meal,
    });
    setSubmitting(false);
    if (error) { console.error("RSVP insert error:", error); toast.error("전송에 실패했습니다. 잠시 후 다시 시도해주세요."); return; }
    if (hideToday) localStorage.setItem(HIDE_KEY, new Date().toDateString());
    toast.success("참석 의사가 전달되었습니다 ✨");
    setOpen(false);
  };

  const Toggle = ({ v, cur, on }: { v: string; cur: string; on: () => void }) => (
    <button onClick={on} className={`flex-1 py-2.5 rounded-lg text-sm transition ${cur === v ? "bg-lime text-lime-foreground font-medium" : "bg-secondary/50 text-foreground/70 hover:bg-secondary"}`}>{v}</button>
  );

  return (
    <>
      <section className="px-8 py-12 text-center">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">RSVP</p>
        <h2 className="text-xl mb-6">참석 여부 전달</h2>
        <button onClick={() => setOpen(true)} className="bg-lime text-lime-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
          참석 의사 전달하기
        </button>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[440px] bg-popover border-foreground/10 p-0 overflow-hidden"
          style={{ animation: "slideUp 0.35s ease-out" }}>
          <div className="px-6 pt-7 pb-6">
            
            <DialogTitle className="font-serif-ko text-lg text-foreground text-center mb-1">참석 의사 전달</DialogTitle>
            <p className="text-xs text-foreground/60 text-center mb-5">소중한 시간 내어주셔서 감사합니다</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-foreground/70 mb-2 block">구분</label>
                <div className="flex gap-2">
                  <Toggle v="신랑측" cur={side} on={() => setSide("신랑측")} />
                  <Toggle v="신부측" cur={side} on={() => setSide("신부측")} />
                </div>
              </div>
              <div>
                <label className="text-xs text-foreground/70 mb-2 block">성함</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-secondary/50 rounded-lg px-3 py-2.5 text-sm text-foreground border border-foreground/10 focus:border-lime focus:outline-none" placeholder="홍길동" />
              </div>
              <div>
                <label className="text-xs text-foreground/70 mb-2 block">참석 여부</label>
                <div className="flex gap-2">
                  <Toggle v="참석" cur={attendance} on={() => setAttendance("참석")} />
                  <Toggle v="불참석" cur={attendance} on={() => setAttendance("불참석")} />
                </div>
              </div>
              <div>
                <label className="text-xs text-foreground/70 mb-2 block">참석 인원</label>
                <input value={count} onChange={(e) => setCount(e.target.value)} type="number" min={1} className="w-full bg-secondary/50 rounded-lg px-3 py-2.5 text-sm text-foreground border border-foreground/10 focus:border-lime focus:outline-none" placeholder="본인 포함 총 참석인원" />
              </div>
              <div>
                <label className="text-xs text-foreground/70 mb-2 block">동행인</label>
                <input value={companion} onChange={(e) => setCompanion(e.target.value)} className="w-full bg-secondary/50 rounded-lg px-3 py-2.5 text-sm text-foreground border border-foreground/10 focus:border-lime focus:outline-none" placeholder="함께 오시는 분 성함" />
              </div>
              <div>
                <label className="text-xs text-foreground/70 mb-2 block">식사 여부</label>
                <div className="flex gap-2">
                  <Toggle v="예정" cur={meal} on={() => setMeal("예정")} />
                  <Toggle v="안함" cur={meal} on={() => setMeal("안함")} />
                  <Toggle v="미정" cur={meal} on={() => setMeal("미정")} />
                </div>
              </div>

              <button onClick={submit} disabled={submitting} className="w-full bg-lime text-lime-foreground py-3 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50 mt-2">
                {submitting ? "전송 중..." : "참석 의사 전달하기"}
              </button>

              <label className="flex items-center gap-2 text-xs text-foreground/60 justify-center cursor-pointer">
                <input type="checkbox" checked={hideToday} onChange={(e) => setHideToday(e.target.checked)} className="accent-lime" />
                오늘 하루 보지 않기
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
