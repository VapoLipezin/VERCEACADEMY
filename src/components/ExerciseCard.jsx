import React, { useState } from "react";

export default function ExerciseCard({ exercise, value = {}, onChange, onStartRest }) {

const [weight, setWeight] = useState("");
const [reps, setReps] = useState("");
const [resting, setResting] = useState(false);
const [timeLeft, setTimeLeft] = useState(exercise.rest);

function startRest(){

if(resting) return;

setResting(true);

let t = exercise.rest;

const interval = setInterval(()=>{

t--;

setTimeLeft(t);

if(t <= 0){
clearInterval(interval);
setResting(false);
setTimeLeft(exercise.rest);
}

},1000);

}

const progress = (timeLeft / exercise.rest) * 100;

return (

<div className="exercise-card">

<h3>{exercise.name}</h3>

<input
type="number"
placeholder="Peso (kg)"
value={weight}
onChange={(e)=>{
setWeight(e.target.value)
onChange?.({ ...value, weight: e.target.value })
}}
/>

<input
type="number"
placeholder="Reps"
value={reps}
onChange={(e)=>{
setReps(e.target.value)
onChange?.({ ...value, doneReps: e.target.value })
}}
/>

<button onClick={()=>{
startRest()
onStartRest?.(exercise.rest)
}}>
Descanso
</button>

{resting && (

<div className="rest-bar">
<div
className="rest-progress"
style={{width: `${progress}%`}}
></div>
</div>

)}

</div>

);
}
