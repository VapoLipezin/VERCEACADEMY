
import {useState} from "react"

export default function Timer(){

const [time,setTime]=useState(90)
const [running,setRunning]=useState(false)

function start(){

if(running)return

setRunning(true)

let t=time

const interval=setInterval(()=>{

t--
setTime(t)

if(t<=0){
clearInterval(interval)
setRunning(false)
alert("Descanso finalizado")
}

},1000)

}

return(
<div className="card">

<h2>Descanso</h2>

<h3>{time}s</h3>

<button onClick={start}>Iniciar</button>

</div>
)
}
