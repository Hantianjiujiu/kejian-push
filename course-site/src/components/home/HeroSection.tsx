import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          实务领导力课程
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-4 leading-relaxed">
          拥有了领导力，你就拥有了永远不怕失业的能力
        </p>
        <p className="text-base text-blue-300/80 mb-10 max-w-2xl mx-auto">
          从认识自我到领导团队，系统掌握领导者必备能力，实现快速晋升
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/modules"
            className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
          >
            浏览课程
          </Link>
          <Link
            to="/lessons/0-0"
            className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-white/20"
          >
            先看序言
          </Link>
        </div>
      </div>
    </section>
  )
}
