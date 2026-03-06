import { useState } from "react";
import ExerciseCard from "./components/ExerciseCard";
import Timer from "./components/Timer";
import History from "./components/History";

export default function App(){

const [history,setHistory] = useState([]);

const saveWorkout = (exercise, weight) => {

const entry = {
exercise,
weight,
date:new Date().toLocaleDateString()
}

setHistory([...history,entry])

}

return(

<div className="container">

<h1>Treino Tracker 💪</h1>

<Timer/>

<ExerciseCard exercise="Supino" saveWorkout={saveWorkout}/>
<ExerciseCard exercise="Agachamento" saveWorkout={saveWorkout}/>
<ExerciseCard exercise="Rosca Bíceps" saveWorkout={saveWorkout}/>

<History history={history}/>

</div>

)

}
