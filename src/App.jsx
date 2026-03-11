import React, { useEffect, useMemo, useState } from 'react';
import ExerciseCard from "./components/ExerciseCard.jsx";

const presets = {
  classic: {
    'Peito + Tríceps': [
      { name: 'Supino reto', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Supino inclinado', sets: 3, reps: '10-12', rest: 90 },
      { name: 'Crucifixo máquina', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Tríceps pulley', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Tríceps francês', sets: 3, reps: '12-15', rest: 60 },
    ],
    'Costas + Bíceps': [
      { name: 'Puxada frontal', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Remada baixa', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Remada unilateral', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Rosca direta', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Rosca alternada', sets: 3, reps: '12-15', rest: 60 },
    ],
    'Perna Completa': [
      { name: 'Agachamento livre', sets: 4, reps: '8-10', rest: 120 },
      { name: 'Leg press', sets: 4, reps: '10-12', rest: 90 },
      { name: 'Cadeira extensora', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Mesa flexora', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Panturrilha em pé', sets: 4, reps: '15-20', rest: 45 },
    ],
    'Ombro + Trapézio': [
      { name: 'Desenvolvimento', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Elevação lateral', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Elevação frontal', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Encolhimento', sets: 4, reps: '12-15', rest: 60 },
      { name: 'Face pull', sets: 3, reps: '12-15', rest: 60 },
    ],
  },
  ppl5x: {
    'Push A': [
      { name: 'Supino reto', sets: 4, reps: '6-8', rest: 120 },
      { name: 'Supino inclinado com halteres', sets: 3, reps: '8-10', rest: 90 },
      { name: 'Desenvolvimento máquina', sets: 3, reps: '8-10', rest: 75 },
      { name: 'Elevação lateral', sets: 4, reps: '12-15', rest: 60 },
      { name: 'Tríceps pulley', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Tríceps francês', sets: 3, reps: '12-15', rest: 60 },
    ],
    'Pull A': [
      { name: 'Puxada frontal', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Remada curvada', sets: 3, reps: '8-10', rest: 90 },
      { name: 'Remada baixa', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Face pull', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Rosca direta', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Rosca martelo', sets: 3, reps: '12-15', rest: 60 },
    ],
    'Legs': [
      { name: 'Agachamento livre', sets: 4, reps: '6-8', rest: 120 },
      { name: 'Leg press', sets: 4, reps: '10-12', rest: 90 },
      { name: 'Cadeira extensora', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Mesa flexora', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Stiff', sets: 3, reps: '8-10', rest: 90 },
      { name: 'Panturrilha sentado', sets: 4, reps: '15-20', rest: 45 },
    ],
    'Push B': [
      { name: 'Supino inclinado', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Crucifixo máquina', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Desenvolvimento com halteres', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Elevação lateral unilateral', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Tríceps corda', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Mergulho máquina', sets: 3, reps: '12-15', rest: 60 },
    ],
    'Pull B': [
      { name: 'Barra assistida ou puxada supinada', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Remada unilateral', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Pulldown', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Crucifixo invertido', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Rosca alternada', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Rosca concentrada', sets: 3, reps: '12-15', rest: 60 },
    ],
  },
  hybrid: {
    'Push': [
      { name: 'Supino reto', sets: 4, reps: '6-8', rest: 120 },
      { name: 'Supino inclinado', sets: 3, reps: '8-10', rest: 90 },
      { name: 'Desenvolvimento com halteres', sets: 3, reps: '8-10', rest: 75 },
      { name: 'Elevação lateral', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Tríceps pulley', sets: 3, reps: '10-12', rest: 60 },
    ],
    'Pull': [
      { name: 'Puxada frontal', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Remada curvada', sets: 3, reps: '8-10', rest: 90 },
      { name: 'Remada baixa', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Face pull', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Rosca direta', sets: 3, reps: '10-12', rest: 60 },
    ],
    'Legs': [
      { name: 'Agachamento livre', sets: 4, reps: '6-8', rest: 120 },
      { name: 'Leg press', sets: 4, reps: '10-12', rest: 90 },
      { name: 'Cadeira extensora', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Mesa flexora', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Panturrilha em pé', sets: 4, reps: '15-20', rest: 45 },
    ],
    'Upper': [
      { name: 'Supino máquina', sets: 3, reps: '8-10', rest: 75 },
      { name: 'Remada baixa', sets: 3, reps: '8-10', rest: 75 },
      { name: 'Desenvolvimento máquina', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Puxada neutra', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Rosca alternada', sets: 2, reps: '12-15', rest: 60 },
      { name: 'Tríceps corda', sets: 2, reps: '12-15', rest: 60 },
    ],
    'Lower': [
      { name: 'Agachamento hack', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Stiff', sets: 3, reps: '8-10', rest: 90 },
      { name: 'Afundo', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Mesa flexora', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Panturrilha sentado', sets: 4, reps: '15-20', rest: 45 },
    ],
  },
};

function getWeekKey(date = new Date()) {
  const first = new Date(date.setDate(date.getDate() - date.getDay()));
  return first.toISOString().slice(0,10);
}

const weeklyProgress = useMemo(() => {

  const planDays = Object.keys(customPlan);
  const totalDays = planDays.length;

  const doneDays = Object.values(workouts).reduce((acc, day) => {
    return acc + Object.keys(day).length;
  }, 0);

  return Math.min(100, Math.round((doneDays / totalDays) * 100));

}, [workouts, customPlan]);

const STORAGE = {
  split: 'app-treino-split-v1',
  plan: 'app-treino-plan-v1',
  workouts: 'app-treino-workouts-v1',
  profile: 'app-treino-profile-v1',
  notes: 'app-treino-notes-v1',
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(total) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


export default function App() {
  const [splitMode, setSplitMode] = useState(() => localStorage.getItem(STORAGE.split) || 'hybrid');
  const [customPlan, setCustomPlan] = useState(() => {
    const saved = localStorage.getItem(STORAGE.plan);
    return saved ? JSON.parse(saved) : presets[localStorage.getItem(STORAGE.split) || 'hybrid'];
  });
  const [selectedDay, setSelectedDay] = useState(() => Object.keys(customPlan)[0]);
  const [workouts, setWorkouts] = useState(() => JSON.parse(localStorage.getItem(STORAGE.workouts) || '{}'));
  const [notes, setNotes] = useState(() => localStorage.getItem(STORAGE.notes) || '');
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem(STORAGE.profile) || '{"name":"Felipe","goal":"Hipertrofia","weight":"","height":""}'));
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('treino');
  const [newExercise, setNewExercise] = useState({
    section: Object.keys(customPlan)[0],
    name: '',
    sets: '',
    reps: '',
    rest: '60',
  });

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

  useEffect(() => {
    const keys = Object.keys(customPlan);
    if (!keys.includes(selectedDay)) {
      setSelectedDay(keys[0]);
    }
    if (!keys.includes(newExercise.section)) {
      setNewExercise((prev) => ({ ...prev, section: keys[0] }));
    }
  }, [customPlan, selectedDay, newExercise.section]);

  const exercises = customPlan[selectedDay] || [];
  const dayState = workouts[todayKey()]?.[selectedDay] || {};

 const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);

const completedSets = exercises.reduce((acc, ex) => {
  const exerciseState = dayState[ex.name];

  if (!exerciseState?.sets) return acc;

  const doneSets = exerciseState.sets.filter((s) => s.completed).length;

  return acc + doneSets;
}, 0);

const progress = totalSets ? Math.round((completedSets / totalSets) * 100) : 0;

  const weeklyDone = useMemo(() => {
    return Object.values(workouts).reduce((acc, splitDays) => {
      return (
        acc +
        Object.values(splitDays).reduce((sum, section) => {
          return sum + Object.values(section).filter((item) => item.completed).length;
        }, 0)
      );
    }, 0);
  }, [workouts]);

  const splitLabel = {
    classic: 'Clássico',
    ppl5x: 'PPL 5x',
    hybrid: 'PPL + Upper + Lower',
  }[splitMode];

  function handleSplitChange(value) {
    setSplitMode(value);
    setCustomPlan(presets[value]);
    setSelectedDay(Object.keys(presets[value])[0]);
    setNewExercise({
      section: Object.keys(presets[value])[0],
      name: '',
      sets: '',
      reps: '',
      rest: '60',
    });
  }

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

  function resetWorkout() {
    setWorkouts((prev) => ({
      ...prev,
      [todayKey()]: {
        ...(prev[todayKey()] || {}),
        [selectedDay]: {},
      },
    }));
  }

  function addExercise() {
    if (!newExercise.name.trim()) return;
    const payload = {
      name: newExercise.name.trim(),
      sets: Number(newExercise.sets) || 3,
      reps: newExercise.reps || '10-12',
      rest: Number(newExercise.rest) || 60,
    };
    setCustomPlan((prev) => ({
      ...prev,
      [newExercise.section]: [...(prev[newExercise.section] || []), payload],
    }));
    setNewExercise((prev) => ({ ...prev, name: '', sets: '', reps: '', rest: '60' }));
    setActiveTab('plano');
  }

  function deleteExercise(section, name) {
    setCustomPlan((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.name !== name),
    }));
  }

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <header className="hero-card">
          <div>
            <span className="eyebrow">Seu personal trainer virtual</span>
            <h1>Bora treinar, {profile.name} ✨</h1>
            <div className="hero-badges">
              <span className="badge">Meta: {profile.goal}</span>
              <span className="badge">Divisão: {splitLabel}</span>
            </div>
          </div>
          <div className="hero-icon">🏋️</div>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <span className="stat-label">Progresso</span>
            <strong>{progress}%</strong>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-label">Concluídos</span>
            <strong>{weeklyDone}</strong>
            <small>exercícios marcados</small>
          </article>
        </section>

        <section className="timer-card">
          <div>
            <span className="stat-label">Cronômetro de descanso</span>
            <div className="timer-value">{formatTime(timerSeconds)}</div>
          </div>
          <div className="timer-actions">
            <button className="primary-button" onClick={() => setTimerRunning((prev) => !prev)}>
              {timerRunning ? 'Pausar' : 'Iniciar'}
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(60);
              }}
            >
              Resetar
            </button>
          </div>
        </section>

        <nav className="tab-bar">
          {['treino', 'semana', 'plano', 'perfil', 'notas'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === 'treino' && (
          <section className="panel">
            <div className="panel-card">
              <label>
                <span>Divisão de treino</span>
                <select value={splitMode} onChange={(e) => handleSplitChange(e.target.value)}>
                  <option value="classic">Clássico</option>
                  <option value="ppl5x">PPL 5x</option>
                  <option value="hybrid">PPL + Upper + Lower</option>
                </select>
              </label>

              <label>
                <span>Treino do dia</span>
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                  {Object.keys(customPlan).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>

              <button className="secondary-button full" onClick={resetWorkout}>
                Limpar treino do dia
              </button>
            </div>

            <div className="exercise-list">
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
            </div>
          </section>
        )}

        {activeTab === 'plano' && (
          <section className="panel">
            <div className="panel-card">
              <h2>Adicionar exercício</h2>
              <label>
                <span>Dia</span>
                <select
                  value={newExercise.section}
                  onChange={(e) => setNewExercise((prev) => ({ ...prev, section: e.target.value }))}
                >
                  {Object.keys(customPlan).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Nome do exercício</span>
                <input
                  value={newExercise.name}
                  onChange={(e) => setNewExercise((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Supino inclinado"
                />
              </label>

              <div className="mini-grid">
                <label>
                  <span>Séries</span>
                  <input
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise((prev) => ({ ...prev, sets: e.target.value }))}
                    placeholder="3"
                  />
                </label>
                <label>
                  <span>Reps</span>
                  <input
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise((prev) => ({ ...prev, reps: e.target.value }))}
                    placeholder="10-12"
                  />
                </label>
                <label>
                  <span>Descanso</span>
                  <input
                    value={newExercise.rest}
                    onChange={(e) => setNewExercise((prev) => ({ ...prev, rest: e.target.value }))}
                    placeholder="60"
                  />
                </label>
              </div>

              <button className="primary-button full" onClick={addExercise}>
                Salvar exercício
              </button>
            </div>

            {Object.entries(customPlan).map(([section, items]) => (
              <div key={section} className="panel-card">
                <h2>{section}</h2>
                <div className="plan-list">
                  {items.map((item) => (
                    <div key={item.name} className="plan-row">
                      <div>
                        <strong>{item.name}</strong>
                        <p>{item.sets} séries • {item.reps} • {item.rest}s</p>
                      </div>
                      <button className="ghost-button" onClick={() => deleteExercise(section, item.name)}>
                        Excluir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'semana' && (
  <section className="panel">

    <div className="panel-card">
      <h2>Progresso da semana</h2>

      <div className="progress-track">
        <div
          className="progress-bar"
          style={{ width: `${weeklyProgress}%` }}
        />
      </div>

      <strong>{weeklyProgress}% concluído</strong>

    </div>

    {Object.keys(customPlan).map(day => {

      const done = Object.values(workouts).some(d => d[day]);

      return (
        <div key={day} className="plan-row">
          <strong>{day}</strong>
          <span>{done ? "✅ feito" : "⬜ pendente"}</span>
        </div>
      );

    })}

  </section>
)}

        {activeTab === 'perfil' && (
          <section className="panel">
            <div className="panel-card">
              <h2>Seu perfil</h2>
              <label>
                <span>Nome</span>
                <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </label>
              <label>
                <span>Meta</span>
                <input value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })} />
              </label>
              <div className="mini-grid two">
                <label>
                  <span>Peso</span>
                  <input value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} />
                </label>
                <label>
                  <span>Altura</span>
                  <input value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} />
                </label>
              </div>
              <div className="info-box">
                O app salva seus dados no navegador. No iPhone, abrindo sempre pelo mesmo link no Safari, seus dados ficam guardados.
              </div>
            </div>
          </section>
        )}

        {activeTab === 'notas' && (
          <section className="panel">
            <div className="panel-card">
              <h2>Diário de treino</h2>
              <label>
                <span>Anotações</span>
                <textarea
                  rows="7"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Cargas, sensação do treino, evolução, observações..."
                />
              </label>
              <div className="info-box">
                Sugestão PPL 5x: Push A, Pull A, Legs, Push B e Pull B.
                <br />
                Sugestão híbrida: Push, Pull, Legs, Upper e Lower.
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
