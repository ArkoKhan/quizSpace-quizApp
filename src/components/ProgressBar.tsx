export function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = total ? ((current + 1) / total) * 100 : 0
  return <div className="progress-track" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current + 1} aria-label={`Question ${current + 1} of ${total}`}><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
}
