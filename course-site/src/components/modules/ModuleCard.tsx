import { Link } from 'react-router-dom'
import type { Module } from '../../types'

interface Props {
  module: Module
}

export default function ModuleCard({ module: mod }: Props) {
  return (
    <Link
      to={`/modules/${mod.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      <div className={`h-2 bg-gradient-to-r ${mod.color}`} />
      <div className="p-6">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {mod.title}
          </h3>
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
            {mod.lessonCount} 节
          </span>
        </div>
        {mod.subtitle && (
          <p className="text-sm text-gray-500 mb-2">{mod.subtitle}</p>
        )}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {mod.description}
        </p>
        <div className="mt-4 text-sm text-blue-600 font-medium group-hover:underline">
          查看课程 →
        </div>
      </div>
    </Link>
  )
}
