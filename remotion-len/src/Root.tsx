import React from "react";
import { Composition } from "remotion";
import CourseIntro, { manifest } from "./CourseIntro";
import TechShowcase from "./TechShowcase";
import { techSegments, FPS } from "./TechShowcase/data";
import HanXuIntro from "./HanXuIntro";
import ClaudeCodeInstall from "./ClaudeCodeInstall";
import GitInstall from "./GitInstall";
import RecruitmentRace from "./RecruitmentRace";
import { TOTAL_DURATION } from "./RecruitmentRace/data";
import { FPS as RR_FPS } from "./RecruitmentRace/types";
import PrefacePromo from "./PrefacePromo";
import { PROMO_DURATION_IN_FRAMES, PROMO_FPS } from "./PrefacePromo/data";
import { CoursePromo, COURSE_PROMO_FPS } from "./CoursePromos/CoursePromo";

import { promo0, COURSE_PROMO_0_DURATION } from "./CoursePromos/promo-0";
import { promo11, COURSE_PROMO_1_1_DURATION } from "./CoursePromos/promo-1-1";
import { promo12, COURSE_PROMO_1_2_DURATION } from "./CoursePromos/promo-1-2";
import { promo21, COURSE_PROMO_2_1_DURATION } from "./CoursePromos/promo-2-1";
import { promo210, COURSE_PROMO_2_10_DURATION } from "./CoursePromos/promo-2-10";
import { promo211, COURSE_PROMO_2_11_DURATION } from "./CoursePromos/promo-2-11";
import { promo212, COURSE_PROMO_2_12_DURATION } from "./CoursePromos/promo-2-12";
import { promo213, COURSE_PROMO_2_13_DURATION } from "./CoursePromos/promo-2-13";
import { promo214, COURSE_PROMO_2_14_DURATION } from "./CoursePromos/promo-2-14";
import { promo215, COURSE_PROMO_2_15_DURATION } from "./CoursePromos/promo-2-15";
import { promo216, COURSE_PROMO_2_16_DURATION } from "./CoursePromos/promo-2-16";
import { promo217, COURSE_PROMO_2_17_DURATION } from "./CoursePromos/promo-2-17";
import { promo218, COURSE_PROMO_2_18_DURATION } from "./CoursePromos/promo-2-18";
import { promo219, COURSE_PROMO_2_19_DURATION } from "./CoursePromos/promo-2-19";
import { promo22, COURSE_PROMO_2_2_DURATION } from "./CoursePromos/promo-2-2";
import { promo23, COURSE_PROMO_2_3_DURATION } from "./CoursePromos/promo-2-3";
import { promo24, COURSE_PROMO_2_4_DURATION } from "./CoursePromos/promo-2-4";
import { promo25, COURSE_PROMO_2_5_DURATION } from "./CoursePromos/promo-2-5";
import { promo26, COURSE_PROMO_2_6_DURATION } from "./CoursePromos/promo-2-6";
import { promo27, COURSE_PROMO_2_7_DURATION } from "./CoursePromos/promo-2-7";
import { promo28, COURSE_PROMO_2_8_DURATION } from "./CoursePromos/promo-2-8";
import { promo29, COURSE_PROMO_2_9_DURATION } from "./CoursePromos/promo-2-9";
import { promo31, COURSE_PROMO_3_1_DURATION } from "./CoursePromos/promo-3-1";
import { promo32, COURSE_PROMO_3_2_DURATION } from "./CoursePromos/promo-3-2";
import { promo33, COURSE_PROMO_3_3_DURATION } from "./CoursePromos/promo-3-3";
import { promo34, COURSE_PROMO_3_4_DURATION } from "./CoursePromos/promo-3-4";
import { promo35, COURSE_PROMO_3_5_DURATION } from "./CoursePromos/promo-3-5";
import { promo36, COURSE_PROMO_3_6_DURATION } from "./CoursePromos/promo-3-6";
import { promo41, COURSE_PROMO_4_1_DURATION } from "./CoursePromos/promo-4-1";
import { promo42, COURSE_PROMO_4_2_DURATION } from "./CoursePromos/promo-4-2";
import { promo43, COURSE_PROMO_4_3_DURATION } from "./CoursePromos/promo-4-3";
import { promo44, COURSE_PROMO_4_4_DURATION } from "./CoursePromos/promo-4-4";
import { promo45, COURSE_PROMO_4_5_DURATION } from "./CoursePromos/promo-4-5";
import { promo46, COURSE_PROMO_4_6_DURATION } from "./CoursePromos/promo-4-6";
import { promo51, COURSE_PROMO_5_1_DURATION } from "./CoursePromos/promo-5-1";

