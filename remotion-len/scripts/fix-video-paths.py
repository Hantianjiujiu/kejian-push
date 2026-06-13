"""
Update all promo data files to use absolute video paths instead of public/videos/.
This avoids copying ~22GB of video into the Remotion public directory.
"""
import os, glob

VIDEO_MAP = {
    '1-1': r'F:/kejian/视频课程/1-1 认识自我--人生趋势图：读懂规律 看透职场 极速跃迁(1080).mp4',
    '1-2': r'F:/kejian/视频课程/1-2认识自我--科学测评 洞悉天性 掌握人生.mp4',
    '2-1': r'F:/kejian/视频课程/2-1改变自我--三步打造不可替代的职场IP（第一部分）.mp4',
    '2-2': r'F:/kejian/视频课程/2-2 改变自我-三步打造不可替代的职场IP(第二部分).mp4',
    '2-3': r'F:/kejian/视频课程/2-3 改变自我---领导必备的5个能力（第一部分.mp4',
    '2-4': r'F:/kejian/视频课程/2-4 改变自我---领导必备的5个能力（第二部分）.mp4',
    '2-5': r'F:/kejian/视频课程/2-5 改变自我---领导必备的5个能力（第三部分）.mp4',
    '2-6': r'F:/kejian/视频课程/2-6 改变自我---领导必备的5个能力（第四部分）.mp4',
    '2-7': r'F:/kejian/视频课程/2-7 改变自我----成为领导者的先决条件.mp4',
    '2-8': r'F:/kejian/视频课程/2-8 改变自我----如何在4周内成为顶尖专家.mp4',
    '2-9': r'F:/kejian/视频课程/2-9 改变自我---给上司3个提拔你的理由.mp4',
    '2-10': r'F:/kejian/视频课程/2-10 改变自我----竞聘演讲晋升的"必争之地".mp4',
    '2-11': r'F:/kejian/视频课程/2-11 改变自我---一线经理快速晋级的私教课（第一部分）.mp4',
    '2-12': r'F:/kejian/视频课程/2-12 改变自我---一线经理快速晋级的私教课（第二部分）.mp4',
    '2-13': r'F:/kejian/视频课程/2-13 改变自我---一线经理快速晋级的私教课（第三部分）.mp4',
    '2-14': r'F:/kejian/视频课程/2-14 改变自我---领导的决策之道.mp4',
    '2-15': r'F:/kejian/视频课程/2-15 改变自我---快速找到自己的伯乐.mp4',
    '2-16': r'F:/kejian/视频课程/2-16 改变自我---持续晋升的职场暗逻辑.mp4',
    '2-17': r'F:/kejian/视频课程/2-17 改变自我----成为领导者的3大隐性基因（第一部分）.mp4',
    '2-18': r'F:/kejian/视频课程/2-18 改变自我----成为领导者的3大隐性基因（第二部分）.mp4',
    '2-19': r'F:/kejian/视频课程/2-19 改变自我--领导者精力充沛的能量管理 .mp4',
    '3-1': r'F:/kejian/视频课程/3-1 领导他人-一线经理 新官上任的三把火.mp4',
    '3-2': r'F:/kejian/视频课程/3-2 领导他人-新晋一线经理 快速上手秘笈.mp4',
    '3-3': r'F:/kejian/视频课程/3-3 领导他人----刘邦的用人管人之道 .mp4',
    '3-4': r'F:/kejian/视频课程/3-4 领导他人--职场铁律--关系利益化.mp4',
    '3-5': r'F:/kejian/视频课程/3-5-领导他人----1线经理的6大权力及应用.mp4',
    '3-6': r'F:/kejian/视频课程/3-6 领导他人--让人顺从的六大原理.mp4',
    '4-1': r'F:/kejian/视频课程/4-1 领导团队----领导在团队管理中的关键作用.mp4',
    '4-2': r'F:/kejian/视频课程/4-2 领导团队--人心所向的团队依赖 (1).mp4',
    '4-3': r'F:/kejian/视频课程/4-3 领导团队----决定你命运的超预期管理 .mp4',
    '4-4': r'F:/kejian/视频课程/4-4 领导团队----带领团队最有效的方法 .mp4',
    '4-5': r'F:/kejian/视频课程/4-5 领导团队----给你一个副部级的后台.mp4',
    '4-6': r'F:/kejian/视频课程/4-6 领导团队----领导者的终身成长--管理永无止境.mp4',
    '5-1': r'F:/kejian/视频课程/5 人生升华--范蠡的启示.mp4',
}

for f in sorted(glob.glob('src/CoursePromos/promo-*.ts')):
    cid = f.replace('src/CoursePromos\\promo-', '').replace('.ts', '')
    if cid not in VIDEO_MAP:
        print(f'SKIP {cid}: no video mapping')
        continue
    vid = VIDEO_MAP[cid]
    data = open(f, 'r', encoding='utf-8').read()
    data = data.replace(f'"videos/{cid}.mp4"', f'r"{vid}"')
    open(f, 'w', encoding='utf-8').write(data)
    print(f'Updated {cid}')

print('Done')
