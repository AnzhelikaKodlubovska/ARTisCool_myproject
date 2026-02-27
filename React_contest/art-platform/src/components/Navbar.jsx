import { Link, useNavigate } from "react-router-dom";
import { Palette, LogOut, User } from "lucide-react"; // Спростив імпорт

export default function Navbar() {
  const navigate = useNavigate();

  // Перевірка наявності даних
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-[#0a0f1a]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-cyan-500/10 p-2 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
              <Palette className="h-7 w-7 text-cyan-500" />
            </div>
            <span className="font-black text-2xl text-white tracking-tighter">
              ART<span className="text-cyan-500">is</span>Cool
            </span>
          </Link>

          {/* Навігація */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-400 hover:text-white font-medium transition-colors text-xs uppercase tracking-widest"
            >
              Головна
            </Link>
            <Link
              to="/about"
              className="text-slate-400 hover:text-white font-medium transition-colors text-xs uppercase tracking-widest"
            >
              Про нас
            </Link>
            <Link
              to="/contacts"
              className="text-slate-400 hover:text-white font-medium transition-colors text-xs uppercase tracking-widest"
            >
              Контакти
            </Link>

            {/* Блок авторизації */}
            <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-8">
              {token ? (
                <div className="flex items-center gap-6">
                  {/* Додаємо Link навколо іконки та імені */}
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <User className="h-4 w-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                    <span className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">
                      {username}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 text-xs uppercase font-bold"
                  >
                    <LogOut className="h-4 w-4" />
                    Вийти
                  </button>
                </div>
              ) : (
                // ... твій код для кнопок "Увійти" та "Взяти участь" лишається без змін
                <>
                  <Link
                    to="/login"
                    className="text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Увійти
                  </Link>
                  <Link
                    to="/register"
                    className="bg-cyan-500 text-[#0a0f1a] px-6 py-2.5 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs uppercase"
                  >
                    Взяти участь
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
