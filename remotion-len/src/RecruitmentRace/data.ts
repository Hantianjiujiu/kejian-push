import { Company, QuarterlyDataPoint, KeyEvent, Chapter, FPS } from "./types";

export const companies: Record<string, Company> = {
  ali: {
    name: "阿里巴巴",
    shortName: "阿里",
    color: "#FF6A00",
    glowColor: "#FF8F33",
  },
  tencent: {
    name: "腾讯",
    shortName: "腾讯",
    color: "#00B4D8",
    glowColor: "#48CAE4",
  },
  huawei: {
    name: "华为",
    shortName: "华为",
    color: "#E63946",
    glowColor: "#FF6B6B",
  },
};

export const quarterlyData: QuarterlyDataPoint[] = [
  { year: 2021, quarter: 1, ali: 86000, tencent: 79000, huawei: 46000 },
  { year: 2021, quarter: 2, ali: 88000, tencent: 78000, huawei: 45000 },
  { year: 2021, quarter: 3, ali: 90000, tencent: 76000, huawei: 44000 },
  { year: 2021, quarter: 4, ali: 98000, tencent: 74000, huawei: 42000 },
  { year: 2022, quarter: 1, ali: 106000, tencent: 73000, huawei: 41000 },
  { year: 2022, quarter: 2, ali: 110000, tencent: 72000, huawei: 39500 },
  { year: 2022, quarter: 3, ali: 112000, tencent: 71500, huawei: 38000 },
  { year: 2022, quarter: 4, ali: 85000, tencent: 70500, huawei: 40000 },
  { year: 2023, quarter: 1, ali: 50000, tencent: 69500, huawei: 45000 },
  { year: 2023, quarter: 2, ali: 38000, tencent: 68500, huawei: 50000 },
  { year: 2023, quarter: 3, ali: 35000, tencent: 68000, huawei: 55000 },
  { year: 2023, quarter: 4, ali: 38000, tencent: 64000, huawei: 64000 },
  { year: 2024, quarter: 1, ali: 40000, tencent: 59000, huawei: 72000 },
  { year: 2024, quarter: 2, ali: 41500, tencent: 54500, huawei: 79000 },
  { year: 2024, quarter: 3, ali: 42000, tencent: 52000, huawei: 83000 },
  { year: 2024, quarter: 4, ali: 44000, tencent: 53000, huawei: 85000 },
  { year: 2025, quarter: 1, ali: 46000, tencent: 54000, huawei: 82000 },
  { year: 2025, quarter: 2, ali: 47000, tencent: 54800, huawei: 79500 },
  { year: 2025, quarter: 3, ali: 48000, tencent: 55000, huawei: 78000 },
  { year: 2025, quarter: 4, ali: 48000, tencent: 55000, huawei: 78000 },
];

export const keyEvents: KeyEvent[] = [
  { startFrame: 620, text: "阿里「史上最大规模校招」" },
  { startFrame: 1060, text: "华为「麒麟芯片回归，研发扩招」" },
  { startFrame: 1780, text: "「新一轮 AI 人才争夺战开启」" },
];

const OPENING = 90;
const CH2021 = 360;
const CH2022 = 360;
const CH2023 = 450;
const CH2024 = 450;
const CH2025 = 360;
const TRANS = 15;
const ENDING = 180;

export const chapters: Chapter[] = [
  { year: 2021, startFrame: OPENING, durationInFrames: CH2021 },
  { year: 2022, startFrame: OPENING + CH2021 + TRANS, durationInFrames: CH2022 },
  { year: 2023, startFrame: OPENING + CH2021 + TRANS + CH2022 + TRANS, durationInFrames: CH2023 },
  { year: 2024, startFrame: OPENING + CH2021 + TRANS + CH2022 + TRANS + CH2023 + TRANS, durationInFrames: CH2024 },
  { year: 2025, startFrame: OPENING + CH2021 + TRANS + CH2022 + TRANS + CH2023 + TRANS + CH2024 + TRANS, durationInFrames: CH2025 },
];

export const TOTAL_DURATION =
  OPENING + CH2021 + TRANS + CH2022 + TRANS + CH2023 + TRANS + CH2024 + TRANS + CH2025 + ENDING;

export { OPENING, CH2021, CH2022, CH2023, CH2024, CH2025, TRANS as TRANSITION, ENDING };

const BAR_ANIMATION_START = OPENING;
const BAR_ANIMATION_END = TOTAL_DURATION - ENDING;

export function getInterpolatedValues(absoluteFrame: number): {
  ali: number;
  tencent: number;
  huawei: number;
} {
  const animDuration = BAR_ANIMATION_END - BAR_ANIMATION_START;
  const clampedFrame = Math.max(BAR_ANIMATION_START, Math.min(BAR_ANIMATION_END, absoluteFrame));
  const progress = (clampedFrame - BAR_ANIMATION_START) / animDuration;
  const totalPoints = quarterlyData.length;
  const index = progress * (totalPoints - 1);
  const lo = Math.floor(index);
  const hi = Math.min(lo + 1, totalPoints - 1);
  const frac = index - lo;
  const dLo = quarterlyData[lo];
  const dHi = quarterlyData[hi];
  return {
    ali: Math.round(dLo.ali + (dHi.ali - dLo.ali) * frac),
    tencent: Math.round(dLo.tencent + (dHi.tencent - dLo.tencent) * frac),
    huawei: Math.round(dLo.huawei + (dHi.huawei - dLo.huawei) * frac),
  };
}

export function getLeader(values: { ali: number; tencent: number; huawei: number }): string {
  const max = Math.max(values.ali, values.tencent, values.huawei);
  if (values.ali === max) return "ali";
  if (values.tencent === max) return "tencent";
  return "huawei";
}
