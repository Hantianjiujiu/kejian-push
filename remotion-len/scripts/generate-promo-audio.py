#!/usr/bin/env python3
"""
为 34 条课程宣传片生成成熟男声配音 (zh-CN-YunzeNeural)。
基于课程目录总览中的真实标题，为每个课程编写连贯、有吸引力的旁白。
输出: public/audio/promos/{id}.mp3
"""
import asyncio
import os
import edge_tts

REMOTION_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_OUT = os.path.join(REMOTION_DIR, "public", "audio", "promos")

VOICE = "zh-CN-YunjianNeural"  # 磁性有力男声，体育解说风格，成熟有魅力
RATE = "+10%"

MODULES = {
    1: "认识自我",
    2: "改变自我",
    3: "领导他人",
    4: "领导团队",
    5: "人生升华",
}

# 从课程目录总览提取的真实课程标题
REAL_TITLES = {
    "1-1": "人生趋势图：读懂规律，看透职场，极速跃迁",
    "1-2": "科学测评，洞悉天性，掌握人生",
    "2-1": "三步打造不可替代的职场IP",
    "2-2": "三步打造不可替代的职场IP",
    "2-3": "领导必备的5个能力",
    "2-4": "领导必备的5个能力",
    "2-5": "领导必备的5个能力",
    "2-6": "领导必备的5个能力",
    "2-7": "成为领导者的先决条件",
    "2-8": "如何在4周内成为顶尖专家",
    "2-9": "给上司3个提拔你的理由",
    "2-10": "竞聘演讲晋升的必争之地",
    "2-11": "一线经理快速晋级的私教课",
    "2-12": "一线经理快速晋级的私教课",
    "2-13": "一线经理快速晋级的私教课",
    "2-14": "领导的决策之道",
    "2-15": "快速找到自己的伯乐",
    "2-16": "持续晋升的职场暗逻辑",
    "2-17": "成为领导者的3大隐性基因",
    "2-18": "成为领导者的3大隐性基因",
    "2-19": "领导者精力充沛的能量管理",
    "3-1": "一线经理新官上任的三把火",
    "3-2": "新晋一线经理快速上手秘笈",
    "3-3": "刘邦的用人管人之道",
    "3-4": "职场铁律——关系利益化",
    "3-5": "一线经理的6大权力及应用",
    "3-6": "让人顺从的六大原理",
    "4-1": "领导在团队管理中的关键作用",
    "4-2": "人心所向的团队依赖",
    "4-3": "决定你命运的超预期管理",
    "4-4": "带领团队最有效的方法",
    "4-5": "给你一个副部级的后台",
    "4-6": "领导者的终身成长——管理永无止境",
    "5-1": "范蠡的启示：从历史中读懂人生智慧",
}

# 每个课程的独特钩子文案（第二段，约 20-25 字，口语化有吸引力）
HOOKS = {
    "1-1": "你知道吗，人的一生其实暗藏着一条可以预测的趋势曲线。",
    "1-2": "你真的了解自己吗？科学测评，帮你揭开天性的秘密。",
    "2-1": "想在职场脱颖而出？你的个人IP，就是最好的名片。",
    "2-2": "IP打造的第二阶段，让你的品牌真正深入人心。",
    "2-3": "领导力不是天生的，五个核心能力，你也可以一步步掌握。",
    "2-4": "五个能力的第二部分，深入拆解每一个必备的领导技能。",
    "2-5": "五个能力的第三部分，把这些能力内化成你的本能。",
    "2-6": "五个能力的最后篇章，完成从普通员工到领导者的蜕变。",
    "2-7": "在成为领导者之前，有些条件是必须先具备的。",
    "2-8": "四周时间，从零到一，成为团队里不可或缺的顶尖专家。",
    "2-9": "想让上司看到你的价值？三个理由，让他不得不提拔你。",
    "2-10": "竞聘演讲，是你职场晋升最关键的一场战斗。",
    "2-11": "一线经理的实战私教课，第一部分，帮你快速站稳脚跟。",
    "2-12": "私教课第二部分，继续深入，解决你每天面对的管理难题。",
    "2-13": "私教课第三部分，系统掌握一线经理的完整能力体系。",
    "2-14": "决策，是领导者每天都要面对的核心考验。",
    "2-15": "千里马常有，而伯乐不常有。我来教你怎么找到他。",
    "2-16": "职场晋升，除了明面上的规则，还有一套暗逻辑。",
    "2-17": "成为领导者，有三大隐性基因，看看你具备了几条。",
    "2-18": "隐性基因的第二部分，如何激活你身上的领袖潜质。",
    "2-19": "领导者的能量管理，决定了你能走多远。",
    "3-1": "新官上任，三把火怎么烧才能既立威又不树敌？",
    "3-2": "新晋一线经理，快速上手，少走弯路，直达核心。",
    "3-3": "刘邦一介布衣，凭什么驾驭群雄？用人管人的智慧全在这里。",
    "3-4": "职场里最残酷的真相——关系，本质上是利益的交换。",
    "3-5": "一线经理的六大权力，你知道几个？又用好了几个？",
    "3-6": "让人顺从，不是强迫，而是掌握了人性深处的六大原理。",
    "4-1": "领导在团队中到底扮演什么角色？答案可能和你想的不一样。",
    "4-2": "一个真正人心所向的团队，依赖的不是制度，而是信任。",
    "4-3": "超预期管理——决定你职业命运的关键思维。",
    "4-4": "带领团队最有效的方法，其实比你想象的简单。",
    "4-5": "如果你有一个副部级的后台，你会怎么用？其实你本来就有。",
    "4-6": "领导者的成长没有终点，管理是一门永无止境的艺术。",
    "5-1": "范蠡，从政客到商圣，他的人生智慧至今仍能照亮我们的路。",
}