const COURSE_FPS = 30;

const totalDurationInFrames = manifest.reduce(
  (sum: number, seg: any) => sum + Math.round(seg.duration * COURSE_FPS),
  0
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="CourseIntro" component={CourseIntro} durationInFrames={totalDurationInFrames} fps={COURSE_FPS} width={2560} height={1440} />
      <Composition id="CourseIntroPreview" component={CourseIntro} durationInFrames={totalDurationInFrames} fps={COURSE_FPS} width={1280} height={720} />
      <Composition id="TechShowcase" component={TechShowcase} durationInFrames={techSegments.reduce((sum: number, seg: any) => sum + Math.round(seg.duration * FPS), 0)} fps={FPS} width={2560} height={1440} />
      <Composition id="HanXuIntro" component={HanXuIntro} durationInFrames={300} fps={30} width={1280} height={720} />
      <Composition id="ClaudeCodeInstall" component={ClaudeCodeInstall} durationInFrames={420} fps={30} width={1280} height={720} />
      <Composition id="GitInstall" component={GitInstall} durationInFrames={390} fps={30} width={1280} height={720} />
      <Composition id="PrefacePromo" component={PrefacePromo} durationInFrames={PROMO_DURATION_IN_FRAMES} fps={PROMO_FPS} width={1920} height={1080} />
      <Composition id="PrefacePromoPreview" component={PrefacePromo} durationInFrames={PROMO_DURATION_IN_FRAMES} fps={PROMO_FPS} width={1280} height={720} />
      <Composition id="RecruitmentRace" component={RecruitmentRace} durationInFrames={TOTAL_DURATION} fps={RR_FPS} width={2560} height={1440} />
      <Composition id="RecruitmentRacePreview" component={RecruitmentRace} durationInFrames={TOTAL_DURATION} fps={RR_FPS} width={1280} height={720} />
      <Composition id="Promo-0" component={CoursePromo} durationInFrames={COURSE_PROMO_0_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo0 }} />
      <Composition id="Promo-0-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_0_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo0 }} />
      <Composition id="Promo-1-1" component={CoursePromo} durationInFrames={COURSE_PROMO_1_1_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo11 }} />
      <Composition id="Promo-1-1-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_1_1_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo11 }} />
      <Composition id="Promo-1-2" component={CoursePromo} durationInFrames={COURSE_PROMO_1_2_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo12 }} />
      <Composition id="Promo-1-2-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_1_2_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo12 }} />
      <Composition id="Promo-2-1" component={CoursePromo} durationInFrames={COURSE_PROMO_2_1_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo21 }} />
      <Composition id="Promo-2-1-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_1_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo21 }} />
      <Composition id="Promo-2-10" component={CoursePromo} durationInFrames={COURSE_PROMO_2_10_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo210 }} />
      <Composition id="Promo-2-10-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_10_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo210 }} />
      <Composition id="Promo-2-11" component={CoursePromo} durationInFrames={COURSE_PROMO_2_11_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo211 }} />
      <Composition id="Promo-2-11-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_11_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo211 }} />
      <Composition id="Promo-2-12" component={CoursePromo} durationInFrames={COURSE_PROMO_2_12_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo212 }} />
      <Composition id="Promo-2-12-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_12_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo212 }} />
      <Composition id="Promo-2-13" component={CoursePromo} durationInFrames={COURSE_PROMO_2_13_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo213 }} />
      <Composition id="Promo-2-13-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_13_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo213 }} />
      <Composition id="Promo-2-14" component={CoursePromo} durationInFrames={COURSE_PROMO_2_14_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo214 }} />
      <Composition id="Promo-2-14-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_14_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo214 }} />
      <Composition id="Promo-2-15" component={CoursePromo} durationInFrames={COURSE_PROMO_2_15_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo215 }} />
      <Composition id="Promo-2-15-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_15_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo215 }} />
      <Composition id="Promo-2-16" component={CoursePromo} durationInFrames={COURSE_PROMO_2_16_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo216 }} />
      <Composition id="Promo-2-16-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_16_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo216 }} />
      <Composition id="Promo-2-17" component={CoursePromo} durationInFrames={COURSE_PROMO_2_17_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo217 }} />
      <Composition id="Promo-2-17-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_17_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo217 }} />
      <Composition id="Promo-2-18" component={CoursePromo} durationInFrames={COURSE_PROMO_2_18_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo218 }} />
      <Composition id="Promo-2-18-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_18_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo218 }} />
      <Composition id="Promo-2-19" component={CoursePromo} durationInFrames={COURSE_PROMO_2_19_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo219 }} />
      <Composition id="Promo-2-19-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_19_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo219 }} />
      <Composition id="Promo-2-2" component={CoursePromo} durationInFrames={COURSE_PROMO_2_2_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo22 }} />
      <Composition id="Promo-2-2-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_2_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo22 }} />
      <Composition id="Promo-2-3" component={CoursePromo} durationInFrames={COURSE_PROMO_2_3_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo23 }} />
      <Composition id="Promo-2-3-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_3_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo23 }} />
      <Composition id="Promo-2-4" component={CoursePromo} durationInFrames={COURSE_PROMO_2_4_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo24 }} />
      <Composition id="Promo-2-4-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_4_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo24 }} />
      <Composition id="Promo-2-5" component={CoursePromo} durationInFrames={COURSE_PROMO_2_5_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo25 }} />
      <Composition id="Promo-2-5-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_5_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo25 }} />
      <Composition id="Promo-2-6" component={CoursePromo} durationInFrames={COURSE_PROMO_2_6_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo26 }} />
      <Composition id="Promo-2-6-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_6_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo26 }} />
      <Composition id="Promo-2-7" component={CoursePromo} durationInFrames={COURSE_PROMO_2_7_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo27 }} />
      <Composition id="Promo-2-7-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_7_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo27 }} />
      <Composition id="Promo-2-8" component={CoursePromo} durationInFrames={COURSE_PROMO_2_8_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo28 }} />
      <Composition id="Promo-2-8-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_8_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo28 }} />
      <Composition id="Promo-2-9" component={CoursePromo} durationInFrames={COURSE_PROMO_2_9_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo29 }} />
      <Composition id="Promo-2-9-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_2_9_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo29 }} />
      <Composition id="Promo-3-1" component={CoursePromo} durationInFrames={COURSE_PROMO_3_1_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo31 }} />
      <Composition id="Promo-3-1-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_3_1_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo31 }} />
      <Composition id="Promo-3-2" component={CoursePromo} durationInFrames={COURSE_PROMO_3_2_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo32 }} />
      <Composition id="Promo-3-2-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_3_2_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo32 }} />
      <Composition id="Promo-3-3" component={CoursePromo} durationInFrames={COURSE_PROMO_3_3_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo33 }} />
      <Composition id="Promo-3-3-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_3_3_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo33 }} />
      <Composition id="Promo-3-4" component={CoursePromo} durationInFrames={COURSE_PROMO_3_4_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo34 }} />
      <Composition id="Promo-3-4-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_3_4_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo34 }} />
      <Composition id="Promo-3-5" component={CoursePromo} durationInFrames={COURSE_PROMO_3_5_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo35 }} />
      <Composition id="Promo-3-5-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_3_5_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo35 }} />
      <Composition id="Promo-3-6" component={CoursePromo} durationInFrames={COURSE_PROMO_3_6_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo36 }} />
      <Composition id="Promo-3-6-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_3_6_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo36 }} />
      <Composition id="Promo-4-1" component={CoursePromo} durationInFrames={COURSE_PROMO_4_1_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo41 }} />
      <Composition id="Promo-4-1-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_4_1_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo41 }} />
      <Composition id="Promo-4-2" component={CoursePromo} durationInFrames={COURSE_PROMO_4_2_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo42 }} />
      <Composition id="Promo-4-2-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_4_2_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo42 }} />
      <Composition id="Promo-4-3" component={CoursePromo} durationInFrames={COURSE_PROMO_4_3_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo43 }} />
      <Composition id="Promo-4-3-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_4_3_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo43 }} />
      <Composition id="Promo-4-4" component={CoursePromo} durationInFrames={COURSE_PROMO_4_4_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo44 }} />
      <Composition id="Promo-4-4-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_4_4_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo44 }} />
      <Composition id="Promo-4-5" component={CoursePromo} durationInFrames={COURSE_PROMO_4_5_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo45 }} />
      <Composition id="Promo-4-5-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_4_5_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo45 }} />
      <Composition id="Promo-4-6" component={CoursePromo} durationInFrames={COURSE_PROMO_4_6_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo46 }} />
      <Composition id="Promo-4-6-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_4_6_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo46 }} />
      <Composition id="Promo-5-1" component={CoursePromo} durationInFrames={COURSE_PROMO_5_1_DURATION} fps={COURSE_PROMO_FPS} width={1920} height={1080} defaultProps={{ data: promo51 }} />
      <Composition id="Promo-5-1-Preview" component={CoursePromo} durationInFrames={COURSE_PROMO_5_1_DURATION} fps={COURSE_PROMO_FPS} width={1280} height={720} defaultProps={{ data: promo51 }} />
    </>
  );
};
