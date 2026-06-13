import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { companies } from "./data";

const Opening: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 30], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
