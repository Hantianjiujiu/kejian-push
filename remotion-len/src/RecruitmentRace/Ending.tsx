import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import BarChart, { BarChartData } from "./BarChart";
import { ENDING as DURATION } from "./data";

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
