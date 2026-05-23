import { AnimatePresence, motion } from "framer-motion";
import {
  Clipboard,
  Copy,
  ExternalLink,
  MessageCircle,
  Send,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  buildConsultMessage,
  contactConfig,
  deliveryLabels,
  getPlanPrice,
  warrantyLabels,
} from "../data/siteData";
import type { DeliveryOption, Plan, WarrantyOption } from "../types";

interface ConsultDrawerProps {
  open: boolean;
  plan: Plan;
  warranty: WarrantyOption;
  delivery: DeliveryOption;
  onClose: () => void;
}

export default function ConsultDrawer({
  open,
  plan,
  warranty,
  delivery,
  onClose,
}: ConsultDrawerProps) {
  const [copied, setCopied] = useState<"message" | "wechat" | null>(null);
  const message = useMemo(
    () => buildConsultMessage(plan, warranty, delivery),
    [delivery, plan, warranty],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  const copyText = async (text: string, type: "message" | "wechat") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="关闭咨询抽屉"
            className="absolute inset-0 bg-ink/44 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="consult-title"
            className="absolute bottom-0 right-0 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[8px] bg-paper shadow-lift sm:top-0 sm:h-full sm:max-h-none sm:max-w-[480px] sm:rounded-l-[8px] sm:rounded-t-none"
            initial={{ x: "100%", y: 32, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: "100%", y: 32, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-trust">
                  Consulting order
                </p>
                <h2 id="consult-title" className="mt-1 font-display text-2xl font-semibold">
                  确认咨询信息
                </h2>
              </div>
              <button
                type="button"
                aria-label="关闭"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-line bg-white text-ink-soft transition hover:text-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="rounded-[8px] border border-line bg-white p-4 shadow-crisp">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink-soft">当前套餐</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold">
                      {plan.name}
                    </h3>
                  </div>
                  <span className="price-text font-display text-3xl font-semibold text-trust">
                    ¥{getPlanPrice(plan, warranty)}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="border-t border-line pt-3">
                    <dt className="text-ink-soft">质保</dt>
                    <dd className="mt-1 font-semibold">{warrantyLabels[warranty]}</dd>
                  </div>
                  <div className="border-t border-line pt-3">
                    <dt className="text-ink-soft">交付方式</dt>
                    <dd className="mt-1 font-semibold">{deliveryLabels[delivery]}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 rounded-[8px] border border-amber/30 bg-amber/8 p-4 text-sm leading-6 text-ink-soft">
                <div className="mb-2 flex items-center gap-2 font-semibold text-amber">
                  <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                  <span>风险与售后边界</span>
                </div>
                <p>
                  本站为非官方服务。订阅稳定性会受账号、网络环境和使用方式影响，不承诺
                  100% 不掉订阅、不封号；掉订阅质保仅按说明提供一次处理。
                </p>
              </div>

              <div className="mt-5">
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <Clipboard className="h-4 w-4 text-trust" aria-hidden="true" />
                  <span>咨询话术</span>
                </div>
                <pre className="max-h-52 overflow-auto whitespace-pre-wrap rounded-[8px] border border-line bg-white p-4 text-sm leading-6 text-ink-soft shadow-crisp">
                  {message}
                </pre>
                <button
                  type="button"
                  onClick={() => copyText(message, "message")}
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-ink px-4 text-sm font-bold text-white transition hover:bg-trust-dark"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>{copied === "message" ? "已复制话术" : "复制咨询话术"}</span>
                </button>
              </div>

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={() => copyText(contactConfig.wechatId, "wechat")}
                  className="flex h-12 items-center justify-between gap-3 rounded-[8px] border border-line bg-white px-4 text-left font-semibold shadow-crisp transition hover:border-trust/40"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green" aria-hidden="true" />
                    <span className="truncate">
                      {copied === "wechat" ? "微信号已复制" : "复制微信号"}
                    </span>
                  </span>
                  <span className="truncate text-sm text-ink-soft">
                    {contactConfig.wechatId}
                  </span>
                </button>
                <a
                  href={contactConfig.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-between gap-3 rounded-[8px] border border-line bg-white px-4 font-semibold shadow-crisp transition hover:border-trust/40"
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-trust" aria-hidden="true" />
                    <span>Telegram 咨询</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-ink-soft" aria-hidden="true" />
                </a>
                <a
                  href={contactConfig.formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-between gap-3 rounded-[8px] border border-line bg-white px-4 font-semibold shadow-crisp transition hover:border-trust/40"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green" aria-hidden="true" />
                    <span>提交咨询表单</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-ink-soft" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
