import {
  BadgeCheck,
  Clock3,
  FileWarning,
  Globe2,
  Laptop,
  Network,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import type {
  ContactConfig,
  DeliveryOption,
  NoticeSection,
  Plan,
  WarrantyRule,
  WarrantyOption,
} from "../types";

export const plans: Plan[] = [
  {
    id: "pro",
    name: "Claude Pro",
    tier: "Pro",
    shortName: "Pro",
    basePrice: 158,
    warrantyPrice: 168,
    deliveryOptions: ["ready_account", "recharge"],
    summary: "适合个人高频写作、代码、资料整理与日常生产力使用。",
    highlights: ["成品号或代充可选", "入门价格轻量", "适合先体验订阅权益"],
    suitableFor: "个人用户、轻量项目、日常办公",
  },
  {
    id: "max5",
    name: "Claude Max 5x",
    tier: "Max",
    shortName: "Max 5x",
    basePrice: 666,
    warrantyPrice: 866,
    deliveryOptions: ["recharge"],
    summary: "适合需要更高额度的稳定工作流，覆盖更长上下文与更密集任务。",
    highlights: ["5x 使用额度", "适合连续任务", "更适合工作流稳定使用"],
    suitableFor: "开发者、内容团队、重度办公",
  },
  {
    id: "max20",
    name: "Claude Max 20x",
    tier: "Max",
    shortName: "Max 20x",
    basePrice: 966,
    warrantyPrice: 1366,
    deliveryOptions: ["recharge"],
    summary: "适合更密集的 AI 工作流，优先给重度任务与团队式使用准备。",
    highlights: ["20x 使用额度", "高强度任务空间", "适合长期生产力场景"],
    suitableFor: "重度用户、小团队、连续交付项目",
  },
];

export const warrantyLabels: Record<WarrantyOption, string> = {
  none: "无质保",
  subscription: "掉订阅质保",
};

export const deliveryLabels: Record<DeliveryOption, string> = {
  ready_account: "成品号",
  recharge: "代充",
};

export const contactConfig: ContactConfig = {
  wechatId: "your_wechat_id",
  telegramUrl: "https://t.me/your_service",
  formUrl: "https://example.com/order",
};

export const noticeSections: NoticeSection[] = [
  {
    id: "account",
    icon: UserRoundCheck,
    title: "账号状态",
    summary: "优先使用稳定、长期登录过的账号，避免新号、来路不明账号和频繁更换登录环境。",
    items: [
      "自己注册的新账号建议先正常使用 7-14 天，再考虑订阅服务。",
      "不建议使用批量购买的新号，这类账号通常注册痕迹不自然，风险更高。",
      "如果账号已经多人登录、频繁换设备或有异常记录，订阅稳定性会下降。",
    ],
  },
  {
    id: "network",
    icon: Network,
    title: "网络环境",
    summary: "订阅后尽量保持固定、干净、低共享的网络环境，稳定比延迟更重要。",
    items: [
      "尽量选择长期固定的住宅网络或质量较高的节点，不频繁切换地区。",
      "可用 IP 检测工具查看类型、风险值和共享人数，风险值越低越好。",
      "避免让别人代登录后自己再换网络使用，连续的环境变化容易触发异常。",
    ],
  },
  {
    id: "usage",
    icon: Clock3,
    title: "使用节奏",
    summary: "建议模拟正常用户节奏，逐步提高任务量，不做异常高频、共享或自动化调用。",
    items: [
      "刚开始不要一次性跑满额度，可从少量任务开始，再逐步增加。",
      "禁止多人共享同一账号，也不要在多个 IP、多个设备间频繁跳转。",
      "不要把网页订阅用于反代 API、本地批量调用或其他明显异常用途。",
    ],
  },
  {
    id: "risk",
    icon: ShieldAlert,
    title: "风险边界",
    summary: "平台风控没有固定规律，任何服务都无法承诺 100% 不掉订阅、不封号。",
    items: [
      "服务会尽量降低常见风险，但不能保证完全规避平台风控。",
      "因违规使用、共享账号、网络环境不稳定导致的问题，不属于质保范围。",
      "购买前请先阅读质保说明，确认自己能接受售后边界。",
    ],
  },
];

export const warrantyRules: WarrantyRule[] = [
  {
    title: "可质保情况",
    description: "购买了掉订阅质保，并能提供 billing 页面显示因账号问题掉订阅的截图。",
    items: [
      "仅针对掉订阅情况处理，不等同于账号永久稳定承诺。",
      "每个产品周期仅提供一次质保处理。",
      "需要在售后窗口内主动联系并提交必要截图。",
    ],
  },
  {
    title: "不质保情况",
    description: "因用户自身使用方式或网络环境造成的异常，不纳入质保。",
    items: [
      "多人共享、异常高频、反代 API、本地批量调用等违规使用。",
      "账号在多个 IP、多个设备间频繁切换，或让第三方反复登录。",
      "账号本身异常、来路不明、长期 0 元购或历史风控记录较多。",
    ],
  },
  {
    title: "处理流程",
    description: "售后以截图和账号状态为依据，先核验，再给出处理方案。",
    items: [
      "提交套餐、购买时间、账号状态和 billing 截图。",
      "客服确认是否符合掉订阅质保条件。",
      "符合条件后，按当前库存和服务规则安排一次处理。",
    ],
  },
];

export const homeTrustItems = [
  {
    icon: ShieldCheck,
    label: "风险透明",
    text: "页面先讲清使用边界和质保条件。",
  },
  {
    icon: BadgeCheck,
    label: "价格明确",
    text: "三档套餐、两种质保价格直接展示。",
  },
  {
    icon: Globe2,
    label: "咨询下单",
    text: "不绕购物车，确认套餐后直接沟通。",
  },
  {
    icon: Laptop,
    label: "稳定优先",
    text: "强调账号、网络与使用节奏管理。",
  },
];

export const supportFaq = [
  {
    question: "无质保和掉订阅质保怎么选？",
    answer:
      "无质保价格更低，适合能接受订阅风险的用户。掉订阅质保价格更高，仅在符合条件时提供一次处理，更适合想要明确售后边界的用户。",
  },
  {
    question: "质保是不是代表一定不会封号？",
    answer:
      "不是。质保只约定符合条件时的售后处理，不代表可以完全规避平台风控，也不承诺账号永久稳定。",
  },
  {
    question: "购买后可以多人一起用吗？",
    answer:
      "不建议，也不纳入质保。多人共享、设备和 IP 频繁变化都会增加异常概率。",
  },
  {
    question: "我应该先准备什么？",
    answer:
      "建议准备一个长期使用的账号、稳定网络环境，并先确认自己能接受购买须知和质保说明。",
  },
];

export const guideFaq = [
  {
    question: "为什么强调不要频繁换 IP？",
    answer:
      "账号长期在稳定环境下使用更接近正常用户行为。频繁切换地区、设备或网络，会明显增加异常概率。",
  },
  {
    question: "新账号可以直接订阅吗？",
    answer:
      "不推荐。新账号最好先正常使用一段时间，形成自然登录与使用记录后再订阅。",
  },
  {
    question: "使用额度应该怎么安排？",
    answer:
      "建议循序渐进，不要第一天就高强度连续使用。稳定使用节奏比短期跑满额度更重要。",
  },
];

export function getPlanPrice(plan: Plan, warranty: WarrantyOption) {
  return warranty === "subscription" ? plan.warrantyPrice : plan.basePrice;
}

export function buildConsultMessage(
  plan: Plan,
  warranty: WarrantyOption,
  delivery: DeliveryOption,
) {
  return [
    "你好，我想咨询 Claude 订阅服务。",
    `套餐：${plan.name}`,
    `质保：${warrantyLabels[warranty]}`,
    `交付方式：${deliveryLabels[delivery]}`,
    `价格：${getPlanPrice(plan, warranty)} 元`,
    "我已阅读购买须知和质保说明。",
  ].join("\n");
}
