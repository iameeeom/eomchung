import { Star } from "lucide-react";

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-8 opacity-60">
      <span className="h-px w-12 bg-foreground/30" />
      <Star className="h-3 w-3 text-lime fill-lime" />
      <span className="h-px w-12 bg-foreground/30" />
    </div>
  );
}
