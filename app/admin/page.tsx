'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'super_secret_password_123';

interface SurveyResponse {
  id: number;
  groupType: string;
  responses: { [key: string]: string | number };
  createdAt: string;
}

export default function AdminPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ADMIN_AUTHED');
    if (saved === '1') setIsAuthed(true);
  }, []);

  useEffect(() => {
    if (isAuthed) fetchResponses();
  }, [isAuthed]);

  const handleLogin = () => {
    const password = ADMIN_PASSWORD;

    if (inputPassword === password) {
      setIsAuthed(true);
      localStorage.setItem('ADMIN_AUTHED', '1');
      setError('');
    } else {
      setError('❌ Неверный пароль');
    }
  };

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/survey');
      const data = await res.json();
      setResponses(data.responses);
    } catch (error) {
      setResponses([]);
    } finally {
      setLoading(false);
    }
  };

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

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6 w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-2 text-slate-900">🔒 Админ-панель</h2>
          <p className="text-slate-600">Введите пароль для входа</p>
          <input
            type="password"
            value={inputPassword}
            onChange={e => setInputPassword(e.target.value)}
            className="px-4 py-3 border-2 border-slate-300 rounded-lg w-full text-lg focus:border-blue-500 focus:outline-none transition"
            placeholder="Пароль"
            onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
            autoFocus
          />
          {error && <div className="text-red-600 font-semibold text-lg">{error}</div>}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:shadow-xl"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl text-slate-900 font-semibold">⏳ Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">📊 Админ-панель</h1>
          <p className="text-lg md:text-xl text-slate-700">
            Всего ответов: <span className="font-bold text-blue-600 text-xl md:text-2xl">{responses.length}</span>
          </p>
        </div>

        {/* Кнопки (адаптивные) */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
          <button
            onClick={exportToExcel}
            disabled={responses.length === 0}
            className="px-6 py-3 md:py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg shadow-lg transition text-sm md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
          >
            📥 Скачать Excel
          </button>
          
          <button
            onClick={clearAllResponses}
            disabled={responses.length === 0 || isDeleting}
            className="px-6 py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-lg transition text-sm md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
          >
            {isDeleting ? '⏳ Удаляем...' : '🗑️ Очистить все'}
          </button>
        </div>

        {/* Таблица или список */}
        {responses.length > 0 ? (
          <>
            {/* Версия для ПК (таблица) */}
            <div className="hidden md:block bg-white rounded-xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">ID</th>
                    <th className="px-6 py-4 text-left font-bold">Группа</th>
                    <th className="px-6 py-4 text-left font-bold">Дата</th>
                    <th className="px-6 py-4 text-left font-bold">Ответы</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((item, idx) => (
                    <tr key={idx} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition`}>
                      <td className="px-6 py-4 font-bold text-slate-900">{item.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {item.groupType === 'patients' ? '👥 Пациенты' : 
                         item.groupType === 'innovators' ? '🚀 Инноваторы' : '💼 Инвесторы'}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {new Date(item.createdAt).toLocaleString('ru-RU')}
                      </td>
                      <td className="px-6 py-4">
                        <details className="cursor-pointer">
                          <summary className="font-bold text-blue-600 hover:text-blue-800">
                            ▼ Показать
                          </summary>
                          <div className="mt-4 p-4 bg-slate-100 rounded-lg text-slate-900 max-h-96 overflow-auto">
                            <pre className="text-xs font-mono">
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

            {/* Версия для мобильного (карточки) */}
            <div className="md:hidden space-y-4">
              {responses.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-slate-600">ID: <span className="font-bold text-slate-900">{item.id}</span></p>
                      <p className="text-sm font-bold text-slate-900 mt-1">
                        {item.groupType === 'patients' ? '👥 Пациенты' : 
                         item.groupType === 'innovators' ? '🚀 Инноваторы' : '💼 Инвесторы'}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    {new Date(item.createdAt).toLocaleString('ru-RU')}
                  </p>
                  <details className="cursor-pointer">
                    <summary className="text-sm font-bold text-blue-600 hover:text-blue-800">
                      ▼ Показать ответы
                    </summary>
                    <div className="mt-3 p-3 bg-slate-100 rounded text-slate-900 max-h-96 overflow-auto">
                      <pre className="text-xs font-mono break-words">
                        {JSON.stringify(item.responses, null, 2)}
                      </pre>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <p className="text-2xl md:text-3xl text-slate-900 font-bold">📭 Пока нет ответов</p>
            <p className="text-slate-600 mt-2 text-sm md:text-lg">Ответы будут появляться здесь по мере прохождения опросов</p>
          </div>
        )}
      </div>
    </div>
  );
}
