import { useState, useEffect } from "react";

export default function AssistantBubble() {
  const [frame, setFrame] = useState(1);
  const [isVisible, setIsVisible] = useState(false); // Стан для появи/зникнення

  // 1. Анімація кадрів (завжди працює, щоб персонаж був "живим" у момент появи)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev % 4) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 2. Логіка випадкової появи
  useEffect(() => {
    const toggleVisibility = () => {
      if (isVisible) {
        // Якщо персонаж з'явився, ховаємо його через 20 секунд
        const hideTimer = setTimeout(() => setIsVisible(false), 20000);
        return () => clearTimeout(hideTimer);
      } else {
        // Якщо він схований, чекаємо випадковий час (20-40 сек) і показуємо знову
        const randomDelay = Math.floor(Math.random() * (40000 - 20000) + 20000);
        const showTimer = setTimeout(() => setIsVisible(true), randomDelay);
        return () => clearTimeout(showTimer);
      }
    };

    toggleVisibility();
  }, [isVisible]);

  const goToShop = () => {
    window.open("https://rosa.ua/", "_blank");
  };

  return (
    <div
      className={`fixed bottom-10 right-10 z-[100] cursor-pointer group transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-40 pointer-events-none"
      }`}
      onClick={goToShop}
    >
      {/* Хмарка тексту */}
      <div className="absolute -top-24 right-10 bg-white text-black px-6 py-3 rounded-2xl text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl z-10">
        За фарбами? 🎨
        <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white rotate-45"></div>
      </div>

      {/* Твій персонаж */}
      <div className="relative w-48 h-48 md:w-80 md:h-80">
        <img
          src={`/assets/frame${frame}.png`}
          alt="Assistant"
          className="w-full h-full object-contain animate-bounce-slow filter"
          style={{
            filter: `
              drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)) 
              drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))
            `,
          }}
        />

        {/* Іконка кошика */}
        <div className="absolute bottom-5 left-5 bg-yellow-400 p-4 rounded-full shadow-2xl text-2xl animate-pulse">
          🛒
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
