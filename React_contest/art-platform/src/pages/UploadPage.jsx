import { Upload, ImageIcon, User, Mail, MapPin, Hash } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white py-20 px-6 relative overflow-hidden">
      {/* Фонові ефекти */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            ЗАВАНТАЖИТИ <span className="text-cyan-500">ШЕДЕВР</span>
          </h1>
          <p className="text-slate-400 uppercase tracking-widest text-sm">
            Твій квиток у світ великого мистецтва
          </p>
        </div>

        <form className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] backdrop-blur-xl shadow-2xl space-y-8">
          {/* Зона завантаження файлу */}
          <div className="relative group">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              accept="image/*"
            />
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center bg-white/[0.02] group-hover:bg-cyan-500/5 group-hover:border-cyan-500/50 transition-all duration-300">
              <div className="bg-cyan-500/10 p-5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <Upload className="h-10 w-10 text-cyan-500" />
              </div>
              <p className="text-lg font-bold text-white group-hover:text-cyan-400">
                Натисніть або перетягніть файл
              </p>
              <p className="text-sm text-slate-500 mt-2 tracking-widest uppercase">
                PNG, JPG, WEBP • MAX 10MB
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ім'я */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <User size={14} className="text-cyan-500" /> Ім'я
              </label>
              <input
                type="text"
                placeholder="Введіть ім'я"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
              />
            </div>

            {/* Прізвище */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <User size={14} className="text-cyan-500" /> Прізвище
              </label>
              <input
                type="text"
                placeholder="Введіть прізвище"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Вік */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <Hash size={14} className="text-cyan-500" /> Вік
              </label>
              <input
                type="number"
                placeholder="16"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
              />
            </div>

            {/* Місто */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <MapPin size={14} className="text-cyan-500" /> Місто
              </label>
              <input
                type="text"
                placeholder="Наприклад: Київ"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
              <Mail size={14} className="text-cyan-500" /> Електронна пошта
            </label>
            <input
              type="email"
              placeholder="yourmail@example.com"
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
            />
          </div>

          {/* Назва малюнка */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
              <ImageIcon size={14} className="text-cyan-500" /> Назва роботи
            </label>
            <input
              type="text"
              placeholder="Наприклад: Зимовий ранок у селі"
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
            />
          </div>

          {/* Категорія мистецтва */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
              Категорія мистецтва
            </label>
            <div className="relative">
              <select className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none appearance-none transition-all text-white cursor-pointer">
                <option className="bg-[#0a0f1a]">
                  Класика (акварель, олія, олівець)
                </option>
                <option className="bg-[#0a0f1a]">
                  Цифровий арт (2D, 3D ілюстрація)
                </option>
                <option className="bg-[#0a0f1a]">
                  Фотографія (фотоманіпуляції)
                </option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                ▼
              </div>
            </div>
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            className="w-full bg-cyan-500 text-[#0a0f1a] py-5 rounded-2xl font-black text-xl hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all active:scale-[0.98] uppercase tracking-widest mt-10"
          >
            Опублікувати роботу
          </button>
        </form>
      </div>
    </div>
  );
}
