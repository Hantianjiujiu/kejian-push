"""
Generate CoursePromo data files for all remaining 34 courses.
Reads each markdown, extracts key info, matches video file, writes TS data file.
Run: python scripts/generate-promos.py
"""
import os, re, glob, hashlib

REMOTION_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD_DIR = os.path.join(REMOTION_DIR, "..", "课件文档-md")
VIDEO_DIR = os.path.join(REMOTION_DIR, "..", "视频课程")
OUT_DIR = os.path.join(REMOTION_DIR, "src", "CoursePromos")
PUBLIC_VIDEOS = os.path.join(REMOTION_DIR, "public", "videos")

MODULE_NAMES = {
    1: "认识自我",
    2: "改变自我",
    3: "领导他人",
    4: "领导团队",
    5: "人生升华",
}

MODULE_COLORS = {
    1: "#38bdf8",
    2: "#22c55e",
    3: "#a78bfa",
    4: "#f97316",
    5: "#fbbf24",
}

def parse_course_id(basename):
    """Parse 'X-Y' or 'X Y' or '5  ...' to (module, lesson) or None."""
    b = basename.replace('.md', '')
    m = re.match(r'^(\d+)[-\s]+(\d+)', b)
    if m:
        return int(m.group(1)), int(m.group(2))
    m = re.match(r'^5\s', b)
    if m:
        return 5, 1
    return None

