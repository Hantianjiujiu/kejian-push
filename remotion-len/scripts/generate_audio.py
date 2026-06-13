#!/usr/bin/env python3
"""Generate TTS audio files for each video segment using edge-tts."""
import asyncio
import json
import os
import edge_tts

AUDIO_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")

# Voice configuration - use a natural Chinese female voice
VOICE = "zh-CN-XiaoxiaoNeural"  # Clear, natural female Chinese voice
# Alternative voices: zh-CN-YunxiNeural (male), zh-CN-XiaoyiNeural (female)

segments = [
    {
        "id": "seg01",
        "text": "永远不怕失业的能力，代总序。",
        "image": "01"
    },
    {
        "id": "seg02",
        "text": "大家好，我是韩旭老师。今天我们开始实务领导力系列课程的学习。课程的主要目的是：让你摆脱职场的焦虑，掌握领导者必备的能力，从而实现快速晋升，早日加入百万年薪的队伍。让你在风华正茂、精力充沛的年龄走到领导的岗位，不为自己的人生留下任何的遗憾。",
        "image": "02"
    },
    {
        "id": "seg03",
        "text": "在当前的经济环境下，身处后数字化转型时代，科技、人文乃至社会格局都在快速地变化，尤其ChatGPT、DeepSeek等AI技术的突飞猛进，使得很多行业面临着颠覆性的改变。就业、失业成为了全社会无法逃避的风险。那么，我们如何来应对呢？",
        "image": "03"
    },
    {
        "id": "seg04",
        "text": "现在世界公认的、有前景可以抵抗失业风险的能力，一共有两大种类：一种是专业的技术能力，例如跨领域的技术创新能力、统筹全局的决策架构能力、高层次的体验策略设计能力等等。虽然技术会不断地更新，但是用技术解决问题的底层逻辑不会改变。同时，无论AI发展到什么程度，专业技术人员进行人机交互的核心能力、以及为AI设定方向和策略的底线逻辑是长期不会改变的。这就是第一种能力，即专业的技术能力，如果你是一个理工科的技术控，那么踩准上述的专业技术路线，你就不会掉队。",
        "image": "04"
    },
    {
        "id": "seg05",
        "text": "第二种能力是人性化相关的能力，例如危机公关方面、心理咨询方面等复杂人际关系的处理能力，还有战略预见力、哲学思考能力、创意与艺术相关的能力等等。人的本质是个体与共同体的高度统一，是一切社会关系的总和。大多数时候，你不可能脱离集体而独立存在，你需要与他人合作共同解决问题。所以这种人性化能力也被称为无法被AI代替的能力。",
        "image": "05"
    },
    {
        "id": "seg06",
        "text": "这种能力最突出的代表就是领导力！这就是我们这堂课的核心思想：拥有了领导力，你就拥有了永远不怕失业的能力。",
        "image": "06"
    },
    {
        "id": "seg07",
        "text": "领导力世界排名第一的教育组织：美国的创新领导力中心，简称CCL提出，领导力本质上是一种影响他人的社会过程，领导者就是带给他人光明和希望的人。那么我希望你，在学完这套课程，通过实践拥有了领导力，实现了自己快速升职加薪的愿望，这时候不要忘记了学习领导力的初衷：要带给他人光明和希望，带领你的团队走向成功。",
        "image": "07"
    },
    {
        "id": "seg08",
        "text": "人生，没有专属的路线图，但是你要有前进的指南针！",
        "image": "08"
    },
    {
        "id": "seg09",
        "text": "每个人的人生都是不同的，你走过的路、经历过的事，只属于你自己，你的人生只有你自己来把握，没有任何人能绘制出专属于你的路线图。但是大多数人的一生都会遵循一定规律。我们暂且把这个规律称为人生的趋势图。面对大多数人出生、成长、衰老、死亡的必然趋势，我们要在短暂的一生走出自己的辉煌，这的确需要你把握住人生的趋势，拥有一个可以随时校正方向的指南针。",
        "image": "09"
    },
    {
        "id": "seg10",
        "text": "我们的课程就是这样一个关键时期的指南针，我们将循序渐进的教授你，如何拥有领导力，如何实现快速晋升成为人生的赢家。",
        "image": "10"
    },
    {
        "id": "seg11",
        "text": "这套课程共有：认识自我、改变自我、领导他人、领导团队、自由人生等五个部分。主要面对有意改变自己想成为领导者，以及亟待提高领导能力的新晋管理者。如果你入职几年都没有得到晋升、或者刚刚晋升不知所措不知道如何做一个成功的领导者、亦或者你刚刚步入职场想少走一些弯路。那么请认真学完这套课程，只要听话照做，勇于实践，你就能在短时间内拿到自己想要的结果。",
        "image": "11"
    },
    {
        "id": "seg12",
        "text": "被誉为领导力开发圣经的《领导梯队》一书的作者拉姆查兰，为我们精确的描述了职场中领导力发展的六个阶段。我们的这套课程主要针对从管理自我到管理他人，和从管理他人到管理经理人员这两个阶段的系统学习。这两个阶段最重要的是完成员工到一线经理的跃升。通常意义上的升职加薪，基本指的就是这个阶段，也是你职业生涯最重要的阶段。",
        "image": "12"
    },
    {
        "id": "seg13",
        "text": "从员工到管理者的身份转变，对你的一生具有非常重要的意义。意味着你的思维方式、认知层次、组织能力、决策能力、协调能力等等各方面都要重新塑造和提高。同时，随着你的职务不断跃升，收入的逐步提高，你掌握的社会资源会越来越多。身份的转变也会给你带来家庭以及社会地位的转变。你会慢慢理解并融入到各种管理精英的圈子。而这一切都需要从你学会、用好领导力的各种能力开始。",
        "image": "13"
    },
    {
        "id": "seg14",
        "text": "通过这套课程的学习，可以帮你用科学的方法重新认识自我，用发展的思维梳理自己的成长路径，快速掌握成为领导者各阶段必备的能力，轻松完成自己的职业发展规划，实现职业生涯的腾飞。好！序言就到这里！预祝大家尽快拿到自己想要的结果。",
        "image": "14"
    }
]

async def generate_segment(seg: dict):
    """Generate audio file for a single segment."""
    os.makedirs(AUDIO_DIR, exist_ok=True)
    filename = f"{seg['id']}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)

    if os.path.exists(filepath):
        print(f"  already exists: {filename}")
        return seg["id"], seg["text"], filename

    print(f"  generating: {filename}")
    communicate = edge_tts.Communicate(seg["text"], VOICE)
    await communicate.save(filepath)
    print(f"  done: {filename}")
    return seg["id"], seg["text"], filename

async def main():
    print(f"Generating {len(segments)} audio segments to {AUDIO_DIR}")
    print(f"Voice: {VOICE}")

    tasks = [generate_segment(seg) for seg in segments]
    results = await asyncio.gather(*tasks)

    # Build timing manifest
    manifest = []
    for seg_id, text, filename in results:
        manifest.append({
            "id": seg_id,
            "text": text,
            "audioFile": filename,
            "image": next(s["image"] for s in segments if s["id"] == seg_id)
        })

    manifest_path = os.path.join(AUDIO_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\nAll done! Manifest saved to {manifest_path}")

if __name__ == "__main__":
    asyncio.run(main())
