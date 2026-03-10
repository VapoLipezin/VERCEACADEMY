export function saveWorkout(data) {
  localStorage.setItem("workout-data", JSON.stringify(data));
}

export function loadWorkout() {
  const saved = localStorage.getItem("workout-data");

  if (!saved) return {};

  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
}
