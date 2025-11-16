'use client';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Видео логотип (вместо статичного) */}
        <div className="mb-12 flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl"
            src="/assets/logo-animation.mp4"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Беспроводная<br />инсулиновая помпа
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
          Инновационное решение для управления диабетом, которое упрощает вашу жизнь через мобильное приложение.
        </p>

        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition transform hover:scale-105">
          Узнать больше
        </button>
      </div>
    </section>
  );
}
