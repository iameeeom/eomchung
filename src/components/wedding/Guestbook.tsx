import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { id: string; author: string; content: string; color_index: number; created_at: string };

const COLORS = [
  "bg-[#fef3a8]", "bg-[#ffd6a5]", "bg-[#caffbf]",
  "bg-[#a0e7e5]", "bg-[#ffadad]", "bg-[#d8e592]",
];
const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0", "-rotate-3"];

export function Guestbook() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    supabase.from("guestbook_messages").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setMsgs(data as Msg[]); });

    const channel = supabase.channel("guestbook")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "guestbook_messages" },
        (payload) => { setMsgs((prev) => [payload.new as Msg, ...prev]); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const submit = async () => {
    if (!author.trim() || !content.trim()) { toast.error("이름과 메시지를 입력해주세요"); return; }
    setSending(true);
    const { error } = await supabase.from("guestbook_messages").insert({
      author, content, color_index: Math.floor(Math.random() * COLORS.length),
    });
    setSending(false);
    if (error) { toast.error("등록 실패"); return; }
    setAuthor(""); setContent("");
    toast.success("메시지가 등록되었습니다 💌");
  };

  // Split into 2 masonry cols
  const col1 = msgs.filter((_, i) => i % 2 === 0);
  const col2 = msgs.filter((_, i) => i % 2 === 1);

  return (
    <section className="px-6 py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">GUESTBOOK</p>
        <h2 className="text-xl">축하 메시지</h2>
      </div>

      <div className="bg-secondary/40 rounded-2xl p-4 space-y-3 mb-6">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="이름" maxLength={20}
          className="w-full bg-background/40 rounded-lg px-3 py-2.5 text-sm border border-foreground/10 focus:border-lime focus:outline-none" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="축하 메시지를 남겨주세요" rows={3} maxLength={300}
          className="w-full bg-background/40 rounded-lg px-3 py-2.5 text-sm border border-foreground/10 focus:border-lime focus:outline-none resize-none" />
        <button onClick={submit} disabled={sending} className="w-full bg-lime text-lime-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {sending ? "등록 중..." : "메시지 남기기"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[col1, col2].map((col, ci) => (
          <div key={ci} className="space-y-3">
            {col.map((m) => (
              <div key={m.id} className={`${COLORS[m.color_index % COLORS.length]} ${ROTATIONS[m.color_index % ROTATIONS.length]} text-stone-800 p-3 rounded-lg shadow-md transition hover:rotate-0 hover:scale-[1.03]`}>
                <p className="text-xs leading-relaxed whitespace-pre-wrap break-words font-serif-ko">{m.content}</p>
                <p className="text-[10px] text-stone-700 mt-2 font-medium">— {m.author}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {msgs.length === 0 && (
        <p className="text-center text-xs text-foreground/50 mt-6">첫 메시지를 남겨주세요 ✨</p>
      )}
    </section>
  );
}
