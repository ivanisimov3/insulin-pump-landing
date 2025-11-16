'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type UserGroup = 'patients' | 'innovators' | 'investors' | null;

const surveys = {
  patients: [
    {
      id: 'price-1',
      text: 'Какую цену вы считаете приемлемой за инсулиновую помпу?',
      type: 'multiple-choice' as const,
      options: ['40 000 ₽', '45 000 ₽', '50 000 ₽', '55 000 ₽'],
    },
    {
      id: 'switch-from-pen',
      text: 'Готовы ли вы перейти со шприц-ручки на инсулиновую помпу?',
      type: 'multiple-choice' as const,
      options: ['Да', 'Нет', 'Вопрос в цене'],
    },
    {
      id: 'purchase-difficulties',
      text: 'Испытываете ли сложности в покупке устройств для диабетиков?',
      type: 'multiple-choice' as const,
      options: ['Да', 'Нет', 'Периодически'],
    },
    {
      id: 'app-comfort',
      text: 'Насколько удобно было бы управление инсулиновой помпой через телефон?',
      type: 'rating' as const,
      maxRating: 5,
      labels: ['Совсем не удобно', 'Очень удобно'],
    },
    {
      id: 'purchase-interest',
      text: 'Купили бы данное решение если бы оно было в продаже?',
      type: 'multiple-choice' as const,
      options: ['Да', 'Нет', 'Вопрос в цене'],
    },
    {
      id: 'acceptable-price',
      text: 'При какой цене вы бы пользовались данным решением?',
      type: 'multiple-choice' as const,
      options: ['35 000 ₽', '40 000 ₽', '45 000 ₽', '50 000 ₽'],
    },
  ],
  innovators: [
    {
      id: 'interest-level',
      text: 'Насколько вам интересна информация о беспроводной инсулиновой помпе?',
      type: 'rating' as const,
      maxRating: 5,
      labels: ['Совсем не интересна', 'Очень интересна / инновационна'],
    },
    {
      id: 'potential-vision',
      text: 'Видите ли вы потенциал в создании медицинского устройства, сочетающего современные технологии и функции инсулиновой помпы?',
      type: 'rating' as const,
      maxRating: 5,
      labels: ['Совсем не вижу потенциала', 'Высокий инновационный потенциал'],
    },
    {
      id: 'recommendation',
      text: 'Порекомендовали бы вы такое устройство знакомым, живущим с диабетом?',
      type: 'multiple-choice' as const,
      options: ['Да', 'Нет', 'Отправил(а) бы ссылку на сайт для ознакомления'],
    },
  ],
  investors: [
    {
      id: 'presentation-interest',
      text: 'Заинтересовали ли вас презентация продукта?',
      type: 'multiple-choice' as const,
      options: ['Да', 'Нет', 'Остались вопросы'],
    },
    {
      id: 'cooperation-potential',
      text: 'Видите ли вы потенциал в сотрудничестве?',
      type: 'multiple-choice' as const,
      options: ['Да', 'Нет', 'Только после личного контакта'],
    },
    {
      id: 'investment-interest',
      text: 'Заинтересованы ли вы в инвестировании в проект?',
      type: 'multiple-choice' as const,
      options: ['Да', 'Нет', 'Только при получении финансовых показателей'],
    },
  ],
};

