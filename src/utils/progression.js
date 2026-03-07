export function getSuggestedWeight(previousWeight, repsDone, repRange) {

const [min, max] = repRange.split("-").map(Number)

if(!previousWeight) return ""

const reps = Number(repsDone)

if(reps >= max) {
return previousWeight + 2.5
}

if(reps < min) {
return previousWeight - 2.5
}

return previousWeight
}
