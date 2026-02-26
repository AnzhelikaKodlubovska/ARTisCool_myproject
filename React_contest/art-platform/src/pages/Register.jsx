import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "teen",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Реєструємо користувача
      await axios.post("http://127.0.0.1:8000/api/users/", formData);

      // 2. Отримуємо токен (щоб сайт "впізнав" користувача без введення пароля знову)
      const loginRes = await axios.post(
        "http://127.0.0.1:8000/api-token-auth/",
        {
          username: formData.username,
          password: formData.password,
        },
      );

      // 3. Зберігаємо дані в браузері
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("username", formData.username);

      // 4. Замість navigate("/login"), ми просто кажемо "Успіх"
      // і або лишаємось тут, або йдемо на головну/профіль
      alert(`Вітаємо, ${formData.username}! Ви успішно зареєстровані.`);

      navigate("/"); // Ведемо на головну, де в Navbar вже буде його ім'я
      window.location.reload(); // Оновлюємо сторінку, щоб Navbar перемалювався
    } catch (err) {
      // Якщо помилка прийшла від логіна або реєстрації
      const errorMsg =
        err.response?.data?.username?.[0] || "Помилка реєстрації";
      setError(errorMsg);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#0a0f1a]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl border border-cyan-500/30 w-96 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400 font-black uppercase tracking-tighter">
          Реєстрація
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Логін"
          className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-700 text-white outline-none focus:border-cyan-500"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-700 text-white outline-none focus:border-cyan-500"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-700 text-white outline-none focus:border-cyan-500"
          onChange={handleChange}
          required
        />

        <label className="text-gray-400 text-sm mb-2 block">Хто ви?</label>
        <select
          name="role"
          className="w-full p-3 mb-6 bg-gray-800 rounded border border-gray-700 text-white outline-none focus:border-cyan-500"
          onChange={handleChange}
        >
          <option value="teen">Підліток (Учасник)</option>
          <option value="jury">Член журі</option>
        </select>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-[#0a0f1a] p-3 rounded-full font-bold hover:bg-cyan-400 transition shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          Створити аккаунт
        </button>
      </form>
    </div>
  );
};

export default Register;
