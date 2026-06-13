# 招聘人数竞速动画 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 制作阿里/腾讯/华为 2021-2025 招聘人数柱状图竞速动画

**Architecture:** 数据驱动动画——季度数据点通过 `interpolate` 在帧间平滑过渡，主组件用 `<Sequence>` 编排章节（开场→5年×4章→结尾），每章含转场。BarChart 从 data 模块获取插值数据，渲染三根竞争柱，领先方自动发光增强。

**Tech Stack:** Remotion 4 + React 18 + TypeScript，无外部依赖

---

## 帧分配

```
FPS = 30
OPENING        = 90  帧 (3s)
CHAPTER_2021   = 360 帧 (12s, frame 90-450)
TRANSITION     = 15  帧 (0.5s)
CHAPTER_2022   = 360 帧 (12s, frame 465-825)
TRANSITION     = 15  帧
CHAPTER_2023   = 450 帧 (15s, frame 840-1290)
TRANSITION     = 15  帧
CHAPTER_2024   = 450 帧 (15s, frame 1305-1755)
TRANSITION     = 15  帧
CHAPTER_2025   = 360 帧 (12s, frame 1770-2130)
ENDING         = 180 帧 (6s, frame 2130-2310)
总计           = 2310 帧 (77s)
```

---

### Task 1: 类型定义

**Files:**
- Create: `src/RecruitmentRace/types.ts`

- [ ] **Step 1: 写入类型定义**

```typescript
export interface Company {
  name: string;
  shortName: string;
  color: string;
  glowColor: string;
}

export interface QuarterlyDataPoint {
  year: number;
  quarter: number;
  ali: number;
  tencent: number;
  huawei: number;
}

export interface KeyEvent {
  startFrame: number;
  text: string;
}

export interface Chapter {
  year: number;
  startFrame: number;
  durationInFrames: number;
  event?: string;
}

export const FPS = 30;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit src/RecruitmentRace/types.ts
```

Expected: PASS（无错误）

---

### Task 2: 数据模块

**Files:**
- Create: `src/RecruitmentRace/data.ts`

- [ ] **Step 1: 写入公司配置和季度数据**

```typescript
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

// 20 个季度数据点（2021 Q1 ~ 2025 Q4），年度数据在季度间平滑过渡
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

// 帧分配常量
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

export const TOTAL_DURATION = OPENING + CH2021 + TRANS + CH2022 + TRANS + CH2023 + TRANS + CH2024 + TRANS + CH2025 + ENDING;

export { OPENING, CH2021, CH2022, CH2023, CH2024, CH2025, TRANS as TRANSITION, ENDING };

export const BAR_ANIMATION_START = OPENING;
export const BAR_ANIMATION_END = TOTAL_DURATION - ENDING;

/**
 * 根据绝对帧号，返回三家公司的插值招聘人数
 */
export function getInterpolatedValues(absoluteFrame: number): {
  ali: number;
  tencent: number;
  huawei: number;
} {
  const animStart = BAR_ANIMATION_START;
  const animEnd = BAR_ANIMATION_END;
  const animDuration = animEnd - animStart;
  const clampedFrame = Math.max(animStart, Math.min(animEnd, absoluteFrame));
  const progress = (clampedFrame - animStart) / animDuration; // 0~1
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

/** 返回当前领先的公司 key */
export function getLeader(values: { ali: number; tencent: number; huawei: number }): string {
  const max = Math.max(values.ali, values.tencent, values.huawei);
  if (values.ali === max) return "ali";
  if (values.tencent === max) return "tencent";
  return "huawei";
}
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 3: GridBackground 组件

**Files:**
- Create: `src/RecruitmentRace/GridBackground.tsx`

- [ ] **Step 1: 创建背景网格组件**

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const GRID_LINES = [0, 1, 2, 3, 4, 5]; // 6 条水平参考线

const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 0.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F6F8",
      }}
    >
      {/* 水平参考线 */}
      {GRID_LINES.map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${20 + i * 16}%`,
            height: 1,
            background: `rgba(0,0,0,${opacity})`,
          }}
        />
      ))}
      {/* 底部基线 */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          bottom: "22%",
          height: 2,
          background: "rgba(0,0,0,0.12)",
        }}
      />
    </AbsoluteFill>
  );
};

export default GridBackground;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 4: BarItem 组件

