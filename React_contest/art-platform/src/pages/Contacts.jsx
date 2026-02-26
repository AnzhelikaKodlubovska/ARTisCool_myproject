import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contacts() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            ЗВ'ЯЖІТЬСЯ З НАМИ
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Маєте запитання щодо конкурсу чи технічні труднощі? Наша команда
            готова допомогти вам 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Контактна інформація */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6">Наші координати</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-xl">
                    <Mail className="text-cyan-500" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="font-medium">hello@artquest.ua</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/10 p-3 rounded-xl">
                    <Phone className="text-purple-500" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Телефон</p>
                    <p className="font-medium">+38 (099) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-yellow-500/10 p-3 rounded-xl">
                    <MapPin className="text-yellow-500" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Локація</p>
                    <p className="font-medium">Київ, вул. Мистецька, 12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Форма зворотного зв'язку */}
          <div className="lg:col-span-2">
            <form className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Ваше ім'я
                  </label>
                  <input
                    type="text"
                    placeholder="Олександр"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Ваш Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Повідомлення
                </label>
                <textarea
                  placeholder="Опишіть ваше запитання..."
                  rows="5"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-cyan-500 text-[#0a0f1a] py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Send size={20} />
                Надіслати повідомлення
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
