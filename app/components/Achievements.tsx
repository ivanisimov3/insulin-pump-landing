'use client';

import Image from 'next/image';

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      title: 'Призер международного конкурса "Бизнес-Генерация"',
      borderColor: 'border-purple-600',
    },
    {
      id: 2,
      title: 'Призер и стипендиат программы "Начни свой бизнес с Москвой"',
      borderColor: 'border-green-600',
    },
    {
      id: 3,
      title: 'Резидент Академии Инноваторов',
      borderColor: 'border-blue-600',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
          🏆 Достижения
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Текстовые достижения с разными цветами */}
          <div className="md:col-span-3 space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${achievement.borderColor} hover:shadow-lg transition-shadow`}
              >
                <p className="text-lg font-semibold text-slate-900">
                  {achievement.title}
                </p>
              </div>
            ))}
          </div>

          {/* Иконка справа */}
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="relative w-40 h-40">
              <Image
                src="/assets/academy-innovators-logo.png"
                alt="Академия Инноваторов"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
