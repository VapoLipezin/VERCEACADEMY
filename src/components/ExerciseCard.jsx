
import {useState} from "react"

export default function ExerciseCard({exercise,saveSeries,history}){

const [weight,setWeight]=useState("")

const seriesCount=history.filter(h=>h.exercise===exercise).length

return(
<div className="card">

<h2>{exercise}</h2>

<div className="series">Séries feitas: {seriesCount}</div>

<input
placeholder="Peso (kg)"
value={weight}
onChange={e=>setWeight(e.target.value)}
/>

<button onClick={()=>{
if(!weight)return
saveSeries(exercise,weight)
setWeight("")
}}>
Adicionar Série
</button>

</div>
)
}
