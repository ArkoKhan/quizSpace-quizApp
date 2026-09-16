export function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, seconds)
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, '0')}:${String(safeSeconds % 60).padStart(2, '0')}`
}
