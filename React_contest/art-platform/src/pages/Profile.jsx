import React from "react";

export default function Profile() {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-400">Ви не авторизовані</h1>
        <a href="/login" className="mt-4 text-cyan-500 underline">
          Увійти в акаунт
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-6 mb-10">
          <div className="h-24 w-24 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-4xl font-black text-[#0a0f1a] shadow-lg shadow-cyan-500/20">
            {username[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white">
              {username}
            </h1>
            <p className="text-cyan-500 font-medium uppercase tracking-widest text-xs mt-1">
              Учасник платформи
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-xs uppercase font-bold mb-1">
              Статус
            </p>
            <p className="text-white font-medium text-lg">Активний</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-xs uppercase font-bold mb-1">
              Роботи
            </p>
            <p className="text-white font-medium text-lg">0 завантажено</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-xs uppercase font-bold mb-1">
              Рейтинг
            </p>
            <p className="text-white font-medium text-lg">--</p>
          </div>
        </div>
      </div>
    </div>
  );
}
