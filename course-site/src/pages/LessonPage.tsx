import { useParams, Link } from 'react-router-dom'
import { getLessonById, getAdjacentLessons } from '../data/lessons'
import LessonContent from '../components/lesson/LessonContent'
import LessonNav from '../components/lesson/LessonNav'

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? getLessonById(lessonId) : undefined

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">课程未找到</h1>
        <Link to="/modules" className="text-blue-600 hover:underline">
          返回课程模块
        </Link>
      </div>
    )
  }

  const { prev, next } = getAdjacentLessons(lesson.id)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6">
        <Link to="/modules" className="hover:text-gray-600 transition-colors">
          课程模块
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/modules/${lesson.moduleIndex}`}
          className="hover:text-gray-600 transition-colors"
        >
          模块 {lesson.moduleIndex}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium truncate">
          {lesson.title}
        </span>
      </div>

      {/* Lesson header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {lesson.title}
        </h1>
        <p className="text-sm text-gray-400">
          模块 {lesson.moduleIndex} · 第 {lesson.lessonIndex + 1} 节
        </p>
      </div>

      {/* Content */}
      <LessonContent rawContent={lesson.rawContent} />

      {/* Navigation */}
      <LessonNav prev={prev} next={next} />
    </div>
  )
}
