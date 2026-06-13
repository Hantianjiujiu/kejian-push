# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — Start Remotion Studio (dev server with preview) at src/index.ts
- `npm run build` — Render the final video (`remotion render src/index.ts CourseIntro`)
- `npm run gen-audio` — Generate TTS audio files via Python (uses edge-tts)
- `npx tsc --noEmit` — Type-check the project without emitting files

## Project Structure

- `src/index.ts` — Entry point, calls `registerRoot(RemotionRoot)`
- `src/Root.tsx` — Registers the `CourseIntro` composition (2560×1440) and a `CourseIntroPreview` composition (1280×720) for faster preview
- `src/CourseIntro/` — Core video component
  - `index.tsx` — Main React component rendering background images, audio, and animated subtitles via Remotion `<Sequence>`s
  - `manifest.ts` — Content manifest defining 14 video segments with text, audio file references, image timing, and durations (in seconds)
  - `types.ts` — TypeScript types: `Segment` (id, text, audioFile, duration, images, imageTiming) and `ImageTiming` (image, startTime, endTime)
- `scripts/generate_audio.py` — Uses edge-tts (zh-CN-XiaoxiaoNeural voice) to generate Chinese narration MP3s for each segment
- `public/audio/` — Generated audio files (seg01.mp3–seg14.mp3) and a `manifest.json` with duration metadata
- `public/images/` — Background images (01.png–21.png) displayed per segment
- `remotion.config.ts` — Sets JPEG output format, overwrite on, and Chrome headless browser path

## Architecture

The video is a single `CourseIntro` component using nested `<Sequence>` components to layer three tracks per segment:

1. **Background images** — Each segment has `imageTiming` entries mapping images to start/end times (in seconds). Images are displayed via `<Img>` inside nested `<Sequence>`s.
2. **Audio** — Each segment plays its corresponding MP3 via `<Audio>` inside a `<Sequence>`.
3. **Subtitles** — Each segment renders a `SubtitleText` component inside a `<Sequence>`, with fade-in (10 frames) and fade-out (10 frames) opacity animation and a subtle translateY slide-up.

Segment durations in `manifest.ts` are defined in seconds. `Root.tsx` converts to frames at 30 FPS. The `startFrames` array is computed via `useMemo` to calculate absolute frame offsets for each segment.

The `remotion.config.ts` must set a custom browser executable path (Chrome headless shell) for rendering on this machine.
