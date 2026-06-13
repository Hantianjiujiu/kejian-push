export interface Company {
  name: string;
  shortName: string;
  color: string;
  glowColor: string;
}

export interface QuarterlyDataPoint {
  year: number;
  quarter: number;
  ali: number;
  tencent: number;
  huawei: number;
}

export interface KeyEvent {
  startFrame: number;
  text: string;
}

export interface Chapter {
  year: number;
  startFrame: number;
  durationInFrames: number;
}

export const FPS = 30;
