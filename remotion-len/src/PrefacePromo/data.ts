export const PROMO_FPS = 30;

export type PromoScene = {
  id: string;
  durationInFrames: number;
  image: string;
  audioFile?: string;
  headline: string;
  subline: string;
  kicker?: string;
  keywords?: string[];
  accent: string;
  layout?: "center" | "split" | "quote" | "path" | "teacher";
};

export const promoScenes: PromoScene[] = [
  {
    id: "opening",
    durationInFrames: 101,
    image: "01",
    audioFile: "seg01.mp3",
    kicker: "实务领导力系列课程 · 代总序",
    headline: "永远不怕失业的能力",
    subline: "韩旭老师带你读懂职业关键期的成长指南针",
    keywords: ["领导力", "职业跃迁", "抗风险能力"],
    accent: "#fbbf24",
    layout: "split",
  },
  {
    id: "ai-risk",
    durationInFrames: 716,
    image: "04",
    audioFile: "seg03.mp3",
    kicker: "时代变化正在加速",
    headline: "AI浪潮下，失业风险无法回避",
    subline: "ChatGPT、DeepSeek 等技术突飞猛进，行业与岗位正在被重新定义。",
    keywords: ["AI技术突进", "行业重塑", "就业风险", "如何应对？"],
    accent: "#38bdf8",
    layout: "center",
  },
  {
    id: "leadership-answer",
    durationInFrames: 327,
    image: "11",
    audioFile: "seg06.mp3",
    kicker: "核心答案",
    headline: "领导力",
    subline: "就是永远不怕失业的能力",
    keywords: ["影响他人", "复杂协作", "创造希望"],
    accent: "#22c55e",
    layout: "center",
  },
  {
    id: "compass",
    durationInFrames: 151,
    image: "14",
    audioFile: "seg08.mp3",
    kicker: "人生趋势图",
    headline: "人生没有专属路线图",
    subline: "但你要有前进的指南针",
    keywords: ["看清趋势", "校正方向", "持续成长"],
    accent: "#f59e0b",
    layout: "quote",
  },
  {
    id: "course-promise",
    durationInFrames: 341,
    image: "17",
    audioFile: "seg10.mp3",
    kicker: "课程承诺",
    headline: "关键时期的职业指南针",
    subline: "循序渐进学习领导力，实现快速晋升，成为人生的赢家。",
    keywords: ["认识自我", "改变自我", "领导他人", "领导团队", "人生升华"],
    accent: "#a78bfa",
    layout: "path",
  },
  {
    id: "end-card",
    durationInFrames: 124,
    image: "21",
    kicker: "新知领导力合伙人",
    headline: "韩旭老师",
    subline: "用领导力，穿越职业焦虑。现在开始学习实务领导力课程。",
    keywords: ["摆脱焦虑", "掌握能力", "快速晋升"],
    accent: "#fbbf24",
    layout: "teacher",
  },
];

export const PROMO_DURATION_IN_FRAMES = promoScenes.reduce(
  (sum, scene) => sum + scene.durationInFrames,
  0
);
