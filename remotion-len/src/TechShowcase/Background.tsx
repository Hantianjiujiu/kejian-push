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
      () =>
        RAIN_CHARS[
          Math.floor(seededRandom(i * 17 + Math.random()) * RAIN_CHARS.length)
        ]
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
