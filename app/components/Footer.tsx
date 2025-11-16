export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          {/* Контакты */}
          <div className="text-center md:text-left">
            <a 
              href="mailto:mishatkinmedical@gmail.com"
              className="text-lg font-semibold hover:text-blue-400 transition"
            >
              mishatkinmedical@gmail.com
            </a>
          </div>

          {/* Лого в центре */}
          <div className="text-center">
            <p className="text-sm text-slate-400">MishatkinMedical</p>
          </div>

          {/* Телеграм */}
          <div className="text-center md:text-right">
            <a 
              href="https://t.me/vm10_official"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-semibold hover:text-blue-400 transition"
            >
              <span></span> @vm10_official
            </a>
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
