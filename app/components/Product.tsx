'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Product() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="relative w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок и описание */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Продукт в действии
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Беспроводное управление через мобильное приложение, простота использования и полный контроль над вашим здоровьем.
          </p>
        </motion.div>

        {/* Сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Фото - слева */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-sm bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/Risunok1.jpg"
                alt="Mishatkin Insulin Pump"
                width={600}
                height={450}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Характеристики - справа */}
          <motion.div
            className="flex flex-col justify-start"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-8">
              Что делает её уникальной
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: '📱',
                  title: 'Управление приложением',
                  desc: 'Контролируйте помпу прямо со смартфона',
                },
                {
                  icon: '📡',
                  title: 'Беспроводная связь',
                  desc: 'Стабильное соединение по Bluetooth',
                },
                {
                  icon: '🤖',
                  title: 'Адаптивные алгоритмы',
                  desc: 'Автоматическая подстройка под вас',
                },
                {
                  icon: '⚡',
                  title: 'Минимальный размер',
                  desc: 'Удобно носить 24/7 без дискомфорта',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
