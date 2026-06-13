import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { TypewriterText } from "./TypewriterText";
import { FPS, techSegments } from "./data";

const TechShowcase: React.FC = () => {
  const { fps } = useVideoConfig();

  const startFrames = useMemo(() => {
    const frames: number[] = [0];
    for (let i = 0; i < techSegments.length - 1; i++) {
      frames.push(frames[i] + Math.round(techSegments[i].duration * fps));
    }
    return frames;
  }, [fps]);

  return (
    <AbsoluteFill>
      <Background />
      {techSegments.map((seg, i) => {
        const segFrames = Math.round(seg.duration * FPS);
        return (
          <Sequence
            key={seg.id}
            from={startFrames[i]}
            durationInFrames={segFrames}
          >
            <TypewriterText text={seg.text} durationInFrames={segFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default TechShowcase;
