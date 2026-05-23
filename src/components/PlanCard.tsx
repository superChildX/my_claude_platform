import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import type { KeyboardEvent } from "react";
import type { Plan, WarrantyOption } from "../types";
import { getPlanPrice, warrantyLabels } from "../data/siteData";

interface PlanCardProps {
  plan: Plan;
  selected: boolean;
  warranty: WarrantyOption;
  onSelect: () => void;
  onConsult: () => void;
}

export default function PlanCard({
  plan,
  selected,
  warranty,
  onSelect,
  onConsult,
}: PlanCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={[
        "group flex min-h-[360px] flex-col rounded-[8px] border bg-white p-5 shadow-crisp transition duration-200",
        selected
          ? "border-trust ring-4 ring-trust/12"
          : "border-line hover:-translate-y-1 hover:border-trust/40 hover:shadow-lift",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-trust">
            {plan.tier}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
            {plan.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">{plan.summary}</p>
        </div>
        {selected ? (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-trust text-white">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-mist text-ink-soft transition group-hover:text-trust">
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-2">
        <span className="price-text font-display text-4xl font-semibold leading-none">
          ¥{getPlanPrice(plan, warranty)}
        </span>
        <span className="pb-1 text-sm font-medium text-ink-soft">
          当前：{warrantyLabels[warranty]}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-[8px] border border-line bg-paper px-3 py-2">
          <span className="block text-xs text-ink-soft">无质保</span>
          <span className="price-text font-semibold text-ink">¥{plan.basePrice}</span>
        </div>
        <div className="rounded-[8px] border border-line bg-paper px-3 py-2">
          <span className="block text-xs text-ink-soft">掉订阅质保</span>
          <span className="price-text font-semibold text-ink">
            ¥{plan.warrantyPrice}
          </span>
        </div>
      </div>

      <ul className="mt-5 space-y-3 text-sm leading-6 text-ink-soft">
        {plan.highlights.map((item) => (
          <li key={item} className="flex gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onConsult();
          }}
          className={[
            "flex h-11 w-full items-center justify-center gap-2 rounded-[8px] px-4 text-sm font-bold transition",
            selected
              ? "bg-ink text-white hover:bg-trust-dark"
              : "bg-mist text-ink hover:bg-ink hover:text-white",
          ].join(" ")}
        >
          <span>咨询购买</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
