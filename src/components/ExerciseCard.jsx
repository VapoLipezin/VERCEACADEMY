import React from "react";

export default function ExerciseCard({ exercise, value = {}, onChange, onStartRest }) {
  return (
    <div className="exercise-card">
      <div className="exercise-head">
        <div>
          <h3>{exercise.name}</h3>
          <p>
            {exercise.sets} séries • {exercise.reps} reps • descanso {exercise.rest}s
          </p>
        </div>

        <button
          className="ghost-button"
          onClick={() => onStartRest(exercise.rest)}
        >
          Descanso
        </button>
      </div>

      <div className="exercise-grid">
        <label>
          <span>Carga</span>
          <input
            value={value.weight || ""}
            onChange={(e) =>
              onChange({ ...value, weight: e.target.value })
            }
            placeholder="Ex: 20 kg"
          />
        </label>

        <label>
          <span>Repetições feitas</span>
          <input
            value={value.doneReps || ""}
            onChange={(e) =>
              onChange({ ...value, doneReps: e.target.value })
            }
            placeholder="Ex: 10"
          />
        </label>
      </div>

      <label className="check-row">
        <input
          type="checkbox"
          checked={Boolean(value.completed)}
          onChange={(e) =>
            onChange({ ...value, completed: e.target.checked })
          }
        />
        <span>Concluído</span>
      </label>
    </div>
  );
}
