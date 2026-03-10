import React, { useEffect, useMemo, useState } from "react";
import ExerciseCard from "./components/ExerciseCard.jsx";

const STORAGE = {
  split: "app-treino-split-v1",
  plan: "app-treino-plan-v1",
  workouts: "app-treino-workouts-v1",
  profile: "app-treino-profile-v1",
  notes: "app-treino-notes-v1",
};

function safeParse(value, fallback) {
  try {
    return JSON.parse(value) || fallback;
  } catch {
    return fallback;
  }
}

const presets = {
  classic: {
    "Peito + Tríceps": [
      { name: "Supino reto", sets: 4, reps: "8-10", rest: 90 },
      { name: "Supino inclinado", sets: 3, reps: "10-12", rest: 90 },
      { name: "Crucifixo máquina", sets: 3, reps: "12-15", rest: 60 },
      { name: "Tríceps pulley", sets: 3, reps: "10-12", rest: 60 },
      { name: "Tríceps francês", sets: 3, reps: "12-15", rest: 60 },
    ],
    "Costas + Bíceps": [
      { name: "Puxada frontal", sets: 4, reps: "8-10", rest: 90 },
      { name: "Remada baixa", sets: 3, reps: "10-12", rest: 75 },
      { name: "Remada unilateral", sets: 3, reps: "10-12", rest: 75 },
      { name: "Rosca direta", sets: 3, reps: "10-12", rest: 60 },
      { name: "Rosca alternada", sets: 3, reps: "12-15", rest: 60 },
    ],
    "Perna Completa": [
      { name: "Agachamento livre", sets: 4, reps: "8-10", rest: 120 },
      { name: "Leg press", sets: 4, reps: "10-12", rest: 90 },
      { name: "Cadeira extensora", sets: 3, reps: "12-15", rest: 60 },
      { name: "Mesa flexora", sets: 3, reps: "12-15", rest: 60 },
      { name: "Panturrilha em pé", sets: 4, reps: "15-20", rest: 45 },
    ],
    "Ombro + Trapézio": [
      { name: "Desenvolvimento", sets: 4, reps: "8-10", rest: 90 },
      { name: "Elevação lateral", sets: 3, reps: "12-15", rest: 60 },
      { name: "Elevação frontal", sets: 3, reps: "12-15", rest: 60 },
      { name: "Encolhimento", sets: 4, reps: "12-15", rest: 60 },
      { name: "Face pull", sets: 3, reps: "12-15", rest: 60 },
    ],
  },

  hybrid: {
    Push: [
      { name: "Supino reto", sets: 4, reps: "6-8", rest: 120 },
      { name: "Supino inclinado", sets: 3, reps: "8-10", rest: 90 },
      { name: "Desenvolvimento com halteres", sets: 3, reps: "8-10", rest: 75 },
      { name: "Elevação lateral", sets: 3, reps: "12-15", rest: 60 },
      { name: "Tríceps pulley", sets: 3, reps: "10-12", rest: 60 },
    ],

    Pull: [
      { name: "Puxada frontal", sets: 4, reps: "8-10", rest: 90 },
      { name: "Remada curvada", sets: 3, reps: "8-10", rest: 90 },
      { name: "Remada baixa", sets: 3, reps: "10-12", rest: 75 },
      { name: "Face pull", sets: 3, reps: "12-15", rest: 60 },
      { name: "Rosca direta", sets: 3, reps: "10-12", rest: 60 },
    ],

    Legs: [
      { name: "Agachamento livre", sets: 4, reps: "6-8", rest: 120 },
      { name: "Leg press", sets: 4, reps: "10-12", rest: 90 },
      { name: "Cadeira extensora", sets: 3, reps: "12-15", rest: 60 },
      { name: "Mesa flexora", sets: 3, reps: "12-15", rest: 60 },
      { name: "Panturrilha em pé", sets: 4, reps: "15-20", rest: 45 },
    ],
  },
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(total) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function App() {
  const [splitMode, setSplitMode] = useState(
    () => localStorage.getItem(STORAGE.split) || "hybrid"
  );

  const [customPlan, setCustomPlan] = useState(() => {
    const saved = localStorage.getItem(STORAGE.plan);
    return saved ? safeParse(saved, presets.hybrid) : presets[splitMode];
  });

  const [selectedDay, setSelectedDay] = useState(
    () => Object.keys(customPlan)[0]
  );

  const [workouts, setWorkouts] = useState(() =>
    safeParse(localStorage.getItem(STORAGE.workouts), {})
  );

  const [notes, setNotes] = useState(
    () => localStorage.getItem(STORAGE.notes) || ""
  );

  const [profile, setProfile] = useState(() =>
    safeParse(localStorage.getItem(STORAGE.profile), {
      name: "Felipe",
      goal: "Hipertrofia",
      weight: "",
      height: "",
    })
  );

  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("treino");

  useEffect(() => {
    localStorage.setItem(STORAGE.split, splitMode);
  }, [splitMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE.plan, JSON.stringify(customPlan));
  }, [customPlan]);

  useEffect(() => {
    localStorage.setItem(STORAGE.workouts, JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem(STORAGE.notes, notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (!timerRunning) return;

    const id = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [timerRunning]);

  const exercises = customPlan[selectedDay] || [];
  const dayState = workouts[todayKey()]?.[selectedDay] || {};

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);

  const completedSets = exercises.reduce((acc, ex) => {
    const exerciseData = dayState[ex.name];

    if (!exerciseData?.sets) return acc;

    const done = exerciseData.sets.filter((s) => s.completed).length;

    return acc + done;
  }, 0);

  const progress = totalSets
    ? Math.round((completedSets / totalSets) * 100)
    : 0;

  const weeklyDone = useMemo(() => {
    return Object.values(workouts).reduce((acc, splitDays) => {
      return (
        acc +
        Object.values(splitDays).reduce((sum, section) => {
          return sum + Object.values(section).filter((item) => item.completed)
            .length;
        }, 0)
      );
    }, 0);
  }, [workouts]);

  function updateExercise(exerciseName, data) {
    setWorkouts((prev) => ({
      ...prev,
      [todayKey()]: {
        ...(prev[todayKey()] || {}),
        [selectedDay]: {
          ...((prev[todayKey()] || {})[selectedDay] || {}),
          [exerciseName]: data,
        },
      },
    }));
  }

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <header className="hero-card">
          <h1>Bora treinar, {profile.name} 💪</h1>
          <span>Meta: {profile.goal}</span>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <span>Progresso</span>
            <strong>{progress}%</strong>

            <div className="progress-track">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </article>

          <article className="stat-card">
            <span>Concluídos</span>
            <strong>{weeklyDone}</strong>
          </article>
        </section>

        <section className="timer-card">
          <div>{formatTime(timerSeconds)}</div>

          <button onClick={() => setTimerRunning((prev) => !prev)}>
            {timerRunning ? "Pausar" : "Iniciar"}
          </button>

          <button
            onClick={() => {
              setTimerRunning(false);
              setTimerSeconds(60);
            }}
          >
            Reset
          </button>
        </section>

        <section className="exercise-list">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              value={dayState[exercise.name] || {}}
              onChange={(value) => updateExercise(exercise.name, value)}
              onStartRest={(seconds) => {
                setTimerSeconds(seconds);
                setTimerRunning(true);
              }}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
