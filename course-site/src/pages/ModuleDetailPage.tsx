import { useParams, Link } from 'react-router-dom'
import { getModules } from '../data/lessons'
import LessonListItem from '../components/modules/LessonListItem'

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const modules = getModules()
  const mod = modules.find((m) => m.id === Number(moduleId))

  if (!mod) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">模块未找到</h1>
        <Link to="/modules" className="text-blue-600 hover:underline">
          返回课程模块
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6">
        <Link to="/modules" className="hover:text-gray-600 transition-colors">
          课程模块
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{mod.title}</span>
      </div>

      {/* Module header */}
      <div className="mb-10">
        <div
          className={`inline-block bg-gradient-to-r ${mod.color} text-white text-sm font-medium px-3 py-1 rounded-full mb-4`}
        >
          模块 {mod.id}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{mod.title}</h1>
        {mod.subtitle && (
          <p className="text-lg text-gray-500 mb-3">{mod.subtitle}</p>
        )}
        <p className="text-gray-600 max-w-2xl">{mod.description}</p>
      </div>

      {/* Lesson list */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          课程列表（共 {mod.lessons.length} 节）
        </h2>
        {mod.lessons.map((lesson, idx) => (
          <LessonListItem
            key={lesson.id}
            lesson={lesson}
            index={idx + 1}
          />
        ))}
      </div>

      {/* Back link */}
      <div className="mt-12 text-center">
        <Link
          to="/modules"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 返回所有模块
        </Link>
      </div>
    </div>
  )
}
