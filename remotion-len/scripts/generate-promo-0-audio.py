#!/usr/bin/env python3
"""
为代总序（promo-0）生成云健男声配音。
基于《永远不怕失业的能力》原文核心内容生成约 37 秒旁白。
输出: public/audio/promos/0.mp3
"""
import asyncio
import os
import edge_tts

REMOTION_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_OUT = os.path.join(REMOTION_DIR, "public", "audio", "promos")

VOICE = "zh-CN-YunjianNeural"
RATE = "+10%"

NARRATION = (
    "实务领导力系列课程，代总序。永远不怕失业的能力。"
    "在 AI 颠覆一切的时代，就业焦虑成为每个人都无法回避的问题。"
    "世界公认，唯一无法被 AI 替代的核心能力，就是领导力。"
    "韩旭老师将带你系统掌握认识自我、改变自我、领导他人、领导团队、人生升华，五大模块。"
    "帮你完成从员工到一线经理最关键的跃升，实现升职加薪和圈层突破。"
    "人生没有专属的路线图，但你要有前进的指南针。韩旭老师，等你来。"
)


async def synth():
    os.makedirs(AUDIO_OUT, exist_ok=True)
    out_path = os.path.join(AUDIO_OUT, "0.mp3")
    print(f"声线: {VOICE}")
    print(f"字数: {len(NARRATION)}")
    print(f"输出: {out_path}")
    for attempt in range(1, 4):
        try:
            communicate = edge_tts.Communicate(NARRATION, VOICE, rate=RATE)
            await communicate.save(out_path)
            print(f"完成 (attempt {attempt})")
            return
        except Exception as e:
            print(f"attempt {attempt} failed: {e}")
            if attempt < 3:
                await asyncio.sleep(2 ** attempt)
            else:
                raise


if __name__ == "__main__":
    asyncio.run(synth())
