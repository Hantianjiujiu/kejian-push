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
  useVideoConfig,
} from "remotion";
import { PromoScene, promoScenes } from "./data";

const fontFamily =
  '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';

const cumulativeStart = (index: number) =>
  promoScenes
    .slice(0, index)
    .reduce((sum, scene) => sum + scene.durationInFrames, 0);

const fitText = (text: string, large = false) => ({
  fontSize: large ? 88 : 42,
  lineHeight: 1.18,
  letterSpacing: "0.02em",
  fontWeight: 800,
  color: "#fff",
  textShadow: "0 8px 32px rgba(0,0,0,0.55)",
});

const KeywordPills: React.FC<{
  keywords: string[];
  accent: string;
  startOffset?: number;
}> = ({ keywords, accent, startOffset = 0 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 18,
        marginTop: 34,
      }}
    >
      {keywords.map((keyword, index) => {
        const local = frame - startOffset - index * 8;
        const opacity = interpolate(local, [0, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(local, [0, 18], [24, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        return (
          <div
            key={keyword}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              padding: "13px 24px",
              borderRadius: 999,
              border: `2px solid ${accent}88`,
              background: `linear-gradient(135deg, ${accent}55, rgba(15,23,42,0.76))`,
              boxShadow: `0 0 30px ${accent}33`,
            }}
          >
            {keyword}
          </div>
        );
      })}
    </div>
  );
};

const BackgroundImage: React.FC<{ image: string; duration: number }> = ({
  image,
  duration,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [1.04, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, duration], [-18, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      <Img
        src={staticFile(`images/${image}.png`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${x}px)`,
          filter: "saturate(1.05) contrast(1.02)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(56,189,248,0.28), transparent 30%), linear-gradient(115deg, rgba(2,6,23,0.92) 0%, rgba(15,23,42,0.78) 48%, rgba(2,6,23,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const SceneText: React.FC<{ scene: PromoScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [0, 24], [46, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${y}px)`,
        textAlign: "center",
        maxWidth: 1280,
        padding: "0 80px",
      }}
    >
      {scene.kicker && (
        <div
          style={{
            display: "inline-block",
            color: scene.accent,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "0.12em",
            marginBottom: 26,
            padding: "8px 20px",
            borderRadius: 999,
            background: "rgba(15,23,42,0.7)",
            border: `1px solid ${scene.accent}88`,
          }}
        >
          {scene.kicker}
        </div>
      )}
      <div style={fitText(scene.headline, true)}>{scene.headline}</div>
      <div
        style={{
          marginTop: 26,
          color: "rgba(255,255,255,0.88)",
          fontSize: 42,
          lineHeight: 1.42,
          fontWeight: 600,
          textShadow: "0 6px 24px rgba(0,0,0,0.5)",
        }}
      >
        {scene.subline}
      </div>
      {scene.keywords && (
        <KeywordPills keywords={scene.keywords} accent={scene.accent} startOffset={18} />
      )}
    </div>
  );
};

