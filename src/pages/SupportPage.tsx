import {
  AlertTriangle,
  CheckCircle2,
  Headphones,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import { supportFaq, warrantyRules } from "../data/siteData";
import { usePageMeta } from "../hooks/usePageMeta";

export default function SupportPage() {
  usePageMeta(
    "质保与售后｜Claude 订阅服务",
    "Claude 订阅服务的掉订阅质保条件、不质保情况、售后流程与常见问题。",
  );

  const faqItems = supportFaq.map((item, index) => ({
    id: `support-faq-${index}`,
    title: item.question,
    body: <p className="text-sm leading-7 text-ink-soft">{item.answer}</p>,
  }));

  return (
    <main>
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-[8px] border border-line bg-white px-3 py-2 text-sm font-semibold text-ink-soft shadow-crisp">
              <Headphones className="h-4 w-4 text-trust" aria-hidden="true" />
              <span>一次质保 · 条件明确</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              质保与售后
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">
              掉订阅质保只在符合条件时提供一次处理。这里把可质保、不质保和售后流程放在同一页，方便购买前确认。
            </p>
          </div>
          <div className="rounded-[8px] border border-line bg-ink p-5 text-white shadow-lift">
            <ShieldCheck className="h-8 w-8 text-white/72" aria-hidden="true" />
            <p className="mt-5 font-display text-2xl font-semibold">核心原则</p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              有质保不等于永久稳定；质保处理以截图、账号状态和使用情况为依据。违规使用、共享账号、网络频繁变动等情况不纳入质保。
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {warrantyRules.map((rule, index) => (
            <article key={rule.title} className="rounded-[8px] border border-line bg-white p-5 shadow-crisp">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-mist text-trust">
                  {index === 1 ? (
                    <AlertTriangle className="h-5 w-5 text-amber" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <span className="price-text text-sm font-bold text-ink-soft">
                  0{index + 1}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">{rule.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{rule.description}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-ink-soft">
                {rule.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-rule bg-mist/70 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-trust">support</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">售后沟通建议</h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              联系售后时请一次性提供套餐、购买时间、账号状态和 billing 截图，减少来回确认。
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-bold text-white transition hover:bg-trust-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>返回套餐页咨询</span>
            </Link>
          </div>
          <Accordion items={faqItems} defaultOpenId="support-faq-0" />
        </div>
      </section>
    </main>
  );
}