**Files:**
- Create: `src/RecruitmentRace/BarItem.tsx`

- [ ] **Step 1: 创建单柱组件**

```typescript
import React, { useMemo } from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";
import { Company, FPS } from "./types";

interface BarItemProps {
  company: Company;
  value: number;
  maxValue: number;
  maxBarWidth: number;
  rank: number; // 0 = leader
  yOffset: number; // top position in px
}

const BAR_HEIGHT = 64;
const BAR_RADIUS = 10;

const BarItem: React.FC<BarItemProps> = ({
  company,
  value,
  maxValue,
  maxBarWidth,
  rank,
  yOffset,
}) => {
  const frame = useCurrentFrame();

  const targetWidth = maxValue > 0 ? (value / maxValue) * maxBarWidth : 0;

  const animatedWidth = spring({
    frame,
    fps: FPS,
    config: { damping: 14, mass: 0.5 },
    from: 0,
    to: targetWidth,
  });

  // 发光强度：第1名最强，第2名微弱，第3名无
  const glowIntensity = interpolate(rank, [0, 2], [1, 0], {
    extrapolateRight: "clamp",
  });

  const displayNumber = useMemo(() => {
    // 从目标值平滑过渡的数字
    const springNum = spring({
      frame,
      fps: FPS,
      config: { damping: 20, mass: 0.3 },
    });
    return Math.round(value * springNum);
  }, [frame, value]);

  return (
    <div
      style={{
        position: "absolute",
        top: yOffset,
        left: 0,
        right: 0,
        height: BAR_HEIGHT,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* 公司名标签 */}
      <div
        style={{
          width: 160,
          textAlign: "right",
          paddingRight: 24,
          fontSize: 32,
          fontWeight: 600,
          color: company.color,
          fontFamily:
            '"PingFang SC", "Microsoft YaHei", sans-serif',
          flexShrink: 0,
        }}
      >
        {company.shortName}
      </div>

      {/* 柱子 */}
      <div
        style={{
          width: Math.max(animatedWidth, BAR_RADIUS * 2),
          height: BAR_HEIGHT,
          background: `linear-gradient(90deg, ${company.color}, ${company.glowColor})`,
          borderRadius: `0 ${BAR_RADIUS}px ${BAR_RADIUS}px 0`,
          boxShadow: glowIntensity > 0.01
            ? `0 0 ${24 * glowIntensity}px ${company.glowColor}, inset 0 2px 4px rgba(255,255,255,0.3)`
            : "inset 0 2px 4px rgba(255,255,255,0.25)",
          position: "relative",
          transition: "box-shadow 0.3s ease",
          flexShrink: 0,
        }}
      >
        {/* 顶部光泽 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "rgba(255,255,255,0.2)",
            borderRadius: `0 ${BAR_RADIUS}px 0 0`,
          }}
        />
      </div>

      {/* 数值 */}
      <div
        style={{
          marginLeft: 16,
          fontSize: 34,
          fontWeight: 700,
          color: "#1a1a2e",
          fontVariantNumeric: "tabular-nums",
          fontFamily:
            '"PingFang SC", "Microsoft YaHei", sans-serif',
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {displayNumber.toLocaleString()}
        <span style={{ fontSize: 20, fontWeight: 400, color: "#666", marginLeft: 4 }}>
          人
        </span>
      </div>
    </div>
  );
};

export default BarItem;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 5: BarChart 组件

**Files:**
- Create: `src/RecruitmentRace/BarChart.tsx`

- [ ] **Step 1: 创建三柱竞速组件（纯渲染，数据由父组件通过 props 传入）**

```typescript
import React from "react";
import BarItem from "./BarItem";
import { Company } from "./types";
import { companies } from "./data";

export interface BarChartData {
  ali: number;
  tencent: number;
  huawei: number;
}

interface BarChartProps {
  values: BarChartData;
  ranking: { key: string; rank: number }[];
}

const CHART_LEFT_PADDING = 120;
const CHART_RIGHT_PADDING = 200;
const BAR_SPACING = 120;

