'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden px-6">
      {/* Фоновый эффект */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center flex-1 -space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Логотип и заголовок вместе */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Логотип - БОЛЬШОЙ! */}
          <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] mb-0">
            <Image
              src="/mishatkin_logo.svg"
              alt="Mishatkin Medical"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Заголовок */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center mt-0 md:mt-2">
            Беспроводная<br />инсулиновая помпа
          </h1>
        </motion.div>

        {/* Подзаголовок */}
        <motion.div
          className="text-center mt-4 md:mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg md:text-xl lg:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Инновационное решение для управления диабетом, которое упрощает вашу жизнь через мобильное приложение.
          </p>
        </motion.div>
      </motion.div>

      {/* Стрелка */}
      <motion.button
        onClick={handleScrollDown}
        className="relative z-10 mb-6 md:mb-8 bg-transparent border-none cursor-pointer p-2 flex justify-center items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-blue-300 hover:text-blue-100 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.button>
    </section>
  );
}
