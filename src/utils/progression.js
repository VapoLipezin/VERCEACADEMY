export function getSuggestedWeight(exercise, sets){

  if(!sets || sets.length === 0) return null

  // pega faixa de reps (ex: "8-10")
  const repsRange = exercise.reps.split("-")
  const maxReps = parseInt(repsRange[1])

  // verifica se todas bateram o topo
  const allMax = sets.every(set => Number(set.reps) >= maxReps)

  if(!allMax) return null

  const lastWeight = Number(sets[0].weight)

  if(!lastWeight) return null

  return lastWeight + 2.5
}
