import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">页面未找到</p>
      <Link
        to="/"
        className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}
