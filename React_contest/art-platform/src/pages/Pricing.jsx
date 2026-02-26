import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const plans = [
    {
      name: "Базовий",
      price: "0",
      features: [
        "Участь у конкурсі",
        "Публікація в галереї",
        "Відгуки спільноти",
      ],
      notIncluded: ["Призи", "Офіційний сертифікат", "Детальний фідбек журі"],
      buttonText: "Обрати Безкоштовно",
      link: "/upload?plan=free",
    },
    {
      name: "Професійний",
      price: "450",
      features: [
        "Участь у конкурсі",
        "Публікація в галереї",
        "Боротьба за призи",
        "Сертифікат учасника",
        "Аналіз роботи від журі",
      ],
      notIncluded: [],
      buttonText: "Стати учасником",
      link: "/upload?plan=pro",
      popular: true,
    },
  ];

  return (
    <div className="py-20 px-6 bg-[#0a0f1a] min-h-screen text-white">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Оберіть свій формат участі</h2>
        <p className="text-slate-400">
          Мистецтво доступне кожному, але професійний розвиток потребує
          підтримки
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-8 rounded-3xl border ${plan.popular ? "border-cyan-500 bg-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.1)]" : "border-white/10 bg-white/5"}`}
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="text-4xl font-black mb-6">{plan.price} грн</div>
            <ul className="space-y-4 mb-10">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-slate-300 text-sm"
                >
                  <Check className="text-green-500" size={18} /> {f}
                </li>
              ))}
              {plan.notIncluded.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-slate-500 text-sm opacity-50"
                >
                  <X size={18} /> {f}
                </li>
              ))}
            </ul>
            <Link
              to={plan.link}
              className={`block text-center py-4 rounded-xl font-bold transition-all ${plan.popular ? "bg-cyan-500 text-black hover:bg-cyan-400" : "bg-white/10 hover:bg-white/20"}`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
