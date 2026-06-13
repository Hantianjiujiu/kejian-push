import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Audio,
  Sequence,
  staticFile,
} from "remotion";

const BG = "#0d1117";
const TERMINAL_BG = "#0d1117";
const BORDER = "#30363d";
const TITLE_BAR = "#161b22";
const TEXT_GREEN = "#4ade80";
const TEXT_WHITE = "#e6edf3";
const TEXT_GRAY = "#8b949e";
const TEXT_GOLD = "#ffcc00";
const MONO = '"Courier New", Consolas, "Source Code Pro", monospace';

interface TerminalLineDef {
  text: string;
  color: string;
  startFrame: number;
  typewriter?: boolean;
  speed?: number;
  glow?: boolean;
}

const LINES: TerminalLineDef[] = [
  {
    text: "$ brew install git",
    color: TEXT_GREEN,
    startFrame: 15,
    typewriter: true,
    speed: 3,
  },
  { text: "", color: TEXT_GRAY, startFrame: 70 },
  { text: "==> Downloading https://brew.sh/git-2.45.0.tar.gz", color: TEXT_GRAY, startFrame: 80 },
  { text: "==> Installing git", color: TEXT_GRAY, startFrame: 110 },
  { text: "==> Linking git", color: TEXT_GRAY, startFrame: 140 },
  { text: "", color: TEXT_GRAY, startFrame: 170 },
  {
    text: "✨ Git 2.45.0 installed successfully!",
    color: TEXT_GOLD,
    startFrame: 215,
    typewriter: true,
    speed: 2,
    glow: true,
  },
  { text: "Run 'git --version' to verify →", color: TEXT_WHITE, startFrame: 285 },
];

interface SubtitleDef {
  cn: string;
  en: string;
  startFrame: number;
  endFrame: number;
  audioFile: string;
}

const SUBTITLES: SubtitleDef[] = [
  {
    cn: "打开终端，安装 Git",
    en: "Open terminal, install Git",
    startFrame: 15,
    endFrame: 100,
    audioFile: "audio/vo_git1.mp3",
  },
  {
    cn: "正在下载并安装 Git",
    en: "Downloading and installing Git",
    startFrame: 100,
    endFrame: 200,
    audioFile: "audio/vo_git2.mp3",
  },
  {
    cn: "Git 安装成功",
    en: "Git installed successfully",
    startFrame: 215,
    endFrame: 290,
    audioFile: "audio/vo_git3.mp3",
  },
  {
    cn: "运行 git --version 验证安装",
    en: "Run git --version to verify",
    startFrame: 285,
    endFrame: 390,
    audioFile: "audio/vo_git4.mp3",
  },
];

const TerminalLine: React.FC<{ def: TerminalLineDef; frame: number }> = ({
  def,
  frame,
}) => {
  const localFrame = frame - def.startFrame;
  if (localFrame < 0) return null;

  let displayText = def.text;
  let showCursor = false;
  if (def.typewriter && def.speed) {
    const charCount = Math.min(
      def.text.length,
      Math.floor(localFrame / def.speed),
    );
    displayText = def.text.slice(0, charCount);
    showCursor = charCount < def.text.length;
  }

  const opacity = interpolate(localFrame, [0, 8], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = def.glow ? Math.sin(frame * 0.06) * 0.3 + 0.7 : 0;

  return (
    <div
      style={{
        color: def.color,
        fontFamily: MONO,
        fontSize: 22,
        lineHeight: "30px",
        opacity,
        textShadow: def.glow
          ? `0 0 ${pulse * 8}px rgba(255,204,0,${pulse * 0.4})`
          : "none",
        minHeight: 30,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      {displayText}
      {showCursor && (
        <span
          style={{
            opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
          }}
        >
          ▊
        </span>
      )}
    </div>
  );
};

const SubtitleOverlay: React.FC<{
  def: SubtitleDef;
  frame: number;
}> = ({ def, frame }) => {
  const localFrame = frame - def.startFrame;
  if (localFrame < 0 || frame > def.endFrame) return null;

  const duration = def.endFrame - def.startFrame;
  const opacity = interpolate(
    localFrame,
    [0, 8, duration - 8, duration],
    [0, 1, 1, 0],
    {
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateY = interpolate(localFrame, [0, 10], [16, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
          borderRadius: 12,
          padding: "14px 40px",
          textAlign: "center",
          maxWidth: "70%",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 600,
            fontFamily:
              '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
            letterSpacing: "0.04em",
            lineHeight: 1.5,
          }}
        >
          {def.cn}
        </div>
        <div
          style={{
            color: TEXT_GRAY,
            fontSize: 16,
            fontWeight: 400,
            fontFamily: MONO,
            lineHeight: 1.6,
            marginTop: 4,
          }}
        >
          {def.en}
        </div>
      </div>
    </div>
  );
};

const GitInstall: React.FC = () => {
  const frame = useCurrentFrame();

  const windowOpacity = interpolate(frame, [0, 10], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const windowScale = interpolate(frame, [0, 10], [0.95, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const successGlow =
    frame >= 215 && frame < 280
      ? interpolate(frame, [215, 225, 280], [0, 0.08, 0], {
          easing: Easing.bezier(0.45, 0, 0.55, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio src={staticFile("audio/bg-tech.wav")} volume={0.5} />

      <Sequence from={15}>
        <Audio src={staticFile("audio/typing-git.wav")} />
      </Sequence>

      {SUBTITLES.map((sub) => (
        <Sequence
          key={sub.audioFile}
          from={sub.startFrame}
          durationInFrames={sub.endFrame - sub.startFrame}
        >
          <Audio src={staticFile(sub.audioFile)} />
        </Sequence>
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(255,204,0,${successGlow}) 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          opacity: windowOpacity,
          transform: `scale(${windowScale})`,
          width: 840,
          borderRadius: 10,
          overflow: "hidden",
          border: `1px solid ${BORDER}`,
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            backgroundColor: TITLE_BAR,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
          </div>
          <div style={{ flex: 1, textAlign: "center", color: TEXT_GRAY, fontFamily: MONO, fontSize: 13, marginRight: 52 }}>
            bash
          </div>
        </div>

        <div style={{ backgroundColor: TERMINAL_BG, padding: "20px 24px", minHeight: 380 }}>
          {LINES.map((line, i) => (
            <TerminalLine key={i} def={line} frame={frame} />
          ))}

          {frame >= 285 && (
            <span style={{ color: TEXT_WHITE, fontFamily: MONO, fontSize: 22, opacity: Math.sin(frame * 0.1) > 0 ? 1 : 0 }}>
              ▊
            </span>
          )}
        </div>
      </div>

      {SUBTITLES.map((sub) => (
        <SubtitleOverlay key={sub.cn} def={sub} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};

export default GitInstall;