def build_narration(cid: str) -> str:
    """生成约 150-170 字的连贯旁白，覆盖 37 秒。"""
    module_num = int(cid.split("-")[0])
    module = MODULES[module_num]
    title = REAL_TITLES.get(cid, "")
    hook = HOOKS.get(cid, "韩旭老师带你深入掌握这一关键主题。")
    lesson_num = cid.split("-")[1]

    # 5 段叙事结构对应：开场 5s / 钩子 10s / 价值 10s / 路径 8s / 结尾 4s
    seg1 = f"{module}第{lesson_num}节。{title}。"
    seg2 = f"{hook}"
    seg3 = "韩旭老师将带你系统拆解，把复杂的道理变成你可以直接使用的工具和方法。"
    seg4 = "从认知升级，到行为改变；从个人突破，到团队引领。这条路径，已经帮助无数人实现了职场的跃迁。"
    seg5 = "实务领导力课程。韩旭老师，等你来。"

    return seg1 + seg2 + seg3 + seg4 + seg5


async def synth_one(cid: str, narration: str, retries: int = 3):
    os.makedirs(AUDIO_OUT, exist_ok=True)
    out_path = os.path.join(AUDIO_OUT, f"{cid}.mp3")
    char_count = len(narration)
    for attempt in range(1, retries + 1):
        try:
            communicate = edge_tts.Communicate(narration, VOICE, rate=RATE)
            await communicate.save(out_path)
            print(f"  [{cid}] {char_count:3d} 字 -> done (attempt {attempt})")
            return
        except Exception as e:
            print(f"  [{cid}] attempt {attempt} failed: {e}")
            if attempt < retries:
                wait = 2 ** attempt
                print(f"  [{cid}] retrying in {wait}s...")
                await asyncio.sleep(wait)
            else:
                print(f"  [{cid}] GAVE UP after {retries} attempts")
                raise


async def main():
    # 按 promo 文件实际存在的顺序来
    PROMO_DIR = os.path.join(REMOTION_DIR, "src", "CoursePromos")
    promo_files = sorted(
        f for f in os.listdir(PROMO_DIR)
        if f.startswith("promo-") and f.endswith(".ts")
    )

    cids = []
    for fname in promo_files:
        cid = fname.replace("promo-", "").replace(".ts", "")
        cids.append(cid)

    print(f"发现 {len(cids)} 条课程宣传片")
    print(f"音频输出: {AUDIO_OUT}")
    print(f"声线: {VOICE}\n")

    for cid in cids:
        narration = build_narration(cid)
        print(f"  [{cid}] {REAL_TITLES.get(cid, '')}")
        await synth_one(cid, narration)
    print(f"\n全部完成！共 {len(cids)} 个音频文件。")


if __name__ == "__main__":
    asyncio.run(main())