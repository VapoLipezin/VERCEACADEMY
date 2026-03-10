import React, { useEffect } from "react";

export default function ExerciseCard({ exercise, value = {}, onChange, onStartRest }) {

  const sets = value.sets || Array.from({ length: exercise.sets }, () => ({
    weight: "",
    reps: "",
    completed: false
  }));

  // cria as séries automaticamente quando o exercício aparece
  useEffect(() => {
    if (!value.sets) {
      onChange({
        ...value,
        sets: Array.from({ length: exercise.sets }, () => ({
          weight: "",
          reps: "",
          completed: false
        }))
      });
    }
  }, [exercise.sets]);

  function updateSet(index, field, val) {
    const updated = [...sets];
    updated[index] = { ...updated[index], [field]: val };

    onChange({
      ...value,
      sets: updated
    });
  }

  function toggleSet(index) {
    const updated = [...sets];
    updated[index] = {
      ...updated[index],
      completed: !updated[index].completed
    };

    onChange({
      ...value,
      sets: updated
    });
  }

  // progresso do exercício
  const completedSets = sets.filter(s => s.completed).length;
  const progress = (completedSets / exercise.sets) * 100;

  return (
    <div className="exercise-card">

      <div className="exercise-head">
        <div>
          <h3>{exercise.name}</h3>
          <p>
            {exercise.sets} séries • {exercise.reps} reps • descanso {exercise.rest}s
          </p>

          {/* barra de progresso */}
          <div className="exercise-progress">
            <div
              className="exercise-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

        <button onClick={() => onStartRest(exercise.rest)}>
          Descanso
        </button>
      </div>

      {sets.map((set, i) => (
        <div key={i} className="set-row">

          <span>Série {i + 1}</span>

          <input
            placeholder="kg"
            value={set.weight}
            onChange={(e) => updateSet(i, "weight", e.target.value)}
          />

          <input
            placeholder="reps"
            value={set.reps}
            onChange={(e) => updateSet(i, "reps", e.target.value)}
          />

          <button
            className={`set-check ${set.completed ? "done" : ""}`}
            onClick={() => toggleSet(i)}
          >
            {set.completed ? "✓" : ""}
          </button>

        </div>
      ))}

    </div>
  );
}
