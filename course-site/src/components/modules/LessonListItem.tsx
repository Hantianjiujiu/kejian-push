import { Link } from 'react-router-dom'
import type { Lesson } from '../../types'

interface Props {
  lesson: Lesson
  index: number
}

export default function LessonListItem({ lesson, index }: Props) {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group"
    >
      <span className="shrink-0 w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm flex items-center justify-center">
        {index}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
          {lesson.title}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          第 {index} 节
        </p>
      </div>
      <svg
        className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
