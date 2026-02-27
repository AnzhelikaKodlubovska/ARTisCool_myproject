import { Upload, ImageIcon, User, Mail, MapPin, Hash } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    email: "", // Додано в стан
    title: "",
    category: "Класика",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!image) {
      setError("Будь ласка, оберіть малюнок");
      return;
    }

    const data = new FormData();
    data.append("image", image);
    data.append("title", formData.title);
    data.append("email", formData.email);
    data.append("first_name", formData.firstName);
    data.append("last_name", formData.lastName);
    data.append("age", formData.age);
    data.append("city", formData.city);

    try {
      await axios.post("http://127.0.0.1:8000/api/entries/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
      alert("Роботу успішно опубліковано!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Помилка завантаження. Перевірте поля або авторизацію.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-2xl">
        <div className="flex items-center gap-4 mb-10 ml-4">
          <div className="bg-cyan-500/20 p-3 rounded-2xl">
            <Upload className="text-cyan-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight italic">
              UPLOAD ART
            </h1>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">
              Анкета учасника
            </p>
          </div>
        </div>

        {error && (
          <p className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-2xl mb-6 text-center font-bold">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Контактні дані */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <User size={14} className="text-cyan-500" /> Ім'я
              </label>
              <input
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Олександр"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <Mail size={14} className="text-cyan-500" /> Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="art@example.com"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
              />
            </div>
          </div>

          {/* Додаткова інформація */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <Hash size={14} className="text-cyan-500" /> Вік
              </label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <MapPin size={14} className="text-cyan-500" /> Місто
              </label>
              <input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Київ"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
              />
            </div>
          </div>

          {/* Робота */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                <ImageIcon size={14} className="text-cyan-500" /> Назва роботи
              </label>
              <input
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">
                Файл малюнка
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-slate-400 text-sm file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-cyan-500 file:text-[#0a0f1a] file:font-black hover:file:bg-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-[#0a0f1a] py-6 rounded-3xl font-black text-xl hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all active:scale-[0.98] uppercase tracking-[0.2em]"
          >
            Завантажити
          </button>
        </form>
      </div>
    </div>
  );
}
