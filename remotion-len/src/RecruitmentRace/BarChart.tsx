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
