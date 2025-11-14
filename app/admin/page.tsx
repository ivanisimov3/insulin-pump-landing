'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

interface SurveyResponse {
  id: number;
  groupType: string;
  responses: { [key: string]: string | number };
  createdAt: string;
}

export default function AdminPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch('/api/survey');
        const data = await res.json();
        setResponses(data.responses);
      } catch (error) {
        console.error('Ошибка при загрузке:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const exportToExcel = () => {
    if (responses.length === 0) {
      alert('Нет данных для экспорта');
      return;
    }

    const excelData = responses.map((item) => ({
      'ID': item.id,
      'Группа': item.groupType === 'patients' ? 'Пациенты' : 
                 item.groupType === 'innovators' ? 'Инноваторы' : 'Инвесторы',
      'Дата': new Date(item.createdAt).toLocaleString('ru-RU'),
      ...item.responses,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ответы');

    XLSX.writeFile(workbook, `mishatkin_survey_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // ✅ НОВАЯ ФУНКЦИЯ - ОЧИСТКА ОТВЕТОВ
  const clearAllResponses = async () => {
    const password = prompt('Введи пароль для очистки данных:');
    
    if (!password) return;

    if (!window.confirm('⚠️ Ты уверен? Все ответы будут удалены безвозвратно!')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch('/api/survey', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error('Invalid password or error');
      }

      setResponses([]);
      alert('✅ Все ответы удалены!');
    } catch (error) {
      console.error('❌ Ошибка:', error);
      alert('❌ Неверный пароль или ошибка при удалении');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-slate-900 font-semibold">
        ⏳ Загрузка данных...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900 mb-2">📊 Администраторская панель</h1>
          <p className="text-xl text-slate-700">
            Всего ответов: <span className="font-bold text-blue-600 text-2xl">{responses.length}</span>
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={exportToExcel}
            disabled={responses.length === 0}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📥 Скачать Excel
          </button>
          
          <button
            onClick={clearAllResponses}
            disabled={responses.length === 0 || isDeleting}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? '⏳ Удаляем...' : '🗑️ Очистить все ответы'}
          </button>
        </div>

        {/* Таблица */}
        {responses.length > 0 ? (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-6 py-4 text-left font-bold text-lg">ID</th>
                  <th className="px-6 py-4 text-left font-bold text-lg">Группа</th>
                  <th className="px-6 py-4 text-left font-bold text-lg">Дата</th>
                  <th className="px-6 py-4 text-left font-bold text-lg">Ответы</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((item, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition`}
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 text-lg">{item.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-lg">
                      {item.groupType === 'patients' ? '👥 Пациенты' : 
                       item.groupType === 'innovators' ? '🚀 Инноваторы' : '💼 Инвесторы'}
                    </td>
                    <td className="px-6 py-4 text-slate-700 text-lg">
                      {new Date(item.createdAt).toLocaleString('ru-RU')}
                    </td>
                    <td className="px-6 py-4">
                      <details className="cursor-pointer">
                        <summary className="font-bold text-blue-600 hover:text-blue-800 text-lg">
                          ▼ Показать ответы
                        </summary>
                        <div className="mt-4 p-4 bg-slate-100 rounded-lg text-slate-900">
                          <pre className="text-xs overflow-auto max-h-96 font-mono">
                            {JSON.stringify(item.responses, null, 2)}
                          </pre>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <p className="text-3xl text-slate-900 font-bold">📭 Пока нет ответов</p>
            <p className="text-slate-600 mt-2 text-lg">Ответы будут появляться здесь по мере прохождения опросов</p>
          </div>
        )}
      </div>
    </div>
  );
}
