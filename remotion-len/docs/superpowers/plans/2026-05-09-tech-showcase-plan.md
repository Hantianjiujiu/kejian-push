# TechShowcase Implementation Plan

> **For agentic workers:** Execute tasks sequentially. Each task produces a complete file. After all tasks, verify with `npm start` to open Remotion Studio and visually inspect the new composition.

**Goal:** New `TechShowcase` Composition in Remotion displaying 1.txt content as matrix/neon-style animated subtitles

**Architecture:** 4 new component files under `src/TechShowcase/`, 1 modified file `src/Root.tsx`

**Tech Stack:** Remotion 4.x, React 18, TypeScript 5.x

---

### Task 1: Create type definitions

**File:** Create `src/TechShowcase/types.ts`

```ts
export interface TechSegment {
  id: string;
  text: string;
  duration: number;
}
```

- [ ] **Create file with above content**

---

### Task 2: Create segment data from 1.txt

**File:** Create `src/TechShowcase/data.ts`

Segment text is split from 1.txt into 7 parts, each with a defined duration (seconds).

```ts
import { TechSegment } from "./types";

export const FPS = 30;

export const techSegments: TechSegment[] = [
  {
    id: "s1",
    text: '韩旭老师"实务领导力系列课程"代总序。',
    duration: 8,
  },
  {
    id: "s2",
    text: "在后数字化转型时代，AI技术飞速发展，就业失业成为全社会难以逃避的风险。",
    duration: 12,
  },
  {
    id: "s3",
    text: "抵抗失业风险的能力分两类：一是专业技术能力（如跨领域技术创新、决策架构设计等），底层逻辑不会改变；",
    duration: 14,
  },
  {
    id: "s4",
    text: "二是人性化能力（如危机公关、心理咨询、战略预见等），无法被AI替代。其中最突出的是领导力——",
    duration: 14,
  },
  {
    id: "s5",
    text: "拥有领导力就拥有了永远不怕失业的能力。",
    duration: 12,
  },
  {
    id: "s6",
    text: "课程涵盖认识自我、改变自我、领导他人、领导团队、自由人生五部分，重点针对从管理自我到管理他人、从管理他人到管理经理人员的跃升阶段，",
    duration: 14,
  },
  {
    id: "s7",
    text: "帮助学员完成职业转型，实现快速晋升。",
    duration: 10,
  },
];
```

- [ ] **Create file with above content**

---

### Task 3: Create Background component (grid + scanline + Matrix rain)

**File:** Create `src/TechShowcase/Background.tsx`

Renders three layers beneath the text:
1. Moving grid lines (translucent green)
2. Horizontal scan line sweeping top to bottom
3. Matrix rain columns using katakana + ASCII characters

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const RAIN_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]";

const ROW_HEIGHT = 26;

interface RainDrop {
  x: number;
  speed: number;
  length: number;
  chars: string[];
}

// Deterministic seeded random for Remotion rendering consistency
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateRainDrops = (): RainDrop[] =>
  Array.from({ length: 35 }, (_, i) => ({
    x: (i / 35) * 100,
    speed: 0.4 + seededRandom(i * 7 + 1) * 1.2,
    length: 4 + Math.floor(seededRandom(i * 13 + 3) * 12),
    chars: Array.from(
      { length: 25 },
      () => RAIN_CHARS[Math.floor(seededRandom(i * 17 + Math.random()) * RAIN_CHARS.length)]
    ),
  }));

