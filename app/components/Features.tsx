'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: 'Интуитивное управление',
    description: 'Подходит подросткам, взрослым и пожилым людям.',
    icon: '🎯',
  },
  {
    title: 'Микродозинг',
    description: 'Имитация работы поджелудочной железы.',
    icon: '💊',
  },
  {
    title: 'Адаптивные алгоритмы',
    description: 'Подстраиваются под ритм жизни и активность.',
    icon: '🤖',
  },
  {
    title: 'Минимальный размер',
    description: 'Комфортное ношение без дискомфорта.',
    icon: '📦',
  },
  {
    title: 'Персональная настройка',
    description: 'Возрастные настройки (особенно для детей).',
    icon: '⚙️',
  },
  {
    title: 'Доступная цена',
    description: 'Ниже зарубежных аналогов (российское производство).',
    icon: '💰',
  },
];

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="w-full bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Основные преимущества */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Ключевые преимущества
          </h2>
          <p className="text-xl text-slate-600">
            Что делает Mishatkin Medical особенной
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-slate-200"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Уникальность проекта - БЕЗ БОЛЬШИХ ОТСТУПОВ */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-6">
            🚀 Уникальность проекта
          </h3>
          <p className="text-2xl font-semibold leading-relaxed">
            Адаптивные алгоритмы анализа и подачи инсулина, обученные на машинном обучении
          </p>
        </motion.div>
      </div>
    </section>
  );
}
