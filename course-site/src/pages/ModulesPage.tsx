import { getModules } from '../data/lessons'
import ModuleCard from '../components/modules/ModuleCard'

export default function ModulesPage() {
  const modules = getModules()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">课程模块</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          6 大模块，35 节系统课程，循序渐进带你从职场新人成长为团队领袖
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  )
}
