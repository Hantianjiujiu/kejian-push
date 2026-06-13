import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../TechShowcase/Background";

const LINE1 = "人生没有专属的路线图";
const LINE2 = "但你要有前进的指南针";
const FONT_SIZE = 60;

const AnimatedChars: React.FC<{
  text: string;
  startFrame: number;
  speed: number;
  color: string;
}> = ({ text, startFrame, speed, color }) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - startFrame);

  // String slicing per Remotion best practice
  const visibleCount = Math.min(
    text.length,
    Math.floor(localFrame / speed)
  );
  const visibleText = text.slice(0, visibleCount);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {visibleText.split("").map((char, i) => {
        // Each character has staggered timing
        const charFrame = Math.max(0, localFrame - i * speed);
        const enterDuration = speed * 3;
        const progress = Math.min(1, charFrame / enterDuration);

        const bounceY = interpolate(progress, [0, 1], [-100, 0], {
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const rotation = interpolate(progress, [0, 1], [-25, 0], {
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const charOpacity = interpolate(
          progress,
          [0, 0.15, 1],
          [0, 0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const glow = interpolate(progress, [0, 0.5, 1], [0, 0.3, 1], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color,
              fontSize: FONT_SIZE,
              fontWeight: 700,
              fontFamily:
                '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
              letterSpacing: "0.06em",
              opacity: charOpacity,
              transform: `translateY(${bounceY}px) rotate(${rotation}deg)`,
              textShadow: [
                `0 0 ${glow * 4}px ${color}88`,
                `0 0 ${glow * 14}px ${color}44`,
              ].join(","),
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

const HanXuIntro: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-3.5s: Line 1 types in
  // 4-7.5s: Line 2 types in (starts at frame 120)
  // 7.5-9s: Both lines hold with glow
  // 9-10s:  Fade out (frame 270-300)
  const line2Start = 120;
  const typeSpeed = 4; // frames per character

  const opacity = interpolate(
    frame,
    [270, 300],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity,
        }}
      >
        <AnimatedChars
          text={LINE1}
          startFrame={0}
          speed={typeSpeed}
          color="#00ff88"
        />
        <div style={{ height: 40 }} />
        <AnimatedChars
          text={LINE2}
          startFrame={line2Start}
          speed={typeSpeed}
          color="#ffcc00"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default HanXuIntro;
