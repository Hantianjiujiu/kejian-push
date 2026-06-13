import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const COURSE_PROMO_FPS = 30;

export interface CoursePromoScene {
  id: string;
  durationInFrames: number;
  headline: string;
  subline: string;
  kicker?: string;
  keywords?: string[];
  accent: string;
  videoStartSeconds?: number;
  layout?: string;
}

export interface CoursePromoData {
  id: string;
  title: string;
  module: string;
  teacherName: string;
  teacherRole: string;
  scenes: CoursePromoScene[];
}

const fontFamily = '"PingFang SC","Microsoft YaHei","Noto Sans SC",sans-serif';

/* -------- utility -------- */
const sceneStart = (scenes: CoursePromoScene[], idx: number) =>
  scenes.slice(0, idx).reduce((s, c) => s + c.durationInFrames, 0);

/* -------- simple sub-components -------- */
const KeywordPills: React.FC<{ keywords: string[]; accent: string }> = ({
  keywords,
  accent,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 32 }}>
      {keywords.map((k, i) => {
        const t = f - 20 - i * 8;
        const o = interpolate(t, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const y = interpolate(t, [0, 18], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
        return (
          <div key={k} style={{ opacity: o, transform: `translateY(${y}px)`, padding: "12px 22px", borderRadius: 999, color: "#fff", fontSize: 26, fontWeight: 800, border: `2px solid ${accent}88`, background: `linear-gradient(135deg,${accent}55,rgba(15,23,42,0.82))`, boxShadow: `0 0 28px ${accent}33` }}>
            {k}
          </div>
        );
      })}
    </div>
  );
};

const TextBlock: React.FC<{ scene: CoursePromoScene; align?: any }> = ({ scene, align = "center" }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [0, 24], [44, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ opacity: o, transform: `translateY(${y}px)`, textAlign: align as any, maxWidth: align === "left" ? 980 : 1220 }}>
      {scene.kicker && (
        <div style={{ display: "inline-block", color: scene.accent, fontSize: 30, fontWeight: 900, letterSpacing: "0.1em", marginBottom: 24, padding: "8px 18px", borderRadius: 999, background: "rgba(15,23,42,0.74)", border: `1px solid ${scene.accent}88` }}>
          {scene.kicker}
        </div>
      )}
      <div style={{ color: "#fff", fontSize: 80, lineHeight: 1.14, fontWeight: 900, letterSpacing: "0.02em", textShadow: "0 8px 32px rgba(0,0,0,0.58)" }}>
        {scene.headline}
      </div>
      <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 40, lineHeight: 1.44, fontWeight: 650, marginTop: 26, textShadow: "0 6px 24px rgba(0,0,0,0.55)" }}>
        {scene.subline}
      </div>
      {scene.keywords && <KeywordPills keywords={scene.keywords} accent={scene.accent} />}
    </div>
  );
};

const SplitScene: React.FC<{ data: CoursePromoData; scene: CoursePromoScene }> = ({ data, scene }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [12, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s = interpolate(f, [12, 36], [0.86, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 110px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 64, alignItems: "center", width: "100%" }}>
        <TextBlock scene={scene} align="left" />
        <div style={{ opacity: o, transform: `scale(${s})` }}>
          <div style={{ width: 390, height: 500, borderRadius: 34, overflow: "hidden", border: `4px solid ${scene.accent}`, boxShadow: `0 28px 90px ${scene.accent}33` }}>
            <Img src={staticFile("images/hanxu-teacher.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ color: "#fff", fontSize: 34, fontWeight: 900, textAlign: "center", marginTop: 22 }}>{data.teacherName}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CoursePromo: React.FC<{ data: CoursePromoData }> = ({ data }) => (
  <AbsoluteFill style={{ backgroundColor: "#020617", fontFamily }}>
    <Audio src={staticFile(`audio/promos/${data.id}.mp3`)} />
    {data.scenes.map((scene, i) => (
      <Sequence key={scene.id} from={sceneStart(data.scenes, i)} durationInFrames={scene.durationInFrames}>
        <AbsoluteFill style={{ fontFamily }}>
          <AbsoluteFill style={{ backgroundColor: "#020617" }} />
          {(scene.layout === "split") ? (
            <SplitScene data={data} scene={scene} />
          ) : (scene.layout === "teacher") ? (
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "390px 1fr", gap: 70, alignItems: "center", width: "100%", maxWidth: 1350, padding: "0 110px" }}>
                <div style={{ width: 390, height: 500, borderRadius: 34, overflow: "hidden", border: `4px solid ${scene.accent}`, boxShadow: `0 28px 90px ${scene.accent}33` }}>
                  <Img src={staticFile("images/hanxu-teacher.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <TextBlock scene={{ ...scene, kicker: data.teacherRole, headline: data.teacherName }} align="left" />
              </div>
            </AbsoluteFill>
          ) : (scene.layout === "quote") ? (
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <div style={{ textAlign: "center", maxWidth: 1280, padding: "0 90px" }}>
                <div style={{ color: scene.accent, fontSize: 34, fontWeight: 900, marginBottom: 34 }}>{scene.kicker}</div>
                <div style={{ color: "#fff", fontSize: 86, lineHeight: 1.16, fontWeight: 900, textShadow: "0 8px 32px rgba(0,0,0,0.58)" }}>{scene.headline}</div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 40, lineHeight: 1.42, fontWeight: 650, marginTop: 30 }}>{scene.subline}</div>
              </div>
            </AbsoluteFill>
          ) : (
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <TextBlock scene={scene} />
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      </Sequence>
    ))}
  </AbsoluteFill>
);

export { CoursePromo };
