import { Link } from 'react-router-dom'
import type { Module } from '../../types'

interface Props {
  modules: Module[]
}

export default function ModuleHighlights({ modules }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          课程体系
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          6 大模块，35 节系统课程，循序渐进带你从职场新人成长为团队领袖
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              to={`/modules/${mod.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div
                className={`h-2 bg-gradient-to-r ${mod.color}`}
              />
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {mod.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    {mod.lessonCount} 节
                  </span>
                </div>
                {mod.subtitle && (
                  <p className="text-sm text-gray-500 mb-2">{mod.subtitle}</p>
                )}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {mod.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
