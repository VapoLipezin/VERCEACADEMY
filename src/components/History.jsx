export default function History({history}){

return(

<div>

<h2>Histórico</h2>

{history.map((h,i)=>(
<div key={i} className="history-card">
{h.exercise} - {h.weight}kg - {h.date}
</div>
))}

</div>

)

}
