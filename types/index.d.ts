import { BADGE_CRITERIA } from "@/constants";
export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}
export interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

export interface Country {
  name: {
    common: string;
  };
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export const CURRENCY_NOTATIONS: { [key: string]: string } = {
  ALL: "Lek",
  AFN: "؋",
  ARS: "$",
  AWG: "ƒ",
  AUD: "$",
  AZN: "ман",
  BSD: "$",
  BYR: "p.",
  BZD: "BZ$",
  BMD: "$",
  BOB: "$b",
  BAM: "KM",
  BWP: "P",
  BGN: "лв",
  BRL: "R$",
  BND: "$",
  KHR: "៛",
  CAD: "$",
  KYD: "$",
  CLP: "$",
  CNY: "¥",
  COP: "$",
  CRC: "₡",
  HRK: "kn",
  CUP: "₱",
  CZK: "Kč",
  DKK: "kr",
  DOP: "RD$",
  XCD: "$",
  EGP: "£",
  SVC: "$",
  EEK: "kr",
  EUR: "€",
  FKP: "£",
  FJD: "$",
  GHC: "¢",
  GIP: "£",
  GTQ: "Q",
  GGP: "£",
  GYD: "$",
  HNL: "L",
  HKD: "$",
  HUF: "Ft",
  ISK: "kr",
  INR: "₹",
  IDR: "Rp",
  IRR: "﷼",
  IMP: "£",
  ILS: "₪",
  JMD: "J$",
  JPY: "¥",
  JEP: "£",
  KZT: "лв",
  KPW: "₩",
  KRW: "₩",
  KGS: "лв",
  LAK: "₭",
  LVL: "Ls",
  LBP: "£",
  LRD: "$",
  LTL: "Lt",
  MKD: "ден",
  MYR: "RM",
  MUR: "₨",
  MXN: "$",
  MNT: "₮",
  MZN: "MT",
  NAD: "$",
  NPR: "₨",
  ANG: "ƒ",
  NZD: "$",
  NIO: "C$",
  NGN: "₦",
  NOK: "kr",
  OMR: "﷼",
  PKR: "₨",
  PAB: "B/.",
  PYG: "Gs",
  PEN: "S/.",
  PHP: "₱",
  PLN: "zł",
  QAR: "﷼",
  RON: "lei",
  RUB: "руб",
  SHP: "£",
  SAR: "﷼",
  RSD: "Дин.",
  SCR: "₨",
  SGD: "$",
  SBD: "$",
  SOS: "S",
  ZAR: "R",
  LKR: "₨",
  SEK: "kr",
  CHF: "CHF",
  SRD: "$",
  SYP: "£",
  TWD: "NT$",
  THB: "฿",
  TTD: "$",
  TRY: "₤",
  TRL: "₤",
  TVD: "$",
  UAH: "₴",
  GBP: "£",
  USD: "$",
  UYU: "$U",
  UZS: "лв",
  VEF: "Bs",
  VND: "₫",
  YER: "﷼",
  ZWD: "Z$",
};
