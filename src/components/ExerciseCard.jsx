import { useState } from "react";

export default function ExerciseCard({exercise,saveWorkout}){

const [weight,setWeight] = useState("");

return(

<div className="card">

<h2>{exercise}</h2>

<input
type="number"
placeholder="Peso (kg)"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
/>

<button
onClick={()=>{

saveWorkout(exercise,weight)
setWeight("")

}}
>

Salvar Série

</button>

</div>

)

}
