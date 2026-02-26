import { Link } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import {
  Palette,
  Rocket,
  Trophy,
  Users,
  Camera,
  Brush,
  Cpu,
} from "lucide-react";

const HomePage = () => {
  const currentTheme = "Весняні канікули у Лондоні";
  const deadline = "2026-02-15T23:59:59";

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans overflow-x-hidden">
      {/* Додаємо глобальні стилі анімації хитання */}
      <style>{`
        @keyframes tilt {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>

      {/* Hero Section з банером-кляксою */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-6 pt-10">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div
            className="w-[110%] h-[110%] opacity-60"
            style={{
              backgroundImage: "url('hero-banner.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              clipPath:
                "polygon(100% 0%, 95% 45%, 100% 85%, 75% 100%, 35% 90%, 0% 100%, 5% 50%, 0% 15%, 30% 0%)",
              filter: "brightness(1.1) contrast(1.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/20 via-[#0a0f1a]/50 to-[#0a0f1a]"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* ТЕМА МІСЯЦЯ - качається */}
          <div className="mb-6">
            <span
              className="block text-cyan-500 text-3xl md:text-5xl font-black uppercase tracking-[0.5em] drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
              style={{
                display: "inline-block",
                animation: "tilt 4s ease-in-out infinite",
              }}
            >
              Тема місяця
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal mb-8 italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-[1.1] py-4 tracking-wide max-w-4xl mx-auto">
            {currentTheme}
          </h1>

          <p className="text-xl md:text-3xl text-slate-200 max-w-3xl mx-auto mb-12 font-light tracking-wide">
            Твій талант заслуговує на визнання. Долучайся до{" "}
            <span className="text-cyan-400 font-bold italic">ARTisCool</span>
          </p>

          <div className="w-full flex justify-center mb-16 scale-110 md:scale-125">
            <CountdownTimer targetDate={deadline} />
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            <Link
              to="/pricing"
              className="group relative bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1a] px-14 py-6 rounded-full font-black text-xl transition-all shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 uppercase tracking-widest overflow-hidden"
            >
              <span className="relative z-10">Взяти участь</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link
              to="/gallery"
              className="bg-white/5 border border-white/20 hover:bg-white/10 px-12 py-5 rounded-full font-black text-lg transition-all backdrop-blur-md uppercase tracking-wider text-center"
            >
              Галерея
            </Link>
          </div>
        </div>
      </section>

      {/* Секція статистики (Цифри) */}
      <section className="py-24 border-y border-white/5 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Учасників", val: "1,200+" },
            { label: "Робіт", val: "4.5k" },
            { label: "Призів", val: "150k" },
            { label: "Міст", val: "42" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl md:text-7xl font-black text-cyan-500 mb-2 transition-transform group-hover:scale-110 duration-300">
                {stat.val}
              </div>
              <div className="text-slate-500 uppercase text-sm tracking-[0.3em] font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Секція категорій */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 tracking-tight">
            Категорії <span className="text-cyan-500">Мистецтва</span>
          </h2>
          <div className="w-24 h-2 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Brush size={40} />,
              title: "Класика",
              desc: "Акварель, олія, олівець — вічна класика в твоїх руках.",
              color: "from-blue-500/20",
            },
            {
              icon: <Cpu size={40} />,
              title: "Цифровий арт",
              desc: "2D, 3D та ілюстрація створена за допомогою софту.",
              color: "from-cyan-500/20",
            },
            {
              icon: <Camera size={40} />,
              title: "Фотографія",
              desc: "Спіймані моменти та фотоманіпуляції.",
              color: "from-purple-500/20",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className={`group relative bg-white/5 border border-white/10 p-12 rounded-[50px] hover:border-cyan-500/50 transition-all duration-500 overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10 text-cyan-500 mb-8 bg-cyan-500/10 w-fit p-6 rounded-3xl group-hover:rotate-12 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="relative z-10 text-3xl font-black mb-4 uppercase italic tracking-tighter text-white">
                {cat.title}
              </h3>
              <p className="relative z-10 text-slate-400 leading-relaxed text-lg font-light">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Секція Умови участі */}
      <section className="py-32 max-w-7xl mx-auto px-6 relative">
        {/* Декоративне сяйво на фоні */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="text-center mb-24 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 tracking-tight">
            Умови <span className="text-cyan-500">участі</span>
          </h2>
          <p className="text-slate-400 text-lg uppercase tracking-[0.2em]">
            Прості кроки до твоєї перемоги
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 relative z-10">
          {[
            {
              step: "01",
              title: "Створи",
              desc: "Намалюй або створи роботу, що відповідає темі місяця.",
              icon: <Brush size={20} />,
            },
            {
              step: "02",
              title: "Завантаж",
              desc: "Обери свій план участі та завантаж файл у високій якості.",
              icon: <Rocket size={20} />,
            },
            {
              step: "03",
              title: "Голосуй",
              desc: "Запрошуй друзів підтримати твою роботу в галереї.",
              icon: <Users size={20} />,
            },
            {
              step: "04",
              title: "Перемагай",
              desc: "Отримуй призи, сертифікати та визнання спільноти.",
              icon: <Trophy size={20} />,
            },
          ].map((item, i) => (
            <div key={i} className="relative group">
              {/* Лінія-з'єднувач (тільки для десктопа) */}
              {i !== 3 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[2px] bg-white/10 z-0"></div>
              )}

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 h-full relative z-10 hover:border-cyan-500/30">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-5xl font-black text-white/10 group-hover:text-cyan-500/20 transition-colors">
                    {item.step}
                  </span>
                  <div className="text-cyan-500 p-2 bg-cyan-500/10 rounded-lg">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Додаткова плашка з важливим уточненням */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-[1px] rounded-2xl">
          <div className="bg-[#0a0f1a] rounded-2xl p-6 text-center">
            <p className="text-slate-300 text-sm md:text-base italic">
              * Роботи приймаються до{" "}
              <span className="text-cyan-500 font-bold">15 лютого 23:59</span>.
              Участь можуть брати автори віком від 12 до 22 років.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
