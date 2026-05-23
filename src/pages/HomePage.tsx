import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  PackageCheck,
  ShieldAlert,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ConsultDrawer from "../components/ConsultDrawer";
import MobileConsultBar from "../components/MobileConsultBar";
import PlanCard from "../components/PlanCard";
import SegmentedControl from "../components/SegmentedControl";
import {
  deliveryLabels,
  getPlanPrice,
  homeTrustItems,
  plans,
  warrantyLabels,
} from "../data/siteData";
import { usePageMeta } from "../hooks/usePageMeta";
import type { DeliveryOption, Plan, PlanId, WarrantyOption } from "../types";

const warrantyOptions = [
  { value: "none", label: "无质保", icon: WalletCards },
  { value: "subscription", label: "掉订阅质保", icon: ShieldCheck },
] satisfies Array<{ value: WarrantyOption; label: string; icon: typeof WalletCards }>;

function getPlan(planId: PlanId) {
  return plans.find((plan) => plan.id === planId) ?? plans[0];
}

function ServiceSnapshot({
  plan,
  warranty,
  delivery,
}: {
  plan: Plan;
  warranty: WarrantyOption;
  delivery: DeliveryOption;
}) {
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-line bg-ink p-5 text-white shadow-lift">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              service desk
            </p>
            <p className="mt-1 font-display text-2xl font-semibold">订阅确认单</p>
          </div>
          <span className="rounded-[8px] border border-white/15 px-3 py-1 text-xs font-bold text-white/70">
            非官方
          </span>
        </div>

        <div className="py-5">
          <p className="text-sm text-white/62">当前选择</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold">{plan.shortName}</h2>
            <p className="price-text font-display text-4xl font-semibold">
              ¥{getPlanPrice(plan, warranty)}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 border-t border-white/15 pt-4 text-sm">
          <div>
            <dt className="text-white/55">质保</dt>
            <dd className="mt-1 font-semibold">{warrantyLabels[warranty]}</dd>
          </div>
          <div>
            <dt className="text-white/55">方式</dt>
            <dd className="mt-1 font-semibold">{deliveryLabels[delivery]}</dd>
          </div>
          <div>
            <dt className="text-white/55">售后边界</dt>
            <dd className="mt-1 font-semibold">购买前明示</dd>
          </div>
          <div>
            <dt className="text-white/55">成交路径</dt>
            <dd className="mt-1 font-semibold">咨询确认</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function HomePage() {
  usePageMeta(
    "Claude 订阅服务｜套餐咨询",
    "Claude Pro、Claude Max 5x、Claude Max 20x 套餐价格与咨询下单入口，清晰展示质保与购买风险。",
  );

  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("pro");
  const [warranty, setWarranty] = useState<WarrantyOption>("none");
  const [delivery, setDelivery] = useState<DeliveryOption>("recharge");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedPlan = useMemo(() => getPlan(selectedPlanId), [selectedPlanId]);

  useEffect(() => {
    if (!selectedPlan.deliveryOptions.includes(delivery)) {
      setDelivery(selectedPlan.deliveryOptions[0]);
    }
  }, [delivery, selectedPlan]);

  const deliveryOptions = selectedPlan.deliveryOptions.map((option) => ({
    value: option,
    label: deliveryLabels[option],
    icon: option === "ready_account" ? PackageCheck : ClipboardCheck,
  }));

  const openConsult = (planId = selectedPlanId) => {
    const nextPlan = getPlan(planId);
    setSelectedPlanId(planId);
    if (!nextPlan.deliveryOptions.includes(delivery)) {
      setDelivery(nextPlan.deliveryOptions[0]);
    }
    setDrawerOpen(true);
  };

  return (
    <main className="pb-28 lg:pb-0">
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="inline-flex items-center gap-2 rounded-[8px] border border-line bg-white px-3 py-2 text-sm font-semibold text-ink-soft shadow-crisp">
              <ShieldAlert className="h-4 w-4 text-amber" aria-hidden="true" />
              <span>非官方服务 · 风险和质保先说明</span>
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Claude Pro / Max 订阅服务
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
              三档套餐直接对比，质保边界清楚写明。你选好套餐和交付方式后，复制咨询话术即可联系确认。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openConsult()}
                className="flex h-12 items-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-bold text-white shadow-crisp transition hover:bg-trust-dark"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>咨询当前套餐</span>
              </button>
              <Link
                to="/guide"
                className="flex h-12 items-center gap-2 rounded-[8px] border border-line bg-white px-5 text-sm font-bold text-ink shadow-crisp transition hover:border-trust/40"
              >
                <span>查看购买须知</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
          >
            <ServiceSnapshot plan={selectedPlan} warranty={warranty} delivery={delivery} />
          </motion.div>
        </div>
      </section>

      <section className="section-rule bg-paper/80 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {homeTrustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex gap-3 rounded-[8px] border border-line bg-white p-4 shadow-crisp"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-mist text-trust">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-trust">
                packages
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold">选择套餐</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-ink-soft">
              价格随质保选项实时变化。Max 套餐默认代充，Pro 可按需求选择成品号或代充。
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4 md:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={selectedPlan.id === plan.id}
                  warranty={warranty}
                  onSelect={() => setSelectedPlanId(plan.id)}
                  onConsult={() => openConsult(plan.id)}
                />
              ))}
            </div>

            <aside className="rounded-[8px] border border-line bg-white p-5 shadow-crisp lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink-soft">下单确认</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">
                    {selectedPlan.name}
                  </h3>
                </div>
                <span className="price-text font-display text-3xl font-semibold text-trust">
                  ¥{getPlanPrice(selectedPlan, warranty)}
                </span>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-ink">质保选项</label>
                <SegmentedControl
                  ariaLabel="选择质保选项"
                  value={warranty}
                  options={warrantyOptions}
                  onChange={setWarranty}
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-ink">交付方式</label>
                <SegmentedControl
                  ariaLabel="选择交付方式"
                  value={delivery}
                  options={deliveryOptions}
                  onChange={setDelivery}
                />
              </div>

              <div className="mt-5 border-t border-line pt-5">
                <p className="text-sm font-semibold text-ink">适合人群</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {selectedPlan.suitableFor}
                </p>
              </div>

              <button
                type="button"
                onClick={() => openConsult()}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-ink px-4 text-sm font-bold text-white transition hover:bg-trust-dark"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>打开咨询抽屉</span>
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-rule bg-mist/70 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-trust">
              before purchase
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">购买前先确认三件事</h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              这类服务的体验不只取决于套餐本身，也取决于账号、网络和使用方式。页面把风险提前讲清楚，是为了减少后续误会。
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["账号", "优先长期使用过的账号，少用来路不明的新号。"],
              ["网络", "固定、干净、低共享，稳定优先于延迟。"],
              ["节奏", "循序渐进使用，不共享、不反代、不异常高频。"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[8px] border border-line bg-white p-5 shadow-crisp">
                <CheckCircle2 className="h-5 w-5 text-green" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultDrawer
        open={drawerOpen}
        plan={selectedPlan}
        warranty={warranty}
        delivery={delivery}
        onClose={() => setDrawerOpen(false)}
      />
      <MobileConsultBar
        plan={selectedPlan}
        warranty={warranty}
        onConsult={() => openConsult()}
      />
    </main>
  );
}
