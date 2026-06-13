import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import GridBackground from "./GridBackground";
import BarChart from "./BarChart";
import type { BarChartData } from "./BarChart";
import Header from "./Header";
import Opening from "./Opening";
import ChapterTransition from "./ChapterTransition";
import Ending from "./Ending";
import {
  chapters,
  keyEvents,
  TRANSITION,
  getInterpolatedValues,
} from "./data";

function computeTransitionFrames(): number[] {
  return chapters.map((ch) => ch.startFrame + ch.durationInFrames);
}

const RecruitmentRace: React.FC = () => {
  const absoluteFrame = useCurrentFrame();

  const values: BarChartData = useMemo(
    () => getInterpolatedValues(absoluteFrame),
    [absoluteFrame]
  );

  const ranking = useMemo(() => {
    const entries = [
      { key: "ali", value: values.ali },
      { key: "tencent", value: values.tencent },
      { key: "huawei", value: values.huawei },
    ];
    entries.sort((a, b) => b.value - a.value);
    return entries.map((e, i) => ({ key: e.key, rank: i }));
  }, [values]);

  const currentChapter = useMemo(() => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (absoluteFrame >= chapters[i].startFrame) {
        return chapters[i];
      }
    }
    return chapters[0];
  }, [absoluteFrame]);

  const activeEvent = useMemo(() => {
    return (
      keyEvents.find(
        (e) =>
          absoluteFrame >= e.startFrame &&
          absoluteFrame < e.startFrame + 180
      ) || null
    );
  }, [absoluteFrame]);

  const finalValues = useMemo(() => getInterpolatedValues(99999), []);
  const finalRanking = useMemo(() => {
    const v = finalValues;
    const entries = [
      { key: "ali", value: v.ali },
      { key: "tencent", value: v.tencent },
      { key: "huawei", value: v.huawei },
    ];
    entries.sort((a, b) => b.value - a.value);
    return entries.map((e, i) => ({ key: e.key, rank: i }));
  }, [finalValues]);

  const transitionFrames = useMemo(() => computeTransitionFrames(), []);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F6F8",
        fontFamily:
          '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      }}
    >
      <GridBackground />

      <Sequence from={0} durationInFrames={90}>
        <Opening />
      </Sequence>

      {chapters.map((ch) => (
        <Sequence
          key={`ch-${ch.year}`}
          from={ch.startFrame}
          durationInFrames={ch.durationInFrames}
        >
          <Header
            currentChapter={ch}
            eventText={activeEvent?.text ?? null}
            eventStartFrame={activeEvent?.startFrame ?? 0}
          />
          <BarChart values={values} ranking={ranking} />
        </Sequence>
      ))}

      {chapters.slice(1).map((ch, i) => (
        <Sequence
          key={`trans-${ch.year}`}
          from={transitionFrames[i]}
          durationInFrames={TRANSITION}
        >
          <ChapterTransition year={ch.year} />
        </Sequence>
      ))}

      <Sequence
        from={transitionFrames[transitionFrames.length - 1]}
        durationInFrames={180}
      >
        <Ending finalValues={finalValues} finalRanking={finalRanking} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default RecruitmentRace;
export type { BarChartData };
