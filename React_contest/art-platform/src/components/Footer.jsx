import { Link } from "react-router-dom";
import { Palette, Instagram, Send, Youtube, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050810] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Колонка 1: Брендинг */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-cyan-500/10 p-2 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                <Palette className="h-6 w-6 text-cyan-500" />
              </div>
              <span className="font-black text-xl text-white tracking-tighter uppercase">
                ART<span className="text-cyan-500">is</span>Cool
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Перша в Україні диджитал-платформа для молодих художників, що
              поєднує мистецтво та технології.
            </p>
          </div>

          {/* Колонка 2: Навігація */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Навігація
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-slate-500 hover:text-cyan-500 transition-colors text-sm"
                >
                  Головна
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-500 hover:text-cyan-500 transition-colors text-sm"
                >
                  Про нас
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-slate-500 hover:text-cyan-500 transition-colors text-sm"
                >
                  Тарифи
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-slate-500 hover:text-cyan-500 transition-colors text-sm"
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Підтримка */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Підтримка
            </h4>
            <ul className="space-y-4">
              <li className="text-slate-500 text-sm hover:text-white cursor-pointer transition-colors font-light italic underline decoration-cyan-500/30">
                Правила конкурсу
              </li>
              <li className="text-slate-500 text-sm hover:text-white cursor-pointer transition-colors font-light italic underline decoration-cyan-500/30">
                Політика конфіденційності
              </li>
              <li className="text-slate-500 text-sm hover:text-white cursor-pointer transition-colors font-light italic underline decoration-cyan-500/30">
                FAQ
              </li>
            </ul>
          </div>

          {/* Колонка 4: Соцмережі */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Ми в мережах
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/5 p-3 rounded-full hover:bg-cyan-500/20 hover:text-cyan-500 transition-all border border-white/5"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-white/5 p-3 rounded-full hover:bg-cyan-500/20 hover:text-cyan-500 transition-all border border-white/5"
              >
                <Send size={20} />
              </a>
              <a
                href="#"
                className="bg-white/5 p-3 rounded-full hover:bg-cyan-500/20 hover:text-cyan-500 transition-all border border-white/5"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Нижня частина: Копірайт */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {currentYear} ARTisCool Inc. Всі права захищені.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1">
            Створено з ❤️ для творчої молоді
          </p>
        </div>
      </div>
    </footer>
  );
}
