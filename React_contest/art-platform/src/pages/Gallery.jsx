import { User, MapPin, Heart } from "lucide-react";

export default function Gallery() {
  // Демо-дані (імітація робіт, завантажених адміном)
  const artworks = [
    {
      id: 1,
      title: "Холодний ранок",
      author: "Марія Кравченко",
      age: 15,
      city: "Київ",
      category: "Класика",
      image:
        "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Кібер-Зима 2077",
      author: "Олександр Петров",
      age: 17,
      city: "Львів",
      category: "Цифровий арт",
      image:
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Забута стежка",
      author: "Дар'я Біла",
      age: 14,
      city: "Одеса",
      category: "Фотографія",
      image:
        "https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-light mb-6 italic tracking-tighter uppercase drop-shadow-[0_10px_10px_rgba(6,182,212,0.3)]">
            Галерея <span className="text-cyan-500">Робіт</span>
          </h1>
          <p className="text-slate-400 uppercase tracking-[0.3em] text-sm">
            Вибрані шедеври учасників ARTisCool
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="group relative bg-white/5 border border-white/10 rounded-[40px] overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60"></div>

                {/* Badge */}
                <div className="absolute top-6 left-6 bg-cyan-500 text-[#0a0f1a] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {art.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold uppercase italic tracking-tighter leading-none">
                    {art.title}
                  </h3>
                  <button className="text-slate-500 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-medium">
                    <User size={16} />
                    <span className="text-sm">
                      {art.author}, {art.age} років
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={14} />
                    <span className="text-xs uppercase tracking-widest">
                      {art.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
