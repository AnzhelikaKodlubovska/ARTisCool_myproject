import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  Eye,
  CheckCircle,
  Clock,
  X,
  Award,
  MessageSquare,
} from "lucide-react";

export default function JuryDashboard() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Стан для оцінок
  const [scores, setScores] = useState({
    composition: 5,
    technique: 5,
    creativity: 5,
    topic_match: 5,
    comment: "",
  });

  // Завантаження робіт
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/entries/for_judging/",
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      setEntries(response.data);
    } catch (error) {
      console.error("Помилка завантаження:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (criterion, value) => {
    setScores((prev) => ({ ...prev, [criterion]: parseInt(value) }));
  };

  const submitScore = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/scores/",
        {
          entry: selectedEntry.id,
          ...scores,
        },
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      // Видаляємо оцінену роботу зі списку та закриваємо модалку
      setEntries(entries.filter((e) => e.id !== selectedEntry.id));
      setSelectedEntry(null);
      // Скидаємо повзунки для наступної роботи
      setScores({
        composition: 5,
        technique: 5,
        creativity: 5,
        topic_match: 5,
        comment: "",
      });
    } catch (error) {
      alert("Не вдалося зберегти оцінку. Перевірте з'єднання.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center text-cyan-500 font-black uppercase tracking-widest">
        Завантаження арт-об'єктів...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
              Jury <span className="text-cyan-500">Terminal</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Система незалежного оцінювання конкурсних робіт
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-xl flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-500">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                Залишилось оцінити
              </p>
              <p className="text-xl font-black">{entries.length} робіт</p>
            </div>
          </div>
        </header>

        {/* Empty State */}
        {entries.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
            <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold">Всі роботи оцінено!</h2>
            <p className="text-slate-500">
              Ви виконали свою місію на сьогодні.
            </p>
          </div>
        )}

        {/* Entries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-80" />
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="absolute bottom-6 left-6 right-6 bg-white text-black py-4 rounded-2xl font-black uppercase text-sm tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                >
                  Розглянути детально
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black uppercase mb-1 truncate">
                  {entry.title}
                </h3>
                <p className="text-slate-500 text-sm font-bold tracking-tight">
                  ID: #{entry.id.toString().padStart(4, "0")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Judging Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-white/10 w-full max-w-6xl h-full max-h-[90vh] rounded-[40px] flex flex-col md:flex-row overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left side: Image View */}
            <div className="md:w-3/5 bg-black/40 p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-white/10">
              <img
                src={selectedEntry.image}
                className="max-h-full max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                alt="Full preview"
              />
              <div className="absolute bottom-8 left-8 flex gap-4">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] uppercase text-slate-500 font-black mb-1">
                    Технічні параметри
                  </p>
                  <p className="text-sm font-bold">
                    Original Submission Aspect Ratio
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Scoring UI */}
            <div className="md:w-2/5 p-10 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tighter text-cyan-500">
                    {selectedEntry.title}
                  </h2>
                  <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg text-xs font-bold text-slate-400">
                    <Award size={14} />
                    FINAL ROUND JUDGING
                  </div>
                </div>

                <div className="space-y-8">
                  {[
                    { label: "Композиція", key: "composition" },
                    { label: "Техніка виконання", key: "technique" },
                    { label: "Креативність", key: "creativity" },
                    { label: "Відповідність темі", key: "topic_match" },
                  ].map((criterion) => (
                    <div key={criterion.key} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs uppercase font-black tracking-widest text-slate-400">
                          {criterion.label}
                        </label>
                        <span className="text-2xl font-black text-cyan-500">
                          {scores[criterion.key]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={scores[criterion.key]}
                        onChange={(e) =>
                          handleScoreChange(criterion.key, e.target.value)
                        }
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
                      />
                    </div>
                  ))}

                  <div className="space-y-3">
                    <label className="text-xs uppercase font-black tracking-widest text-slate-400 flex items-center gap-2">
                      <MessageSquare size={14} />
                      Приватний коментар
                    </label>
                    <textarea
                      value={scores.comment}
                      onChange={(e) =>
                        setScores({ ...scores, comment: e.target.value })
                      }
                      placeholder="Опишіть ваші враження..."
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-[24px] focus:border-cyan-500 outline-none transition-all resize-none text-sm leading-relaxed"
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={submitScore}
                className="mt-10 w-full bg-cyan-500 hover:bg-cyan-400 text-black py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(6,182,212,0.3)] transition-all active:scale-95"
              >
                Зафіксувати оцінку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
