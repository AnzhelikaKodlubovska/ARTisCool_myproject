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
  Maximize2, // Додана іконка для збільшення
} from "lucide-react";

export default function JuryDashboard() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false); // Стан для повного екрану

  const [scores, setScores] = useState({
    composition: 5,
    technique: 5,
    creativity: 5,
    topic_match: 5,
    comment: "",
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/entries/for_judging/",
        { headers: { Authorization: `Token ${token}` } },
      );
      setEntries(response.data);
    } catch (error) {
      console.error("Помилка завантаження:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (criterion, value) => {
    // Валідація: не дозволяємо вводити більше 10 або менше 1
    let num = parseInt(value);
    if (num > 10) num = 10;
    if (num < 1 || isNaN(num)) num = ""; // Дозволяємо порожнє поле при вводі
    setScores((prev) => ({ ...prev, [criterion]: num }));
  };

  const submitScore = async () => {
    // Перевірка на заповненість (щоб не було пустих значень)
    const { composition, technique, creativity, topic_match } = scores;
    if (!composition || !technique || !creativity || !topic_match) {
      alert("Будь ласка, вкажіть усі оцінки від 1 до 10");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/scores/",
        {
          entry: selectedEntry.id,
          composition: Number(scores.composition),
          technique: Number(scores.technique),
          creativity: Number(scores.creativity),
          topic_match: Number(scores.topic_match),
          comment: scores.comment || "",
        },
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      console.log("Успішно збережено:", response.data);

      // Оновлюємо список робіт
      setEntries(entries.filter((e) => e.id !== selectedEntry.id));
      setSelectedEntry(null);
      setScores({
        composition: 5,
        technique: 5,
        creativity: 5,
        topic_match: 5,
        comment: "",
      });

      alert("Оцінку успішно зафіксовано!");
    } catch (error) {
      // Це допоможе тобі побачити, на що саме лається Django
      console.error("Деталі помилки:", error.response?.data);
      const serverError = error.response?.data
        ? JSON.stringify(error.response.data)
        : "Невідома помилка сервера";
      alert("Помилка при збереженні: " + serverError);
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
              Система незалежного оцінювання
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-xl flex items-center gap-4">
            <Clock size={20} className="text-cyan-500" />
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                Залишилось оцінити
              </p>
              <p className="text-xl font-black">{entries.length} робіт</p>
            </div>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-500"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-black uppercase tracking-widest text-sm"
                >
                  Розглянути детально
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black uppercase truncate">
                  {entry.title}
                </h3>
                <p className="text-slate-500 text-sm font-bold">
                  ID: #{entry.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Judging Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4 md:p-8">
          <div className="bg-[#0f172a] border border-white/10 w-full max-w-6xl h-full max-h-[90vh] rounded-[40px] flex flex-col md:flex-row overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="md:w-3/5 bg-black/20 p-4 md:p-8 flex items-center justify-center relative border-b md:border-r border-white/10 overflow-hidden">
              <div
                className="relative group cursor-zoom-in max-h-full w-full flex justify-center"
                onClick={() => setShowFullImage(true)}
              >
                <img
                  src={selectedEntry.image}
                  className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  alt="Preview"
                />
                {/* Оверлей з іконкою при наведенні */}
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                  <Maximize2 className="text-white drop-shadow-md" size={48} />
                </div>
              </div>
            </div>

            {/* Scoring Section */}
            <div className="md:w-2/5 p-10 overflow-y-auto flex flex-col">
              <h2 className="text-3xl font-black uppercase italic mb-6 text-cyan-500 tracking-tighter">
                {selectedEntry.title}
              </h2>

              <div className="space-y-6">
                {[
                  { label: "Композиція", key: "composition" },
                  { label: "Техніка виконання", key: "technique" },
                  { label: "Креативність", key: "creativity" },
                  { label: "Відповідність темі", key: "topic_match" },
                ].map((criterion) => (
                  <div
                    key={criterion.key}
                    className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5"
                  >
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                      {criterion.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={scores[criterion.key]}
                        onChange={(e) =>
                          handleScoreChange(criterion.key, e.target.value)
                        }
                        className="w-16 bg-cyan-500/10 border border-cyan-500/30 rounded-xl py-2 text-center text-cyan-400 font-black text-xl focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                      <span className="text-slate-600 font-bold">/ 10</span>
                    </div>
                  </div>
                ))}

                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 flex items-center gap-2">
                    <MessageSquare size={14} /> Приватний коментар
                  </label>
                  <textarea
                    value={scores.comment}
                    onChange={(e) =>
                      setScores({ ...scores, comment: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-[24px] focus:border-cyan-500 outline-none transition-all resize-none text-sm"
                    rows="3"
                  />
                </div>
              </div>

              <button
                onClick={submitScore}
                className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >
                Зафіксувати оцінку
              </button>
            </div>
          </div>
        </div>
      )}
      {showFullImage && (
        <div
          className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-0 md:p-4 cursor-zoom-out animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setShowFullImage(false)}
        >
          {/* Кнопка закриття */}
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]">
            <X size={40} />
          </button>

          <img
            src={selectedEntry.image}
            className="w-full h-full object-contain p-2"
            alt="Full view"
          />
        </div>
      )}{" "}
    </div>
  );
}
