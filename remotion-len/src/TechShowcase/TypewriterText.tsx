import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

interface TypewriterTextProps {
  text: string;
  durationInFrames: number;
}

const NEON_COLORS = [
  "#00ff88",
  "#00ffff",
  "#ff00ff",
  "#ffff00",
  "#ff6600",
  "#ff3366",
  "#00ffcc",
];

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
  const exitDuration = durationInFrames - holdEnd;

  // Typewriter reveal: use string slicing per Remotion best practice
  const typewriterSpeed = 2;
  const revealCount = Math.min(text.length, Math.ceil(frame / typewriterSpeed));

  // Split visible chars for per-character animation; keep all chars during hold/exit
  const isEnterPhase = frame < enterEnd;
  const isHoldPhase = frame >= enterEnd && frame < holdEnd;
  const isExitPhase = frame >= holdEnd;

  const visibleChars = useMemo(
    () => (isEnterPhase ? text.slice(0, revealCount) : text),
    [text, isEnterPhase, revealCount]
  );
  const chars = useMemo(() => visibleChars.split(""), [visibleChars]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "90%",
          rowGap: 8,
        }}
      >
        {chars.map((char, i) => {
          // Per-character delay to create wave effect
          const charDelay = i * 2;
          const localFrame = Math.max(0, frame - charDelay);

          // ENTER PHASE — bounce in with playful overshoot
          if (isEnterPhase) {
            const progress = Math.min(1, localFrame / enterEnd);
            // Playful overshoot: bounce past target then settle
            const bounceY = interpolate(
              progress,
              [0, 1],
              [-120, 0],
              {
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
            const rotation = interpolate(
              progress,
              [0, 1],
              [-40 + seededRandom(i * 3) * 20, 0],
              {
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
            const scale = interpolate(
              progress,
              [0, 0.5, 1],
              [0, 1.15, 1],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
            const bright = interpolate(progress, [0, 0.3, 1], [0, 0.5, 1], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const color = NEON_COLORS[i % NEON_COLORS.length];

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color,
                  fontSize: 52,
                  lineHeight: 1.6,
                  fontWeight: 600,
                  fontFamily:
                    '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
                  letterSpacing: "0.04em",
                  whiteSpace: "pre",
                  transform: `translateY(${bounceY}px) rotate(${rotation}deg) scale(${scale})`,
                  textShadow: [
                    `0 0 ${bright * 4}px ${color}88`,
                    `0 0 ${bright * 14}px ${color}44`,
                  ].join(","),
                }}
              >
                {char}
              </span>
            );
          }

          // HOLD PHASE — gentle float, slow color cycle, pulsing glow
          if (isHoldPhase) {
            const floatY = Math.sin(frame * 0.04 + i * 0.7) * 5;
            const floatRot = Math.sin(frame * 0.03 + i * 0.5) * 1.5;
            const colorShift = Math.floor(frame * 0.015) % NEON_COLORS.length;
            const color =
              NEON_COLORS[(i + colorShift) % NEON_COLORS.length];
            const pulse = Math.sin(frame * 0.06 + i * 0.3) * 0.2 + 0.8;

            // Random individual sparkle
            const sparkle =
              seededRandom(Math.floor(frame / 3) * 7 + i * 13) > 0.92;

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color: sparkle ? "#ffffff" : color,
                  fontSize: 52,
                  lineHeight: 1.6,
                  fontWeight: 600,
                  fontFamily:
                    '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
                  letterSpacing: "0.04em",
                  whiteSpace: "pre",
                  transform: `translateY(${floatY}px) rotate(${floatRot}deg)`,
                  textShadow: sparkle
                    ? "0 0 20px #ffffffcc, 0 0 40px #ffffff88"
                    : [
                        `0 0 ${pulse * 5}px ${color}88`,
                        `0 0 ${pulse * 16}px ${color}44`,
                      ].join(","),
                }}
              >
                {char}
              </span>
            );
          }

          // EXIT PHASE — scatter in all directions with spin
          const exitProgress = Math.min(
            1,
            (localFrame - holdEnd) / exitDuration
          );

          // Staggered exit (each char leaves at slightly different time)
          const exitDelay = (i * 1.5) / exitDuration;
          const exitLocal = Math.max(0, exitProgress - exitDelay);

          // Each character flies in a unique direction
          const angle = seededRandom(i * 7 + 3) * Math.PI * 2;
          const distance = 80 + seededRandom(i * 11 + 5) * 120;
          const scatterX = interpolate(
            exitLocal,
            [0, 1],
            [0, Math.cos(angle) * distance],
            {
              easing: Easing.in(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          const scatterY = interpolate(
            exitLocal,
            [0, 1],
            [0, Math.sin(angle) * distance - 50],
            {
              easing: Easing.in(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          const exitScale = interpolate(exitLocal, [0, 1], [1, 0], {
            easing: Easing.in(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const exitRot = interpolate(
            exitLocal,
            [0, 1],
            [0, seededRandom(i * 13 + 7) * 360],
            {
              easing: Easing.in(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          const exitOpacity = interpolate(
            exitLocal,
            [0, 0.4, 1],
            [1, 1, 0],
            {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Glitch during first part of exit
          const glitchFlash =
            exitLocal < 0.3 && seededRandom(frame * 5 + i * 3) > 0.85;
          const glitchX =
            exitLocal < 0.3 && seededRandom(frame * 3 + i * 7) > 0.7
              ? (seededRandom(frame * 11 + i * 2) - 0.5) * 10
              : 0;

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                color: glitchFlash
                  ? "#ffffff"
                  : NEON_COLORS[i % NEON_COLORS.length],
                fontSize: 52,
                lineHeight: 1.6,
                fontWeight: 600,
                fontFamily:
                  '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
                letterSpacing: "0.04em",
                whiteSpace: "pre",
                opacity: exitOpacity,
                transform: [
                  `translate(${scatterX + glitchX}px, ${scatterY}px)`,
                  `rotate(${exitRot}deg)`,
                  `scale(${exitScale})`,
                ].join(" "),
                textShadow: glitchFlash
                  ? "0 0 20px #ffffff88"
                  : `0 0 6px ${NEON_COLORS[i % NEON_COLORS.length]}66`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
