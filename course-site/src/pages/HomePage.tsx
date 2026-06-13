import { Link } from 'react-router-dom'
import { getModules } from '../data/lessons'
import HeroSection from '../components/home/HeroSection'
import TeacherIntro from '../components/home/TeacherIntro'
import ModuleHighlights from '../components/home/ModuleHighlights'

export default function HomePage() {
  const modules = getModules()

  return (
    <div>
      <HeroSection />
      <TeacherIntro />
      <ModuleHighlights modules={modules} />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            准备好了吗？
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            35 节系统课程，6 大模块，从认识自我到领导团队，一步步带你走向领导者之路。
          </p>
          <Link
            to="/modules"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
          >
            开始学习
          </Link>
        </div>
      </section>
    </div>
  )
}
