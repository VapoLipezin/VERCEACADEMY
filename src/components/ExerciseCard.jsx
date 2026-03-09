import React from "react";

export default function ExerciseCard({ exercise, value = {}, onChange, onStartRest }) {

const sets = value.sets || Array.from({ length: exercise.sets }, () => ({
  weight: "",
  reps: "",
  completed: false
}));

function updateSet(index, field, val){
  const updated = [...sets];
  updated[index] = { ...updated[index], [field]: val };

  onChange({
    ...value,
    sets: updated
  });
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

<button onClick={() => onStartRest(exercise.rest)}>
Descanso
</button>
</div>

{sets.map((set, i) => (
<div key={i} className="set-row">

<span>Série {i+1}</span>

<input
placeholder="kg"
value={set.weight}
onChange={(e)=>updateSet(i,"weight",e.target.value)}
/>

<input
placeholder="reps"
value={set.reps}
onChange={(e)=>updateSet(i,"reps",e.target.value)}
/>

<input
type="checkbox"
checked={set.completed}
onChange={(e)=>updateSet(i,"completed",e.target.checked)}
/>

</div>
))}

</div>
);
}
