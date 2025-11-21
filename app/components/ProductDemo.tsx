'use client';

export default function ProductDemo() {
  return (
    <section id="product-demo" className="w-full bg-white py-16 md:py-24">
      {/* Заголовок и описание */}
      <div className="max-w-4xl mx-auto text-center px-4 md:px-6 mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
          Продукт в действии
        </h2>
        <p className="text-base md:text-xl text-slate-700">
          Беспроводное управление через мобильное приложение, простота использования и полный контроль над вашим здоровьем.
        </p>
      </div>

      {/* Видео в рамочке - адаптивное для всех экранов */}
      <div className="flex justify-center px-4 md:px-6">
        <div className="w-full max-w-4xl">
          {/* Внешняя рамочка с тенью */}
          <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-slate-300 bg-black">
            {/* Видео контейнер */}
            <div className="relative w-full aspect-video bg-black">
              <video
                autoPlay
                loop
                muted
                controls
                playsInline
                className="w-full h-full object-contain"
                src="/assets/app-demo.mp4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
