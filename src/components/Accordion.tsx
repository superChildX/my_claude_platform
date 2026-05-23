import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  summary?: string;
  icon?: LucideIcon;
  body: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
}

export default function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState(defaultOpenId ?? items[0]?.id);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[8px] border border-line bg-white shadow-crisp">
      {items.map((item) => {
        const Icon = item.icon;
        const open = item.id === openId;

        return (
          <section key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${item.id}-panel`}
              onClick={() => setOpenId(open ? "" : item.id)}
              className="flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-mist/70 sm:px-6"
            >
              {Icon ? (
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-mist text-trust">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-semibold text-ink">
                  {item.title}
                </span>
                {item.summary ? (
                  <span className="mt-1 block text-sm leading-6 text-ink-soft">
                    {item.summary}
                  </span>
                ) : null}
              </span>
              <ChevronDown
                className={[
                  "h-5 w-5 shrink-0 text-ink-soft transition",
                  open ? "rotate-180" : "",
                ].join(" ")}
                aria-hidden="true"
              />
            </button>
            <div
              id={`${item.id}-panel`}
              hidden={!open}
              className="px-4 pb-5 sm:px-6"
            >
              {item.body}
            </div>
          </section>
        );
      })}
    </div>
  );
}
