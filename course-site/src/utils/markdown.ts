/**
 * Parse a markdown filename to extract module index, lesson index, and inferred title.
 *
 * Filename patterns (without .md):
 * - "00（代总序） 永远不怕失业的能力" → module 0, lesson 0
 * - "1-1 认识自我--人生趋势图：..." → module 1, lesson 1
 * - "2-10 改变自我----竞聘演讲..." → module 2, lesson 10
 * - "3-5-领导他人----1线经理..." → module 3, lesson 5
 * - "5  人生升华--范蠡的启示" → module 5, lesson 1
 */
export function parseFilename(filename: string): {
  moduleIndex: number
  lessonIndex: number
  title: string
} {
  const basename = filename.replace(/\.md$/, '')

  // Special case: Module 0 preface starts with "00"
  if (/^00/.test(basename)) {
    return { moduleIndex: 0, lessonIndex: 0, title: extractTitle(basename) }
  }

  // Special case: Module 5 has no hyphen between module and lesson
  if (/^5\s/.test(basename)) {
    return { moduleIndex: 5, lessonIndex: 1, title: extractTitle(basename) }
  }

  // General case: "X-Y" pattern
  const match = basename.match(/^(\d+)-(\d+)/)
  if (match) {
    return {
      moduleIndex: parseInt(match[1], 10),
      lessonIndex: parseInt(match[2], 10),
      title: extractTitle(basename),
    }
  }

  throw new Error(`Cannot parse filename: ${filename}`)
}

function extractTitle(basename: string): string {
  // Remove leading module-lesson prefix (e.g. "1-1 ", "2-10 ", "5 ")
  const withoutPrefix = basename.replace(/^\d+-?\d*\s*/, '')
  // Replace multiple dashes with a separator
  const cleaned = withoutPrefix.replace(/-{2,}/g, ' — ').trim()
  return cleaned || basename
}

/**
 * Preprocess markdown content: convert __bold__ syntax to **bold**.
 * 31 out of 35 lesson files use double-underscore for bold.
 */
export function preprocessMarkdown(raw: string): string {
  // Convert __text__ to **text** (only when not inside code blocks)
  // Simple approach: replace all __ with **
  // This is safe because __ is only used for bold in these documents
  return raw.replace(/__(.+?)__/g, '**$1**')
}
