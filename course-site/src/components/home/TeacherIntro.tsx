export default function TeacherIntro() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar placeholder — use teacher photo if available */}
          <div className="shrink-0 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
            韩
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              韩旭 老师
            </h2>
            <p className="text-gray-500 mb-4 text-sm font-medium">
              新知领导力合伙人
            </p>
            <p className="text-gray-700 leading-relaxed">
              致力于帮助职场人摆脱职场焦虑，掌握领导者必备能力，实现快速晋升。
              课程涵盖认识自我、改变自我、领导他人、领导团队、人生升华五大模块，
              系统教授如何拥有领导力，成为人生的赢家。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
