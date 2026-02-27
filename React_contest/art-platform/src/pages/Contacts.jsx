import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

export default function Contacts() {
  // 1. Стан для полів форми
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 2. Стан для статусу відправки
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // 3. Обробник зміни полів
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 4. Обробник відправки
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/contact/", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: "Запит через сайт", // Автоматичне поле для моделі
      });

      if (response.status === 201) {
        setStatusMessage({
          type: "success",
          text: "Повідомлення успішно надіслано!",
        });
        setFormData({ name: "", email: "", message: "" }); // Очищення
      }
    } catch (error) {
      console.error("Error:", error.response?.data);
      setStatusMessage({
        type: "error",
        text: "Помилка при відправці. Спробуйте ще раз.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
            Зв'яжіться з нами
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Маєте запитання щодо конкурсу чи технічні труднощі? Наша команда
            готова допомогти.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Контактна інформація (залишається як була) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 text-cyan-500">
                Наші координати
              </h3>
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
              </div>
            </div>
          </div>

          {/* Форма зворотного зв'язку */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-sm space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Ваше ім'я
                  </label>
                  <input
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
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
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                  id="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Опишіть ваше запитання..."
                  rows="5"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white resize-none"
                ></textarea>
              </div>

              {/* Повідомлення про успіх/помилку */}
              {statusMessage.text && (
                <div
                  className={`p-4 rounded-xl text-sm font-bold ${statusMessage.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                >
                  {statusMessage.text}
                </div>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-cyan-500 disabled:bg-slate-700 text-[#0a0f1a] py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
                {loading ? "Надсилаємо..." : "Надіслати повідомлення"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
