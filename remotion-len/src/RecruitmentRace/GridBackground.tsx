import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const GRID_LINES = [0, 1, 2, 3, 4, 5];

const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 0.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5F6F8" }}>
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
