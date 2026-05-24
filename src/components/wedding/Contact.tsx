import { useState } from "react";
import { Phone, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const groom = [
  { rel: "신랑", name: "엄희승", phone: "010-1234-5678" },
  { rel: "신랑 아버지", name: "엄홍식", phone: "010-1111-2222" },
  { rel: "신랑 어머니", name: "고현경", phone: "010-3333-4444" },
];
const bride = [
  { rel: "신부", name: "정원재", phone: "010-8765-4321" },
  { rel: "신부 아버지", name: "정해정", phone: "010-5555-6666" },
  { rel: "신부 어머니", name: "지유신", phone: "010-7777-8888" },
];

function PersonRow({ rel, name, phone }: { rel: string; name: string; phone: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-foreground/10 last:border-0">
      <div>
        <p className="text-[11px] text-foreground/60">{rel}</p>
        <p className="text-sm text-foreground font-medium">{name}</p>
      </div>
      <div className="flex gap-2">
        <a href={`tel:${phone}`} className="grid place-items-center h-9 w-9 rounded-full bg-lime/20 text-lime hover:bg-lime hover:text-lime-foreground transition">
          <Phone className="h-4 w-4" />
        </a>
        <a href={`sms:${phone}`} className="grid place-items-center h-9 w-9 rounded-full bg-lime/20 text-lime hover:bg-lime hover:text-lime-foreground transition">
          <MessageSquare className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-8 py-12 text-center">
      <p className="text-xs tracking-[0.3em] text-lime mb-3">CONTACT</p>
      <h2 className="text-xl mb-6">연락처</h2>
      <button onClick={() => setOpen(true)} className="bg-lime text-lime-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
        연락하기
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[420px] bg-popover border-foreground/10 p-0 overflow-hidden">
          <div className="relative px-6 pt-8 pb-6"
            style={{ backgroundImage: "radial-gradient(circle, oklch(0.88 0.14 115 / 0.1) 1px, transparent 1.5px)", backgroundSize: "16px 16px" }}>
            <DialogTitle className="text-center font-serif-ko text-lg text-foreground">연락처</DialogTitle>
            <div className="grid grid-cols-2 gap-4 mt-6 text-left">
              <div>
                <p className="text-xs text-lime mb-2 text-center">신랑측</p>
                {groom.map((p) => <PersonRow key={p.name} {...p} />)}
              </div>
              <div>
                <p className="text-xs text-lime mb-2 text-center">신부측</p>
                {bride.map((p) => <PersonRow key={p.name} {...p} />)}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