const BarChart: React.FC<BarChartProps> = ({ values, ranking }) => {
  const maxValue = Math.max(values.ali, values.tencent, values.huawei);
  const maxBarWidth = 1920 - CHART_LEFT_PADDING - CHART_RIGHT_PADDING;

  const ranked: Record<string, number> = {};
  ranking.forEach((r) => {
    ranked[r.key] = r.rank;
  });

  return (
    <div
      style={{
        position: "absolute",
        left: CHART_LEFT_PADDING,
        right: CHART_RIGHT_PADDING,
        top: "38%",
      }}
    >
      {ranking.map(({ key }) => {
        const company: Company = companies[key];
        const rank = ranked[key];
        return (
          <BarItem
            key={key}
            company={company}
            value={values[key as keyof BarChartData]}
            maxValue={maxValue * 1.12}
            maxBarWidth={maxBarWidth}
            rank={rank}
            yOffset={rank * BAR_SPACING}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: -48,
          right: 0,
          fontSize: 18,
          color: "#999",
          fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
        }}
      >
        *数据基于公开财报估算
      </div>
    </div>
  );
};

export default BarChart;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 6: Header 组件

**Files:**
- Create: `src/RecruitmentRace/Header.tsx`

- [ ] **Step 1: 创建顶部信息栏（数据由父组件通过 props 传入）**

```typescript
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Chapter } from "./types";

interface HeaderProps {
  currentChapter: Chapter;
  eventText: string | null;
  eventStartFrame: number; // 绝对帧，用于计算事件动画相对帧
}

const Header: React.FC<HeaderProps> = ({
  currentChapter,
  eventText,
  eventStartFrame,
}) => {
  const frame = useCurrentFrame(); // 此组件在 Sequence 内，frame 是相对帧

  // 事件：只在当前章节内有事件时计算动画
  // eventStartFrame 是绝对帧，需要减去章节 startFrame 得到相对帧
  const eventRelativeStart = eventStartFrame - currentChapter.startFrame;
  const hasEvent = eventText && eventRelativeStart >= 0;

  const eventOpacity =
    hasEvent
      ? interpolate(
          frame,
          [eventRelativeStart, eventRelativeStart + 15, eventRelativeStart + 165, eventRelativeStart + 180],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 0;

  const eventTranslateX =
    hasEvent
      ? interpolate(
          frame,
          [eventRelativeStart, eventRelativeStart + 15],
          [40, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: "-0.02em",
          }}
        >
          {currentChapter.year}
        </span>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#666" }}>
          年度招聘
        </span>
      </div>

      {hasEvent && (
        <div
          style={{
            opacity: eventOpacity,
            transform: `translateX(${eventTranslateX}px)`,
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: 8,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          {eventText}
        </div>
      )}
    </div>
  );
};

export default Header;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 7: Opening 开场组件

**Files:**
- Create: `src/RecruitmentRace/Opening.tsx`

- [ ] **Step 1: 创建开场组件**

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { companies } from "./data";
import { OPENING as DURATION, FPS } from "./types";

const Opening: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题淡入
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 30], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo 依次闪现
  const logoNames = ["ali", "tencent", "huawei"] as const;
  const logoFlashes = logoNames.map((_, i) => {
    const start = 40 + i * 15;
    const opacity = interpolate(
      frame,
      [start, start + 5, start + 15],
      [0, 1, 0.6],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return opacity;
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F6F8",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 72,
          fontWeight: 700,
          color: "#1a1a2e",
          letterSpacing: "0.06em",
          marginBottom: 48,
        }}
      >
        科技巨头人才争夺战
      </div>

      {/* 三色闪光 */}
      <div style={{ display: "flex", gap: 60, fontSize: 28, fontWeight: 500 }}>
        {logoNames.map((key, i) => (
          <div
            key={key}
            style={{
              opacity: logoFlashes[i],
              color: companies[key].color,
              padding: "12px 32px",
              border: `2px solid ${companies[key].color}`,
              borderRadius: 8,
            }}
          >
            {companies[key].name}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default Opening;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 8: ChapterTransition 转场组件

**Files:**
- Create: `src/RecruitmentRace/ChapterTransition.tsx`

- [ ] **Step 1: 创建年份转场**

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface ChapterTransitionProps {
  year: number;
}

const ChapterTransition: React.FC<ChapterTransitionProps> = ({ year }) => {
  const frame = useCurrentFrame();
  const duration = 15; // 0.5s

  const scale = interpolate(
    frame,
    [0, duration * 0.4, duration * 0.6, duration],
    [1, 1.4, 1.4, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    frame,
    [0, duration * 0.2, duration * 0.8, duration],
    [0, 0.9, 0.9, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 光晕扩散
  const glowSpread = interpolate(frame, [0, duration], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F6F8",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 光晕环 */}
      <div
        style={{
          position: "absolute",
          width: glowSpread * 2,
          height: glowSpread * 2,
          borderRadius: "50%",
          border: "2px solid rgba(0,180,216,0.3)",
          opacity,
        }}
      />
      {/* 年份数字 */}
      <div
        style={{
          fontSize: 160,
          fontWeight: 800,
          color: "#1a1a2e",
          fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
          transform: `scale(${scale})`,
          opacity,
          letterSpacing: "0.02em",
        }}
      >
        {year}
      </div>
    </AbsoluteFill>
  );
};

export default ChapterTransition;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 9: Ending 结尾组件

**Files:**
- Create: `src/RecruitmentRace/Ending.tsx`

- [ ] **Step 1: 创建结尾定格组件（冻结数据由父组件传入）**

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import BarChart, { BarChartData } from "./BarChart";
import { ENDING as DURATION } from "./types";

interface EndingProps {
  finalValues: BarChartData;
  finalRanking: { key: string; rank: number }[];
}

const Ending: React.FC<EndingProps> = ({ finalValues, finalRanking }) => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textTranslateY = interpolate(frame, [60, 100], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dimOverlay = interpolate(frame, [DURATION - 60, DURATION], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F6F8",
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      <BarChart values={finalValues} ranking={finalRanking} />

      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: "0.06em",
          }}
        >
          人才是一切竞争力的源头
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#999",
            marginTop: 16,
          }}
        >
          数据来源：各公司财报及公开报道 · 估算值仅供参考
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0,0,0,${dimOverlay})`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

export default Ending;
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 10: 主组件 index.tsx

**Files:**
- Create: `src/RecruitmentRace/index.tsx`

- [ ] **Step 1: 创建主编排组件（在根级别计算数据，通过 props 下发）**

关键设计：`useCurrentFrame()` 在根级别返回绝对帧号，用来计算插值数据和排名。子组件（BarChart、Header）通过 props 接收数据，不自己计算帧相关逻辑。

```typescript
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import GridBackground from "./GridBackground";
import BarChart from "./BarChart";
import type { BarChartData } from "./BarChart";
import Header from "./Header";
import Opening from "./Opening";
import ChapterTransition from "./ChapterTransition";
import Ending from "./Ending";
import {
  chapters,
  keyEvents,
  TRANSITION,
  getInterpolatedValues,
  getLeader,
} from "./data";

// 章节结束帧数组（即转场起始帧）
function computeTransitionFrames(): number[] {
  return chapters.map((ch) => ch.startFrame + ch.durationInFrames);
}

const RecruitmentRace: React.FC = () => {
  const absoluteFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 当前插值数据
  const values: BarChartData = useMemo(
    () => getInterpolatedValues(absoluteFrame),
    [absoluteFrame]
  );

  // 排名：按值从大到小 [{key, rank:0}, {key, rank:1}, {key, rank:2}]
  const ranking = useMemo(() => {
    const entries = [
      { key: "ali", value: values.ali },
      { key: "tencent", value: values.tencent },
      { key: "huawei", value: values.huawei },
    ];
    entries.sort((a, b) => b.value - a.value);
    return entries.map((e, i) => ({ key: e.key, rank: i }));
  }, [values]);

  // 当前章节
  const currentChapter = useMemo(() => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (absoluteFrame >= chapters[i].startFrame) {
        return chapters[i];
      }
    }
    return chapters[0];
  }, [absoluteFrame]);

  // 当前活跃事件
  const activeEvent = useMemo(() => {
    return keyEvents.find(
      (e) =>
        absoluteFrame >= e.startFrame &&
        absoluteFrame < e.startFrame + 180
    ) || null;
  }, [absoluteFrame]);

  // 定格用的终态数据（用最后一季度数据）
  const finalValues = useMemo(() => {
    return getInterpolatedValues(99999); // 超过动画范围，返回终态
  }, []);
  const finalRanking = useMemo(() => {
    const v = finalValues;
    const entries = [
      { key: "ali", value: v.ali },
      { key: "tencent", value: v.tencent },
      { key: "huawei", value: v.huawei },
    ];
    entries.sort((a, b) => b.value - a.value);
    return entries.map((e, i) => ({ key: e.key, rank: i }));
  }, [finalValues]);

  const transitionFrames = useMemo(() => computeTransitionFrames(), []);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F6F8",
        fontFamily:
          '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      }}
    >
      <GridBackground />

      <Sequence from={0} durationInFrames={90}>
        <Opening />
      </Sequence>

      {chapters.map((ch) => (
        <Sequence
          key={`ch-${ch.year}`}
          from={ch.startFrame}
          durationInFrames={ch.durationInFrames}
        >
          <Header
            currentChapter={ch}
            eventText={activeEvent?.text ?? null}
            eventStartFrame={activeEvent?.startFrame ?? 0}
          />
          <BarChart values={values} ranking={ranking} />
        </Sequence>
      ))}

      {chapters.slice(1).map((ch, i) => (
        <Sequence
          key={`trans-${ch.year}`}
          from={transitionFrames[i]}
          durationInFrames={TRANSITION}
        >
          <ChapterTransition year={ch.year} />
        </Sequence>
      ))}

      <Sequence
        from={transitionFrames[transitionFrames.length - 1]}
        durationInFrames={180}
      >
        <Ending finalValues={finalValues} finalRanking={finalRanking} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default RecruitmentRace;
export type { BarChartData };
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 11: 注册 Composition

**Files:**
- Modify: `src/Root.tsx`

- [ ] **Step 1: 在 Root.tsx 中注册新 Composition**

在 `src/Root.tsx` 顶部添加导入：

```typescript
import RecruitmentRace from "./RecruitmentRace";
import { TOTAL_DURATION } from "./RecruitmentRace/data";
import { FPS } from "./RecruitmentRace/types";
```

在 `<Composition>` 列表中添加：

```tsx
<Composition
  id="RecruitmentRace"
  component={RecruitmentRace}
  durationInFrames={TOTAL_DURATION}
  fps={FPS}
  width={2560}
  height={1440}
/>
<Composition
  id="RecruitmentRacePreview"
  component={RecruitmentRace}
  durationInFrames={TOTAL_DURATION}
  fps={FPS}
  width={1280}
  height={720}
/>
```

- [ ] **Step 2: 类型检查**

```bash
npx tsc --noEmit
```

Expected: PASS

---

### Task 12: 启动预览验证

- [ ] **Step 1: 启动 Remotion Studio**

```bash
npm start
```

Expected: Remotion Studio 启动，可在浏览器中看到 `RecruitmentRace` 和 `RecruitmentRacePreview` 两个 Composition。

- [ ] **Step 2: 视觉验证清单**

在 Studio 中播放 RecruitmentRacePreview（720p，渲染更快）：

1. [ ] 开场 0-3s：标题"科技巨头人才争夺战"淡入，三色 Logo 依次闪现
2. [ ] 2021 章节：阿里橙色柱领先，柱子平滑增长
3. [ ] 2022 章节切换转场：年份数字"2022"放大 + 光环
4. [ ] 2022 章节内："阿里史上最大规模校招"事件弹出
5. [ ] 2023 章节：阿里柱收缩、华为柱反超（红色上升）
6. [ ] 2023 章节内："麒麟芯片回归"事件弹出
7. [ ] 2024 章节：华为持续领先，三柱拉锯
8. [ ] 2025 章节：三柱趋于均衡，"AI 人才争夺"事件弹出
9. [ ] 结尾：柱子定格，"人才是一切竞争力的源头"淡入
10. [ ] 柱子始终从左侧公司名对齐，数字在右侧跟随
11. [ ] 领先方发光效果明显，交替时平滑切换

---

### Task 13: 调优迭代

根据预览结果微调以下参数（在各自源文件中修改）：

- **弹性手感**：`BarItem.tsx` 中 `spring` 的 `damping`（当前14）和 `mass`（当前0.5）调整柱子伸缩的弹性幅度
- **事件时机**：`data.ts` 中 `keyEvents` 的 `startFrame` 微调事件弹出时间
- **转场节奏**：`data.ts` 中 `TRANSITION` 常量（当前15帧）调整转场速度
- **颜色对比**：`data.ts` 中 `companies` 各公司的 `color` 和 `glowColor` 微调视觉对比度