const SplitOpening: React.FC<{ scene: PromoScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const photoOpacity = interpolate(frame, [12, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const photoScale = interpolate(frame, [12, 36], [0.86, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          alignItems: "center",
          width: "100%",
          gap: 70,
        }}
      >
        <div style={{ textAlign: "left" }}>
          {scene.kicker && (
            <div
              style={{
                color: scene.accent,
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "0.12em",
                marginBottom: 26,
              }}
            >
              {scene.kicker}
            </div>
          )}
          <div style={{ ...fitText(scene.headline, true), fontSize: 86 }}>
            {scene.headline}
          </div>
          <div
            style={{
              marginTop: 28,
              color: "rgba(255,255,255,0.86)",
              fontSize: 38,
              lineHeight: 1.45,
              fontWeight: 600,
            }}
          >
            {scene.subline}
          </div>
          {scene.keywords && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <KeywordPills keywords={scene.keywords} accent={scene.accent} startOffset={18} />
            </div>
          )}
        </div>

        <div
          style={{
            opacity: photoOpacity,
            transform: `scale(${photoScale})`,
            justifySelf: "center",
          }}
        >
          <div
            style={{
              width: 410,
              height: 500,
              borderRadius: 34,
              overflow: "hidden",
              border: `4px solid ${scene.accent}`,
              boxShadow: `0 28px 90px ${scene.accent}33`,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <Img
              src={staticFile("images/hanxu-teacher.jpg")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              marginTop: 22,
              textAlign: "center",
              color: "#fff",
              fontSize: 34,
              fontWeight: 800,
              textShadow: "0 4px 18px rgba(0,0,0,0.5)",
            }}
          >
            韩旭老师
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const QuoteScene: React.FC<{ scene: PromoScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const first = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const second = interpolate(frame, [36, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", padding: "0 90px" }}>
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 34,
            marginBottom: 34,
            fontWeight: 700,
          }}
        >
          {scene.kicker}
        </div>
        <div style={{ ...fitText(scene.headline, true), opacity: first }}>
          {scene.headline}
        </div>
        <div
          style={{
            ...fitText(scene.subline, true),
            color: scene.accent,
            marginTop: 30,
            opacity: second,
          }}
        >
          {scene.subline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PathScene: React.FC<{ scene: PromoScene }> = ({ scene }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <SceneText scene={scene} />
      {scene.keywords && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 120,
            right: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {scene.keywords.map((step, index) => {
            const local = frame - 36 - index * 12;
            const opacity = interpolate(local, [0, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <React.Fragment key={step}>
                <div
                  style={{
                    opacity,
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: 800,
                    padding: "18px 26px",
                    borderRadius: 20,
                    background: "rgba(15,23,42,0.78)",
                    border: `2px solid ${scene.accent}88`,
                  }}
                >
                  {step}
                </div>
                {index < scene.keywords!.length - 1 && (
                  <div
                    style={{
                      height: 3,
                      flex: 1,
                      margin: "0 14px",
                      background: `linear-gradient(90deg, ${scene.accent}, transparent)`,
                      opacity: 0.75,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};

const TeacherEndCard: React.FC<{ scene: PromoScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px",
      }}
    >
      <div
        style={{
          opacity: enter,
          display: "grid",
          gridTemplateColumns: "430px 1fr",
          gap: 70,
          alignItems: "center",
          width: "100%",
          maxWidth: 1360,
        }}
      >
        <div
          style={{
            width: 390,
            height: 500,
            borderRadius: 34,
            overflow: "hidden",
            border: `4px solid ${scene.accent}`,
            boxShadow: `0 28px 90px ${scene.accent}33`,
          }}
        >
          <Img
            src={staticFile("images/hanxu-teacher.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <div
            style={{
              color: scene.accent,
              fontSize: 34,
              fontWeight: 800,
              marginBottom: 20,
            }}
          >
            {scene.kicker}
          </div>
          <div style={fitText(scene.headline, true)}>{scene.headline}</div>
          <div
            style={{
              marginTop: 26,
              color: "rgba(255,255,255,0.88)",
              fontSize: 42,
              lineHeight: 1.45,
              fontWeight: 650,
            }}
          >
            {scene.subline}
          </div>
          {scene.keywords && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <KeywordPills keywords={scene.keywords} accent={scene.accent} startOffset={22} />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PromoSceneView: React.FC<{ scene: PromoScene }> = ({ scene }) => {
  const { fps } = useVideoConfig();
  const duration = scene.durationInFrames;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <BackgroundImage image={scene.image} duration={duration} />
      {scene.audioFile && <Audio src={staticFile(`audio/${scene.audioFile}`)} />}
      {scene.layout === "split" ? (
        <SplitOpening scene={scene} />
      ) : scene.layout === "quote" ? (
        <QuoteScene scene={scene} />
      ) : scene.layout === "path" ? (
        <PathScene scene={scene} />
      ) : scene.layout === "teacher" ? (
        <TeacherEndCard scene={scene} />
      ) : (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SceneText scene={scene} />
        </AbsoluteFill>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 8,
          width: `${(duration / (duration || fps)) * 100}%`,
          background: `linear-gradient(90deg, ${scene.accent}, transparent)`,
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};

const PrefacePromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", fontFamily }}>
      {promoScenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={cumulativeStart(index)}
          durationInFrames={scene.durationInFrames}
        >
          <PromoSceneView scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export default PrefacePromo;
