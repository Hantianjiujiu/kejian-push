import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface ChapterTransitionProps {
  year: number;
}

const ChapterTransition: React.FC<ChapterTransitionProps> = ({ year }) => {
  const frame = useCurrentFrame();
  const duration = 15;

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
