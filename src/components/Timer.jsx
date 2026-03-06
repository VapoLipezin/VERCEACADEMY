import { useState } from "react";

export default function Timer(){

const [time,setTime] = useState(90);

const startTimer = () => {

let t = time

const interval = setInterval(()=>{

t--
setTime(t)

if(t<=0){
clearInterval(interval)
alert("Descanso finalizado")
}

},1000)

}

return(

<div className="timer">

<h2>Descanso</h2>

<p>{time}s</p>

<button onClick={startTimer}>
Iniciar
</button>

</div>

)

}
