import { Share2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 복사되었습니다");
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "엄희승 ❤️ 정원재 결혼식", url: window.location.href }); }
      catch {/* ignore */}
    } else copy();
  };
  return (
    <footer className="px-8 py-12 text-center">
      <div className="flex gap-3 justify-center mb-8">
        <button onClick={share} className="flex items-center gap-2 bg-lime text-lime-foreground px-5 py-2.5 rounded-full text-xs font-medium hover:opacity-90">
          <Share2 className="h-4 w-4" /> 카카오톡 공유
        </button>
        <button onClick={copy} className="flex items-center gap-2 border border-lime/40 text-lime px-5 py-2.5 rounded-full text-xs font-medium hover:bg-lime hover:text-lime-foreground transition">
          <LinkIcon className="h-4 w-4" /> 링크 복사
        </button>
      </div>
      <p className="font-serif-ko text-sm text-foreground/70">엄희승 ❤️ 정원재</p>
      <p className="text-[10px] text-foreground/40 mt-2 tracking-widest">2026. 10. 24</p>
    </footer>
  );
}
