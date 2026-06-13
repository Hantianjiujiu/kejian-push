import { Link } from 'react-router-dom'
import type { Lesson } from '../../types'

interface Props {
  prev: Lesson | null
  next: Lesson | null
}

export default function LessonNav({ prev, next }: Props) {
  return (
    <nav className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
      {prev ? (
        <Link
          to={`/lessons/${prev.id}`}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">上一节：</span>
          <span className="font-medium truncate max-w-[180px]">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={`/lessons/${next.id}`}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <span className="hidden sm:inline">下一节：</span>
          <span className="font-medium truncate max-w-[180px]">
            {next.title}
          </span>
          <svg
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