def parse_md(filepath):
    """Read md and return dict with title, key points, etc."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    lines = text.strip().split('\n')
    # Remove base64 images and __markers__
    clean_lines = [l for l in lines if not l.startswith('![') and not l.startswith('data:')]
    clean = '\n'.join(clean_lines)
    clean = re.sub(r'__.+?__', '', clean)
    clean = re.sub(r'\\-\\-\\-\\-', '—', clean)
    clean = re.sub(r'\\-\\-', '—', clean)
    clean = re.sub(r'#{1,6}\s+', '', clean)
    return clean

def extract_title_safe(raw, cid):
    """Approximate kebab-like safe title segment."""
    parts = raw.split('—')
    if len(parts) > 1:
        title = parts[-1].strip()
    else:
        title = raw.strip()
    title = re.sub(r'[（(].*?[）)]', '', title)
    title = title.strip()
    if len(title) > 40:
        title = title[:40]
    return title or f"第{cid[1]}节"

def extract_subtitle(raw, cid):
    """Find short description line."""
    lines = [l.strip() for l in raw.split('\n') if l.strip() and len(l) > 5]
    for line in lines[:8]:
        if '—' in line or '——' in line:
            parts = re.split(r'[—]{1,2}', line)
            for p in parts[1:]:
                p = p.strip()
                if 4 < len(p) < 60:
                    return p
    for line in lines[2:8]:
        line = re.sub(r'[（(].*?[）)]', '', line)
        line = line.strip()
        if 6 < len(line) < 60:
            return line
    return f"模块{cid[0]}第{cid[1]}节"

def extract_tags(raw, title):
    """Return 3-5 keywords found in text."""
    tags = set()
    patterns = [
        r'(领导力|晋升|跃迁|职场|趋势|规律|指南针|能力|团队|管理|认知|改变|成长|目标|规划|决策|沟通|关系|权力|高效|关键|核心|先决|必备|快速|突破|逆袭|秘密|密码|暗逻辑|能量|终身|长远|持久|战略|战术|机会|命运|智慧|启示|榜样|性格|天性|测评|趋势图|曲线|赛道|布局|专注|少则得|多则惑|25岁|35岁|47岁|机会|运气|规律|认识|自我)',
    ]
    for p in patterns:
        found = re.findall(p, raw)
        for f in found:
            if f not in title:
                tags.add(f)
    return list(tags)[:4] if tags else ["职场", "领导力", "晋升"]

def match_video(cid):
    """Find matching video file in VIDEO_DIR by prefix."""
    all_videos = os.listdir(VIDEO_DIR)
    prefix = f"{cid[0]}-{cid[1]}"
    for v in all_videos:
        if v.startswith(prefix) and v.endswith('.mp4'):
            return os.path.join(VIDEO_DIR, v)
    # try alternate prefix (e.g. 5 → "5 人生...")
    prefix2 = f"{cid[0]} "
    for v in all_videos:
        if v.startswith(prefix2) and v.endswith('.mp4'):
            # ensure it's the right course (not 5-1 vs 5 anything)
            if cid == (5, 1) and '范蠡' in v:
                return os.path.join(VIDEO_DIR, v)
    return None

def generate_scenes(title, subtitle, tags, module_idx, cid_str):
    """Generate 5 standard promo scenes for a generic course."""
    module = MODULE_NAMES[module_idx]
    accent = MODULE_COLORS.get(module_idx, "#38bdf8")
    scenes = [
        {
            "id": "opening",
            "durationInFrames": 150,
            "kicker": f"{module} · 第{cid_str.split('-')[-1]}节",
            "headline": title,
            "subline": subtitle,
            "keywords": tags[:3] if tags else ["职场跃迁"],
            "accent": accent,
            "videoStartSeconds": 0,
            "layout": "split",
        },
        {
            "id": "point1",
            "durationInFrames": 300,
            "kicker": "核心内容",
            "headline": title,
            "subline": f"深入学习{module}关键知识点，系统掌握{tags[0] if tags else '核心'}能力。",
            "keywords": tags[:4] if tags else [],
            "accent": accent,
            "videoStartSeconds": 120,
            "layout": "center",
        },
        {
            "id": "point2",
            "durationInFrames": 300,
            "kicker": "重点掌握",
            "headline": "学完这一节",
            "subline": f"你将获得{module}的核心方法论，具备实用的{tags[0] if tags else '职场'}技能。",
            "keywords": tags[:4] if tags else [],
            "accent": accent,
            "videoStartSeconds": 330,
            "layout": "center",
        },
        {
            "id": "path",
            "durationInFrames": 240,
            "kicker": "课程路径",
            "headline": "从认识到实践",
            "subline": f"加入实务领导力课程，系统学习{module}，逐步构建你的职场竞争力。",
            "keywords": ["认识自我", "改变自我", "领导他人", "领导团队"],
            "accent": accent,
            "videoStartSeconds": 520,
            "layout": "path",
        },
        {
            "id": "end",
            "durationInFrames": 120,
            "kicker": "实务领导力课程",
            "headline": "韩旭老师",
            "subline": f"系统学习{module}，打造不可替代的职场竞争力。",
            "keywords": ["现在开始学习", "掌握领导力"],
            "accent": "#fbbf24",
            "videoStartSeconds": 680,
            "layout": "teacher",
        },
    ]
    return scenes

def write_promo_ts(data):
    """Write per-course TS data file."""
    cid = data["cid"]
    cid_str = data["cid_str"]  # e.g. "1-2"
    varname = f"promo{cid_str.replace('-', '')}"
    filename = f"promo-{cid_str}.ts"
    filepath = os.path.join(OUT_DIR, filename)
    scenes = data["scenes"]
    total_frames = sum(s["durationInFrames"] for s in scenes)
    title_esc = data["title"].replace('"', '\\"')
    subtitle_esc = data["subtitle"].replace('"', '\\"')
    module_name = MODULE_NAMES.get(data["module"], "未知")
    tag_str = ", ".join([f'"{t}"' for t in data.get("tags", [])])
    vid_file = f"videos/{cid_str}.mp4"

    scenes_ts = "[\n"
    for s in scenes:
        kw = ", ".join([f'"{k}"' for k in s.get("keywords", [])])
        scenes_ts += f"""    {{
      id: "{s['id']}",
      durationInFrames: {s['durationInFrames']},
      kicker: "{s.get('kicker','')}",
      headline: "{s['headline']}",
      subline: "{s['subline']}",
      keywords: [{kw}],
      accent: "{s['accent']}",
      videoStartSeconds: {s.get('videoStartSeconds',0)},
      layout: "{s.get('layout','center')}",
    }},\n"""
    scenes_ts += "  ]"

    ts_content = f"""import {{ CoursePromoData }} from "./CoursePromo";