export default function Survey() {
  const [selectedGroup, setSelectedGroup] = useState<UserGroup>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: string]: string | number }>({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGroupSelect = (group: UserGroup) => {
    setSelectedGroup(group);
    setCurrentQuestionIndex(0);
    setResponses({});
  };

  const handleAnswer = (answer: string | number) => {
    const currentQuestion = surveys[selectedGroup!][currentQuestionIndex];
    setResponses({
      ...responses,
      [currentQuestion.id]: answer,
    });

    if (currentQuestionIndex < surveys[selectedGroup!].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveSurveyResponses({
        ...responses,
        [currentQuestion.id]: answer,
      });
    }
  };

  const saveSurveyResponses = async (finalResponses: { [key: string]: string | number }) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupType: selectedGroup,
          responses: finalResponses,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to save');

      setShowThankYou(true);

      setTimeout(() => {
        setSelectedGroup(null);
        setShowThankYou(false);
        setCurrentQuestionIndex(0);
        setResponses({});
        setIsSaving(false);
      }, 3000);
    } catch (error) {
      console.error('❌ Ошибка при сохранении:', error);
      alert('Ошибка при сохранении ответов. Попробуйте еще раз.');
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setSelectedGroup(null);
    }
  };

  if (showThankYou) {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-12 text-center max-w-md mx-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            ✓
          </motion.div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Спасибо за ответы!
          </h3>
          <p className="text-slate-700">
            Ваше мнение очень важно для нас.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  if (!selectedGroup) {
    return (
      <section className="w-full min-h-screen bg-gradient-to-b from-white to-slate-50 py-20 px-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Ваше мнение важно
            </h2>
            <p className="text-xl text-slate-700">
              Ответьте на несколько вопросов о нашем продукте
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              {
                key: 'patients',
                title: 'Пациенты с диабетом',
                description: 'Вопросы о удобстве и приемлемости решения',
                icon: '👥',
              },
              {
                key: 'innovators',
                title: 'Инноваторы',
                description: 'Оценка технологичности и потенциала',
                icon: '🚀',
              },
              {
                key: 'investors',
                title: 'Инвесторы',
                description: 'Анализ инвестиционного потенциала',
                icon: '💼',
              },
            ].map((group) => (
              <motion.button
                key={group.key}
                onClick={() => handleGroupSelect(group.key as UserGroup)}
                className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left border-2 border-blue-200 hover:border-blue-500 hover:scale-105"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-4">{group.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {group.title}
                </h3>
                <p className="text-slate-700 text-sm">
                  {group.description}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  const currentQuestion = surveys[selectedGroup][currentQuestionIndex] as any;
  const progress = ((currentQuestionIndex + 1) / surveys[selectedGroup].length) * 100;

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-20 px-4 md:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-slate-900">
              Вопрос {currentQuestionIndex + 1} из {surveys[selectedGroup].length}
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {Math.round(progress)}%
            </span>
          </div>
          <motion.div className="h-3 bg-slate-300 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl p-6 md:p-8 space-y-6 md:space-y-8"
          >
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
              {currentQuestion.text}
            </h3>

            {currentQuestion.type === 'multiple-choice' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options?.map((option: string) => (
                  <motion.button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={isSaving}
                    className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg hover:border-blue-600 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all text-left font-semibold text-slate-900 hover:text-blue-700 disabled:opacity-50 hover:shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'rating' && (
              <div>
                <div className="flex justify-between gap-2 md:gap-3 mb-4">
                  {Array.from({ length: currentQuestion.maxRating || 5 }).map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(i + 1)}
                      disabled={isSaving}
                      className="flex-1 h-14 md:h-16 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 hover:border-blue-600 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all text-lg md:text-xl font-bold text-slate-900 disabled:opacity-50 hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>
                {currentQuestion.labels && (
                  <div className="flex justify-between text-xs md:text-sm text-slate-600">
                    <span>{currentQuestion.labels[0]}</span>
                    <span>{currentQuestion.labels[1]}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-300">
              <motion.button
                onClick={handleBack}
                disabled={isSaving}
                className="px-6 py-3 text-slate-900 font-semibold border-2 border-slate-300 rounded-lg hover:bg-slate-100 transition-all w-full md:w-auto disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
              >
                ← Назад
              </motion.button>
              <span className="text-xs md:text-sm text-slate-900 font-medium text-center">
                {isSaving ? '⏳ Сохраняем...' : 'Нажмите на ответ чтобы продолжить'}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
