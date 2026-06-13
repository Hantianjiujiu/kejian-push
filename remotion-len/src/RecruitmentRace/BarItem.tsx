import React, { useMemo } from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";
import { Company, FPS } from "./types";

interface BarItemProps {
  company: Company;
  value: number;
  maxValue: number;
  maxBarWidth: number;
  rank: number;
  yOffset: number;
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

  const glowIntensity = interpolate(rank, [0, 2], [1, 0], {
    extrapolateRight: "clamp",
  });

  const displayNumber = useMemo(() => {
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
      <div
        style={{
          width: 160,
          textAlign: "right",
          paddingRight: 24,
          fontSize: 32,
          fontWeight: 600,
          color: company.color,
          fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
          flexShrink: 0,
        }}
      >
        {company.shortName}
      </div>

      <div
        style={{
          width: Math.max(animatedWidth, BAR_RADIUS * 2),
          height: BAR_HEIGHT,
          background: `linear-gradient(90deg, ${company.color}, ${company.glowColor})`,
          borderRadius: `0 ${BAR_RADIUS}px ${BAR_RADIUS}px 0`,
          boxShadow:
            glowIntensity > 0.01
              ? `0 0 ${24 * glowIntensity}px ${company.glowColor}, inset 0 2px 4px rgba(255,255,255,0.3)`
              : "inset 0 2px 4px rgba(255,255,255,0.25)",
          position: "relative",
          flexShrink: 0,
        }}
      >
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

      <div
        style={{
          marginLeft: 16,
          fontSize: 34,
          fontWeight: 700,
          color: "#1a1a2e",
          fontVariantNumeric: "tabular-nums",
          fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {displayNumber.toLocaleString()}
        <span
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#666",
            marginLeft: 4,
          }}
        >
          人
        </span>
      </div>
    </div>
  );
};

export default BarItem;
