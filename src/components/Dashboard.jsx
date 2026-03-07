
import {useEffect,useRef} from "react"

export default function Dashboard({history}){

const canvasRef=useRef()

useEffect(()=>{

if(!canvasRef.current)return

const grouped={}

history.forEach(h=>{
if(!grouped[h.exercise])grouped[h.exercise]=[]
grouped[h.exercise].push(h.weight)
})

const labels=Object.keys(grouped)

const data=labels.map(l=>{
const arr=grouped[l]
return arr[arr.length-1]||0
})

new Chart(canvasRef.current,{
type:"bar",
data:{
labels,
datasets:[{
label:"Última carga registrada",
data
}]
}
})

},[history])

return(
<div className="dashboard">

<h2>Dashboard de Evolução 📊</h2>

<canvas ref={canvasRef}></canvas>

</div>
)
}
