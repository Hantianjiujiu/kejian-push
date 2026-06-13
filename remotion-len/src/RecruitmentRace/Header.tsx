import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Chapter } from "./types";

interface HeaderProps {
  currentChapter: Chapter;
  eventText: string | null;
  eventStartFrame: number;
}

const Header: React.FC<HeaderProps> = ({
  currentChapter,
  eventText,
  eventStartFrame,
}) => {
  const frame = useCurrentFrame();

  const eventRelativeStart = eventStartFrame - currentChapter.startFrame;
  const hasEvent = eventText && eventRelativeStart >= 0 &&
    eventRelativeStart < currentChapter.durationInFrames;

  const eventOpacity = hasEvent
    ? interpolate(
        frame,
        [
          eventRelativeStart,
          eventRelativeStart + 15,
          eventRelativeStart + 165,
          eventRelativeStart + 180,
        ],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  const eventTranslateX = hasEvent
    ? interpolate(
        frame,
        [eventRelativeStart, eventRelativeStart + 15],
        [40, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: "-0.02em",
          }}
        >
          {currentChapter.year}
        </span>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#666" }}>
          年度招聘
        </span>
      </div>

      {hasEvent && (
        <div
          style={{
            opacity: eventOpacity,
            transform: `translateX(${eventTranslateX}px)`,
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: 8,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          {eventText}
        </div>
      )}
    </div>
  );
};

export default Header;
