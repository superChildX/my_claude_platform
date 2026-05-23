import { MessageCircle } from "lucide-react";
import { getPlanPrice, warrantyLabels } from "../data/siteData";
import type { Plan, WarrantyOption } from "../types";

interface MobileConsultBarProps {
  plan: Plan;
  warranty: WarrantyOption;
  onConsult: () => void;
}

export default function MobileConsultBar({
  plan,
  warranty,
  onConsult,
}: MobileConsultBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-3 shadow-lift backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-ink-soft">
            {plan.shortName} · {warrantyLabels[warranty]}
          </p>
          <p className="price-text truncate font-display text-2xl font-semibold leading-7">
            ¥{getPlanPrice(plan, warranty)}
          </p>
        </div>
        <button
          type="button"
          onClick={onConsult}
          className="flex h-12 shrink-0 items-center gap-2 rounded-[8px] bg-ink px-4 text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>咨询购买</span>
        </button>
      </div>
    </div>
  );
}
