import { Target, Zap, MessageSquare, HelpCircle, Star } from "lucide-react";

export default function About() {
  const testimonials = [
    {
      name: "Анна, 15 років",
      text: "ARTisCool допоміг мені повірити у свої сили. Мій малюнок побачили сотні людей!",
      stars: 5,
    },
    {
      name: "Марк, 17 років",
      text: "Крутий дизайн і дуже просте завантаження. Чекаю на наступний конкурс!",
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: "Які роботи приймаються?",
      a: "Будь-які! Від класичного живопису до цифрового арту та 3D-моделювання.",
    },
    {
      q: "Чи можна брати участь безкоштовно?",
      a: "Так, у нас є базовий план для тих, хто просто хоче показати свій талант.",
    },
    {
      q: "Чи є вікові обмеження?",
      a: "Наш проєкт орієнтований на підлітків та молодь віком від 12 до 22 років.",
    },
    {
      q: "Скільки робіт можна завантажити?",
      a: "На безкоштовному плані — 1 роботу на місяць, на Професійному — до 5 робіт одночасно.",
    },
    {
      q: "Як визначаються переможці?",
      a: "Переможців обирає професійне журі разом із глядацьким голосуванням у співвідношенні 70/30.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <section className="mb-24">
          <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter">
            ПРО <span className="text-cyan-500">ARTisCool</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-cyan-500 pl-6">
              Ми створюємо простір, де сучасне мистецтво зустрічається з
              технологіями, а підлітки стають зірками.
            </p>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <p className="text-slate-300">
                Наша мета — об'єднати творчу молодь та дати їм інструменти для
                самовираження. Ми віримо, що мистецтво — це мова, яку розуміють
                усі.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-8 rounded-2xl border border-cyan-500/20">
            <Target className="text-cyan-500 mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-3">Наша місія</h3>
            <p className="text-slate-400 leading-relaxed">
              Надихати на створення нового та підтримувати розвиток художніх
              навичок у будь-якій техніці.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-8 rounded-2xl border border-purple-500/20">
            <Zap className="text-purple-500 mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-3">Хто ми?</h3>
            <p className="text-slate-400 leading-relaxed">
              Команда ентузіастів, які вірять, що мистецтво може змінити світ на
              краще та зробити його яскравішим.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <MessageSquare className="text-cyan-500" />
            <h2 className="text-3xl font-bold">Відгуки учасників</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic text-slate-200">"{t.text}"</p>
                <p className="text-cyan-500 font-bold">— {t.name}</p>
                <div className="absolute -right-4 -bottom-4 opacity-5">
                  <Star size={100} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="text-cyan-500" />
            <h2 className="text-3xl font-bold">Часті запитання</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