const rainDrops: RainDrop[] = generateRainDrops();

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const gridOffset = (frame * 0.3) % 60;
  const scanY = (frame * 4) % 1440;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0f", overflow: "hidden" }}>
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "60px 60px",
          transform: `translateY(${gridOffset}px)`,
        }}
      />

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(0,255,136,0.12)",
          boxShadow: "0 0 12px rgba(0,255,136,0.3)",
          top: scanY,
        }}
      />

      {/* Matrix rain */}
      {rainDrops.map((col, ci) => {
        const offset = (frame * col.speed * ROW_HEIGHT) % (25 * ROW_HEIGHT);
        return (
          <div
            key={ci}
            style={{
              position: "absolute",
              left: `${col.x}%`,
              top: 0,
              transform: `translateY(${-offset}px)`,
            }}
          >
            {col.chars.slice(0, col.length).map((char, j) => (
              <div
                key={j}
                style={{
                  color: j === 0 ? "#00ff88" : "rgba(0,255,136,0.25)",
                  fontSize: 16,
                  fontFamily: '"Courier New", monospace',
                  opacity: 1 - j / col.length,
                  lineHeight: `${ROW_HEIGHT}px`,
                  height: ROW_HEIGHT,
                  textShadow:
                    j === 0 ? "0 0 6px rgba(0,255,136,0.6)" : undefined,
                }}
              >
                {char}
              </div>
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
```

- [ ] **Create file with above content**

---

### Task 4: Create TypewriterText component

**File:** Create `src/TechShowcase/TypewriterText.tsx`

Three-phase animation per segment:
1. **Enter (0–30%):** Characters appear one-by-one with glow
2. **Hold (30–70%):** Full text visible, pulsing glow
3. **Exit (70–100%):** Glitch (RGB shift + clip) then fade out

Uses deterministic seeded random for glitch to ensure render consistency.

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface TypewriterTextProps {
  text: string;
  durationInFrames: number;
}

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const enterEnd = Math.floor(durationInFrames * 0.3);
  const holdEnd = Math.floor(durationInFrames * 0.7);

  // Typewriter: visible character count
  const visibleChars =
    frame < enterEnd
      ? Math.max(1, Math.ceil((frame / enterEnd) * text.length))
      : text.length;

  // Opacity curve
  const opacity = interpolate(
    frame,
    [0, enterEnd, holdEnd, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Pulsing glow during hold phase (breathing effect)
  const pulse = Math.sin(frame * 0.08);
  const glowFactor = frame >= enterEnd && frame <= holdEnd
    ? 0.5 + pulse * 0.3
    : 0.6;

  // Glitch during exit phase (first 15 frames of exit)
  const exitFrame = frame - holdEnd;
  const inGlitch = frame > holdEnd && exitFrame < 15;

  const glitchX = inGlitch && seededRandom(frame * 1.7) > 0.65
    ? (seededRandom(frame * 3.1) - 0.5) * 12
    : 0;
  const glitchY = inGlitch && seededRandom(frame * 2.3) > 0.7
    ? (seededRandom(frame * 5.7) - 0.5) * 6
    : 0;
  const glitchClip = inGlitch && seededRandom(frame * 4.1) > 0.6
    ? `inset(${seededRandom(frame * 7.3) * 50}% 0 ${seededRandom(frame * 11.1) * 50}% 0)`
    : undefined;

  // RGB split on glitch
  const showSplit = inGlitch && seededRandom(frame * 9.7) > 0.75;
  const splitOffset = showSplit ? (seededRandom(frame * 13.3) - 0.5) * 6 : 0;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* RGB split ghost layers (glitch effect) */}
        {showSplit && (
          <>
            <p
              style={{
                position: "absolute",
                inset: 0,
                color: "#ff0000",
                fontSize: 52,
                lineHeight: 1.6,
                textAlign: "center",
                fontWeight: 600,
                fontFamily:
                  '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
                letterSpacing: "0.08em",
                margin: 0,
                opacity: 0.5,
                clipPath: glitchClip,
                transform: `translate(${splitOffset}px, 0)`,
              }}
            >
              {text.slice(0, visibleChars)}
            </p>
            <p
              style={{
                position: "absolute",
                inset: 0,
                color: "#00aaff",
                fontSize: 52,
                lineHeight: 1.6,
                textAlign: "center",
                fontWeight: 600,
                fontFamily:
                  '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
                letterSpacing: "0.08em",
                margin: 0,
                opacity: 0.5,
                clipPath: glitchClip,
                transform: `translate(${-splitOffset}px, 0)`,
              }}
            >
              {text.slice(0, visibleChars)}
            </p>
          </>
        )}

        {/* Main text */}
        <p
          style={{
            color: "#00ff88",
            fontSize: 52,
            lineHeight: 1.6,
            textAlign: "center",
            fontWeight: 600,
            fontFamily:
              '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
            letterSpacing: "0.08em",
            margin: 0,
            opacity,
            textShadow: [
              `0 0 4px rgba(0,255,136,${glowFactor})`,
              `0 0 12px rgba(0,255,136,${glowFactor * 0.6})`,
              `0 0 30px rgba(0,255,136,${glowFactor * 0.3})`,
            ].join(","),
            transform:
              glitchX || glitchY
                ? `translate(${glitchX}px, ${glitchY}px)`
                : undefined,
            clipPath: glitchClip,
            position: "relative",
          }}
        >
          {text.slice(0, visibleChars)}
          {/* Blinking cursor */}
          <span
            style={{
              opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
              color: "#00ff88",
              fontWeight: 100,
              fontSize: 48,
            }}
          >
            _
          </span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Create file with above content**

---

### Task 5: Create main TechShowcase component

**File:** Create `src/TechShowcase/index.tsx`

Composes `Background` and `TypewriterText` using `<Sequence>` for each segment.

```tsx
import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { TypewriterText } from "./TypewriterText";
import { FPS, techSegments } from "./data";

const TechShowcase: React.FC = () => {
  const { fps } = useVideoConfig();

  const startFrames = useMemo(() => {
    const frames: number[] = [0];
    for (let i = 0; i < techSegments.length - 1; i++) {
      frames.push(frames[i] + Math.round(techSegments[i].duration * fps));
    }
    return frames;
  }, [fps]);

  return (
    <AbsoluteFill>
      <Background />
      {techSegments.map((seg, i) => {
        const segFrames = Math.round(seg.duration * FPS);
        return (
          <Sequence
            key={seg.id}
            from={startFrames[i]}
            durationInFrames={segFrames}
          >
            <TypewriterText text={seg.text} durationInFrames={segFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default TechShowcase;
```

- [ ] **Create file with above content**

---

### Task 6: Register TechShowcase Composition in Root.tsx

**File:** Modify `src/Root.tsx`

Add import and a new `<Composition>` entry for `TechShowcase`. Compute total frames from segment data.

Edit the existing file:

1. Add import at top:
```ts
import TechShowcase from "./TechShowcase";
import { techSegments, FPS } from "./TechShowcase/data";
```

2. Add Composition inside the fragment, after the existing ones:
```tsx
<Composition
  id="TechShowcase"
  component={TechShowcase}
  durationInFrames={techSegments.reduce(
    (sum, seg) => sum + Math.round(seg.duration * FPS),
    0
  )}
  fps={FPS}
  width={2560}
  height={1440}
/>
```

After edit, the full file should look like:

```tsx
import React from "react";
import { Composition } from "remotion";
import CourseIntro, { manifest } from "./CourseIntro";
import TechShowcase from "./TechShowcase";
import { techSegments, FPS } from "./TechShowcase/data";

const COURSE_FPS = 30;

const totalDurationInFrames = manifest.reduce(
  (sum, seg) => sum + Math.round(seg.duration * COURSE_FPS),
  0
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CourseIntro"
        component={CourseIntro}
        durationInFrames={totalDurationInFrames}
        fps={COURSE_FPS}
        width={2560}
        height={1440}
        defaultProps={{}}
      />
      <Composition
        id="CourseIntroPreview"
        component={CourseIntro}
        durationInFrames={totalDurationInFrames}
        fps={COURSE_FPS}
        width={1280}
        height={720}
        defaultProps={{}}
      />
      <Composition
        id="TechShowcase"
        component={TechShowcase}
        durationInFrames={techSegments.reduce(
          (sum, seg) => sum + Math.round(seg.duration * FPS),
          0
        )}
        fps={FPS}
        width={2560}
        height={1440}
      />
    </>
  );
};
```

- [ ] **Add import lines at top of Root.tsx**
- [ ] **Add Composition entry inside fragment**

---

### Task 7: Verify project compiles

- [ ] **Run type check:**
  ```bash
  npx tsc --noEmit
  ```
  Expected: no errors

- [ ] **Start Remotion Studio to visually inspect:**
  ```bash
  npm start
  ```
  Open browser, select "TechShowcase" from the composition dropdown, preview the animation.
