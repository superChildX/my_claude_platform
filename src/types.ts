import type { LucideIcon } from "lucide-react";

export type PlanId = "pro" | "max5" | "max20";
export type WarrantyOption = "none" | "subscription";
export type DeliveryOption = "ready_account" | "recharge";

export interface Plan {
  id: PlanId;
  name: string;
  tier: string;
  shortName: string;
  basePrice: number;
  warrantyPrice: number;
  deliveryOptions: DeliveryOption[];
  summary: string;
  highlights: string[];
  suitableFor: string;
}

export interface NoticeSection {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  items: string[];
}

export interface WarrantyRule {
  title: string;
  description: string;
  items: string[];
}

export interface ContactConfig {
  wechatId: string;
  telegramUrl: string;
  formUrl: string;
}
