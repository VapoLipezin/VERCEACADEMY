
import {useState,useEffect} from "react"
import ExerciseCard from "./components/ExerciseCard"
import Timer from "./components/Timer"
import Dashboard from "./components/Dashboard"

const workoutSplit={
A:["Supino","Tríceps","Peito Inclinado"],
B:["Agachamento","Leg Press","Panturrilha"],
C:["Costas","Rosca Bíceps","Remada"]
}

export default function App(){

const [history,setHistory]=useState(()=>{
const data=localStorage.getItem("history")
return data?JSON.parse(data):[]
})

const [day,setDay]=useState("A")

useEffect(()=>{
localStorage.setItem("history",JSON.stringify(history))
},[history])

function saveSeries(exercise,weight){

const entry={
exercise,
weight:Number(weight),
date:new Date().toLocaleDateString()
}

setHistory([...history,entry])
}

return(
<div className="container">

<h1>Treino Tracker PRO 💪</h1>

<select value={day} onChange={e=>setDay(e.target.value)}>
<option value="A">Treino A</option>
<option value="B">Treino B</option>
<option value="C">Treino C</option>
</select>

<Timer/>

{workoutSplit[day].map(ex=>(
<ExerciseCard
key={ex}
exercise={ex}
history={history}
saveSeries={saveSeries}
/>
))}

<Dashboard history={history}/>

</div>
)
}
