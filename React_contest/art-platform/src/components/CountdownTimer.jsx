import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-center min-w-[80px]">
        <span className="block text-2xl font-bold">{timeLeft.days}</span>
        <span className="text-xs uppercase">Днів</span>
      </div>
      <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-center min-w-[80px]">
        <span className="block text-2xl font-bold">{timeLeft.hours}</span>
        <span className="text-xs uppercase">Годин</span>
      </div>
      <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-center min-w-[80px]">
        <span className="block text-2xl font-bold">{timeLeft.mins}</span>
        <span className="text-xs uppercase">Хвилин</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
