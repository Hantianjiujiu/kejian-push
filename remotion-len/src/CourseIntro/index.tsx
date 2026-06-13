import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Sequence,
  Img,
  staticFile,
  interpolate,
} from "remotion";
import { manifest } from "./manifest";

const getImagePath = (num: string) => staticFile(`images/${num}.png`);
const getAudioPath = (filename: string) => staticFile(`audio/${filename}`);

const SUBTITLE_BOTTOM_MARGIN = 120;

const SubtitleText: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  // Since this is inside a <Sequence>, frame is relative (0 to durationInFrames)
  const fadeIn = 10;
  const fadeOut = 10;

  const opacity = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(frame, [0, 15], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: `0 80px ${SUBTITLE_BOTTOM_MARGIN}px`,
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.8) 100%)",
          borderRadius: 16,
          padding: "40px 50px 30px",
          width: "100%",
        }}
      >
        <p
          style={{
            color: "#FFFFFF",
            fontSize: 42,
            lineHeight: 1.6,
            textAlign: "center",
            margin: 0,
            fontWeight: 400,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            fontFamily:
              '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
            letterSpacing: "0.05em",
          }}
        >
          {text}
        </p>
      </div>
    </AbsoluteFill>
  );
};

const CourseIntro: React.FC = () => {
  const { fps } = useVideoConfig();

  const startFrames = useMemo(() => {
    const frames: number[] = [0];
    for (let i = 0; i < manifest.length - 1; i++) {
      frames.push(frames[i] + Math.round(manifest[i].duration * fps));
    }
    return frames;
  }, [fps]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        fontFamily:
          '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      }}
    >
      {/* Background images */}
      <AbsoluteFill>
        {manifest.map((segment, idx) => {
          const segStart = startFrames[idx];
          const segFrames = Math.round(segment.duration * fps);
          return (
            <Sequence
              key={`img-${segment.id}`}
              from={segStart}
              durationInFrames={segFrames}
            >
              {segment.imageTiming.map((timing, tIdx) => {
                const imgStart = Math.round(timing.startTime * fps);
                const imgEnd = Math.round(timing.endTime * fps);
                return (
                  <Sequence
                    key={`img-${segment.id}-${tIdx}`}
                    from={imgStart}
                    durationInFrames={imgEnd - imgStart}
                  >
                    <Img
                      src={getImagePath(timing.image)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Sequence>
                );
              })}
            </Sequence>
          );
        })}
      </AbsoluteFill>

      {/* Audio */}
      {manifest.map((segment, idx) => {
        const segStart = startFrames[idx];
        const segFrames = Math.round(segment.duration * fps);
        return (
          <Sequence
            key={`audio-${segment.id}`}
            from={segStart}
            durationInFrames={segFrames}
          >
            <Audio src={getAudioPath(segment.audioFile)} />
          </Sequence>
        );
      })}

      {/* Subtitles */}
      {manifest.map((segment, idx) => {
        const segStart = startFrames[idx];
        const segFrames = Math.round(segment.duration * fps);
        return (
          <Sequence
            key={`sub-${segment.id}`}
            from={segStart}
            durationInFrames={segFrames}
          >
            <SubtitleText
              text={segment.text}
              durationInFrames={segFrames}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export { manifest };
export default CourseIntro;
