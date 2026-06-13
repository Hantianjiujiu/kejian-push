import type { Lesson, Module } from '../types'
import { parseFilename, preprocessMarkdown } from '../utils/markdown'
import { MODULES } from './catalog'
import { LESSON_DATA } from './lessons-bundle'

function buildLessons(): Map<string, Lesson> {
  const map = new Map<string, Lesson>()

  for (const [filename, raw] of Object.entries(LESSON_DATA)) {
    const { moduleIndex, lessonIndex, title } = parseFilename(filename)
    const id = `${moduleIndex}-${lessonIndex}`

    map.set(id, {
      id,
      moduleIndex,
      lessonIndex,
      title,
      rawContent: preprocessMarkdown(raw),
    })
  }

  return map
}

const lessonMap = buildLessons()

export function getAllLessons(): Lesson[] {
  return Array.from(lessonMap.values())
}

export function getLessonById(id: string): Lesson | undefined {
  return lessonMap.get(id)
}

export function getModules(): Module[] {
  return MODULES.map((meta) => ({
    ...meta,
    lessons: Array.from(lessonMap.values())
      .filter((l) => l.moduleIndex === meta.id)
      .sort((a, b) => a.lessonIndex - b.lessonIndex),
  }))
}

export function getAdjacentLessons(
  lessonId: string
): { prev: Lesson | null; next: Lesson | null } {
  const modules = getModules()
  const allLessons = modules.flatMap((m) => m.lessons)
  const idx = allLessons.findIndex((l) => l.id === lessonId)
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  }
}
