import React from "react";
import { getSuggestedWeight } from "../utils/progression";

export default function ExerciseCard({ exercise, value = {}, onChange, onStartRest }) {

  const sets = value.sets || Array.from({ length: exercise.sets }, () => ({
    weight: "",
    reps: "",
    done: false
  }));

  function updateSet(index, field, newValue){
    const newSets = [...sets];
    newSets[index][field] = newValue;
    onChange({ ...value, sets: newSets });
  }

  function toggleSet(index){
    const newSets = [...sets];
    newSets[index].done = !newSets[index].done;
    onChange({ ...value, sets: newSets });
  }

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
          className="primary-button"
          onClick={() => onStartRest(exercise.rest)}
        >
          Descanso
        </button>
      </div>

      <div className="sets-container">

        {sets.map((set, index) => (

          <div className="set-row" key={index}>

            <span>Série {index + 1}</span>

            <input
              placeholder="kg"
              value={set.weight}
              onChange={(e)=>updateSet(index,"weight",e.target.value)}
            />

            <input
              placeholder="reps"
              value={set.reps}
              onChange={(e)=>updateSet(index,"reps",e.target.value)}
            />

            <input
              type="checkbox"
              checked={set.done}
              onChange={()=>toggleSet(index)}
            />

          </div>

        ))}

      </div>

    </div>
  );
}
