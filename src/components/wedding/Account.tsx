import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

// 데이터를 이렇게 계층형으로 관리하면 편합니다!
const groomAcc = [
  { name: "엄희승 (신랑)", bank: "하나은행", number: "589-910287-07007" },
  { name: "엄홍식 (신랑 부)", bank: "국민은행", number: "111-222-333333" },
  { name: "고현경 (신랑 모)", bank: "우리은행", number: "444-555-666666" },
];

const brideAcc = [
  { name: "정원재 (신부)", bank: "신한은행", number: "110-583-524935" },
  { name: "정해정 (신부 부)", bank: "기업은행", number: "777-888-999999" },
  { name: "지유신 (신부 모)", bank: "기업은행", number: "777-888-999999" },
];

function Row({ name, bank, number }: { name: string; bank: string; number: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    toast.success("계좌번호가 복사되었습니다");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center justify-between py-3 border-b border-foreground/10 last:border-0">
      <div>
        <p className="text-xs text-foreground/60">{name}</p>
        <p className="text-sm text-foreground"><span className="text-lime">{bank}</span> {number}</p>
      </div>
      <button onClick={copy} className="grid place-items-center h-9 w-9 rounded-full bg-lime/20 text-lime hover:bg-lime hover:text-lime-foreground transition">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function Account() {
  return (
    <section className="px-8 py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-lime mb-2">ACCOUNT</p>
        <h2 className="text-xl">마음 전하실 곳</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="groom" className="bg-secondary/40 rounded-xl px-4 border-0">
          <AccordionTrigger className="text-sm hover:no-underline text-foreground"><span className="text-lime mr-2">신랑측</span> 계좌번호</AccordionTrigger>
          <AccordionContent>{groomAcc.map(a => <Row key={a.number} {...a} />)}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="bride" className="bg-secondary/40 rounded-xl px-4 border-0">
          <AccordionTrigger className="text-sm hover:no-underline text-foreground"><span className="text-lime mr-2">신부측</span> 계좌번호</AccordionTrigger>
          <AccordionContent>{brideAcc.map(a => <Row key={a.number} {...a} />)}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}