import { CheckCircle2, FileText, ShieldAlert } from "lucide-react";
import Accordion from "../components/Accordion";
import { guideFaq, noticeSections } from "../data/siteData";
import { usePageMeta } from "../hooks/usePageMeta";

export default function GuidePage() {
  usePageMeta(
    "购买须知｜Claude 订阅服务",
    "购买 Claude 订阅服务前需要了解的账号、网络、使用节奏与风险边界说明。",
  );

  const noticeItems = noticeSections.map((section) => ({
    id: section.id,
    title: section.title,
    summary: section.summary,
    icon: section.icon,
    body: (
      <ul className="space-y-3 text-sm leading-7 text-ink-soft">
        {section.items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  const faqItems = guideFaq.map((item, index) => ({
    id: `guide-faq-${index}`,
    title: item.question,
    body: <p className="text-sm leading-7 text-ink-soft">{item.answer}</p>,
  }));

  return (
    <main>
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-[8px] border border-line bg-white px-3 py-2 text-sm font-semibold text-ink-soft shadow-crisp">
            <FileText className="h-4 w-4 text-trust" aria-hidden="true" />
            <span>购买前阅读</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            购买须知
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">
            下面不是保证稳定的技巧清单，而是降低常见风险的使用建议。最终稳定性仍会受到平台风控、账号历史和网络环境影响。
          </p>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[8px] border border-amber/30 bg-amber/[0.08] p-5 text-sm leading-7 text-ink-soft shadow-crisp lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 flex items-center gap-2 font-semibold text-amber">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              <span>重要说明</span>
            </div>
            <p>
              本站不会承诺规避平台风控。建议在购买前确认账号和网络条件，并接受质保说明中的售后边界。
            </p>
          </aside>
          <Accordion items={noticeItems} defaultOpenId="account" />
        </div>
      </section>

      <section className="section-rule bg-paper px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-trust">faq</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">常见问题</h2>
          </div>
          <Accordion items={faqItems} defaultOpenId="guide-faq-0" />
        </div>
      </section>
    </main>
  );
}