export const {varname}: CoursePromoData = {{
  id: "{cid_str}",
  title: "{title_esc}",
  module: "{module_name} · 第 {cid_str.split('-')[-1]} 节",
  teacherName: "韩旭老师",
  teacherRole: "新知领导力合伙人",
  videoFile: "{vid_file}",
  scenes: {scenes_ts}
}};

export const COURSE_PROMO_{cid_str.replace('-', '_')}_DURATION = {total_frames};
"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    return varname, f"COURSE_PROMO_{cid_str.replace('-', '_')}_DURATION", total_frames

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(PUBLIC_VIDEOS, exist_ok=True)
    md_files = [f for f in os.listdir(MD_DIR) if f.endswith('.md') and not f.startswith('00') and not f.startswith('~')]

    registrations = []
    for mdf in sorted(md_files):
        cid = parse_course_id(mdf)
        if not cid:
            print(f"SKIP cannot parse: {mdf}")
            continue
        module_idx, lesson_idx = cid
        if module_idx == 5 and lesson_idx == 1 and "范蠡" in mdf:
            cid_str = "5-1"
        else:
            cid_str = f"{module_idx}-{lesson_idx}"

        print(f"Processing {cid_str}: {mdf}")
        raw = parse_md(os.path.join(MD_DIR, mdf))
        title = extract_title_safe(raw, cid)
        subtitle = extract_subtitle(raw, cid)
        tags = extract_tags(raw, title)
        # ensure at least 4 unique tags
        default_tags = {
            1: ["认识自我", "趋势图", "天性测评"],
            2: ["改变自我", "领导力", "晋升"],
            3: ["领导他人", "管理", "团队"],
            4: ["领导团队", "战略", "影响力"],
            5: ["人生升华", "智慧", "启示"],
        }
        if len(tags) < 3:
            tags = default_tags.get(module_idx, ["职场", "领导力"])
        scenes = generate_scenes(title, subtitle, tags, module_idx, cid_str)
        data = {
            "cid": cid,
            "cid_str": cid_str,
            "module": module_idx,
            "title": title,
            "subtitle": subtitle,
            "tags": tags,
            "scenes": scenes,
        }
        varname, dur_var, dur_frames = write_promo_ts(data)
        # Match video
        vid_path = match_video(cid)
        if vid_path:
            target = os.path.join(PUBLIC_VIDEOS, f"{cid_str}.mp4")
            if not os.path.exists(target):
                print(f"  Copying video: {os.path.basename(vid_path)} -> videos/{cid_str}.mp4")
                import shutil
                shutil.copy2(vid_path, target)
        else:
            print(f"  WARNING: No video found for {cid_str}")
        registrations.append((cid_str, varname, dur_var, dur_frames))

    # Write Root import/registration helper
    print("\n=== Writing Root registration helper ===")
    lines = []
    import_lines = []
    comp_lines = []
    for cid_str, varname, dur_var, dur_frames in registrations:
        name = varname
        import_name = cid_str.replace('-', '_')
        import_lines.append(
            f'import {{ {name}, {dur_var}, COURSE_PROMO_FPS }} from "./CoursePromos/promo-{cid_str}";'
        )
        comp_lines.append(f"""      <Composition
        id="Promo-{cid_str}"
        component={{CoursePromo}}
        durationInFrames={{{dur_var}}}
        fps={{COURSE_PROMO_FPS}}
        width={{1920}}
        height={{1080}}
        defaultProps={{{{ data: {name} }}}}
      />
      <Composition
        id="Promo-{cid_str}-Preview"
        component={{CoursePromo}}
        durationInFrames={{{dur_var}}}
        fps={{COURSE_PROMO_FPS}}
        width={{1280}}
        height={{720}}
        defaultProps={{{{ data: {name} }}}}
      />""")

    out = "// Auto-generated registration — add to Root.tsx\n\n" + \
          "import { CoursePromo } from \"./CoursePromos/CoursePromo\";\n" + \
          "\n".join(import_lines) + "\n\n// Add these inside <RemotionRoot>:\n" + \
          "\n".join(comp_lines) + "\n"
    reg_path = os.path.join(OUT_DIR, "_registrations.tsx")
    with open(reg_path, 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"Wrote registration template: {reg_path}")
    print(f"Total courses: {len(registrations)}")

if __name__ == "__main__":
    main()
