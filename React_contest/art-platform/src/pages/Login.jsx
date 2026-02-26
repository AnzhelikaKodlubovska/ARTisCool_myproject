import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // 1. Відправляємо запит на спеціальний ендпоінт Django
      const response = await axios.post(
        "http://127.0.0.1:8000/api-token-auth/",
        credentials,
      );

      // 2. Отримуємо токен
      const token = response.data.token;

      // 3. Зберігаємо його в браузері
      localStorage.setItem("token", token);
      localStorage.setItem("username", credentials.username);

      alert("Вхід успішний!");

      // 4. Перенаправляємо на головну
      navigate("/");

      // Оновлюємо сторінку, щоб Navbar побачив зміни (це простий спосіб)
      window.location.reload();
    } catch (err) {
      setError("Невірний логін або пароль");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#0a0f1a]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96 border border-blue-500/30"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Вхід у систему
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Логін"
          className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-700 focus:border-blue-500 outline-none text-white"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="w-full p-3 mb-6 bg-gray-800 rounded border border-gray-700 focus:border-blue-500 outline-none text-white"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold transition"
        >
          Увійти
        </button>
      </form>
    </div>
  );
};

export default Login;
