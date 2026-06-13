export interface ModuleMeta {
  id: number
  title: string
  subtitle?: string
  lessonCount: number
  description: string
  color: string
}

export interface Lesson {
  id: string
  moduleIndex: number
  lessonIndex: number
  title: string
  rawContent: string
}

export interface Module extends ModuleMeta {
  lessons: Lesson[]
}
