'use client';

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('product-demo');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Изображение логотипа */}
        <div className="mb-12 flex justify-center">
          <img
            src="/mishatkin_logo1.svg"
            alt="Mishatkin Medical Logo"
            className="w-80 h-80 md:w-96 md:h-96 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Текст с градиентом темный синий и темный зеленый */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-blue-900 via-blue-800 to-green-800 bg-clip-text text-transparent">
          Беспроводная<br />инсулиновая помпа
        </h1>
        <p className="text-xl md:text-2xl bg-gradient-to-b from-blue-900 via-blue-800 to-green-800 bg-clip-text text-transparent mb-12 max-w-3xl mx-auto">
          Инновационное решение для управления диабетом, которое упрощает вашу жизнь через мобильное приложение.
        </p>
      </div>

      {/* Стрелка для скролла вниз */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      >
        <svg
          className="w-8 h-8 text-blue-900 hover:text-blue-950 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  );
}
