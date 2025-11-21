export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          {/* Email слева - копируемый текст, большой шрифт, без эмоджи */}
          <div className="text-center md:text-left">
            <button
              onClick={() => {
                navigator.clipboard.writeText('mishatkinmedical@gmail.com');
                alert('Email скопирован в буфер обмена!');
              }}
              className="inline-block text-base md:text-lg font-semibold text-slate-300 hover:text-white transition rounded-lg hover:bg-slate-700 px-3 py-2"
              title="Нажми чтобы скопировать"
            >
              mishatkinmedical@gmail.com
            </button>
          </div>

          {/* Телеграм в центре - БОЛЬШАЯ иконка */}
          <div className="text-center flex justify-center">
            <a 
              href="https://t.me/mishatkin_medical"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition transform hover:scale-110"
              title="Присоединиться к Telegram"
            >
              <img src="/assets/telegram.svg" alt="Telegram" className="w-10 h-10" />
            </a>
          </div>

          {/* Лого справа */}
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-300">MishatkinMedical</p>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-slate-400 text-sm">© 2025 MishatkinMedical. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
