# TechShowcase — 科技动感字幕展示动画设计

## 概述

在现有 Remotion 项目中新增一个独立 Composition `TechShowcase`，以矩阵/霓虹风格动画展示 1.txt 提炼内容，时长约 90 秒，分辨率 2560×1440，30fps。

## 内容分段

| # | 文本 | 时长 |
|---|------|------|
| 1 | 韩旭老师"实务领导力系列课程"代总序 | 8s (240f) |
| 2 | 在后数字化转型时代，AI技术飞速发展，就业失业成为全社会难以逃避的风险 | 12s (360f) |
| 3 | 抵抗失业风险的能力分两类：一是专业技术能力，底层逻辑不会改变 | 14s (420f) |
| 4 | 二是人性化能力，无法被AI替代。其中最突出的是领导力 | 14s (420f) |
| 5 | 拥有领导力，就拥有了永远不怕失业的能力 | 12s (360f) |
| 6 | 课程涵盖认识自我、改变自我、领导他人、领导团队、自由人生五部分 | 14s (420f) |
| 7 | 帮助学员完成职业转型，实现快速晋升 | 10s (300f) |

## 视觉效果

### 背景层（全时段）
- 纯黑底色 (#0a0a0f)
- 动态绿色网格线（水平+垂直，缓慢移动）
- 横向扫描线（从顶部到底部，持续循环）
- 随机绿色代码字符飘落（Matrix rain 效果）

### 字幕动画（每段独立）
每段文本经历三个阶段：
1. **进入（30% 时长）：** 文字逐字打出（typewriter），每个字带青色 (#00ff88) 发光 glow，text-shadow 多层叠加
2. **停留（40% 时长）：** 文字全部显示，增加 pulse 呼吸光效
3. **退出（30% 时长）：** 文字故障闪烁（glitch）后渐隐消散

### 字体
- 中文字体：`"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif`
- 英文字体装饰：`"Courier New", monospace`（用于代码风格装饰字符）

## 技术实现

### 新增文件
- `src/TechShowcase/index.tsx` — 主组件
- `src/TechShowcase/types.ts` — 类型定义（Segment 数据结构）
- `src/TechShowcase/Background.tsx` — 背景层（网格 + 扫描线 + Matrix rain）
- `src/TechShowcase/TypewriterText.tsx` — 打字机 + glow + glitch 效果组件

### 修改文件
- `src/Root.tsx` — 注册新的 TechShowcase Composition

### 组件树
```
TechShowcase
├── Background (网格 + 扫描线 + Matrix rain)
└── Sequence (对各段)
    └── TypewriterText (打字机 + glow + glitch)
```

### 关键实现细节
- typewriter 效果：使用 `useCurrentFrame()` 计算当前显示到第几个字
- glow 效果：多层 text-shadow 叠加，随帧呼吸变化
- glitch 退出：随机偏移 RGB 通道 + clip 切片，持续约 15 帧
- Matrix rain：自定义 hook，生成随机下降的代码字符
- 扫描线：CSS 渐变条纹 + `@keyframes` 垂直移动

## 复杂度评估

中等复杂度。新增 4 个组件文件，修改 1 个文件。纯视觉组件，无数据 IO 或外部依赖。
