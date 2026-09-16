import { Clock3 } from 'lucide-react'
import { formatTime } from '../utils/time'

export function Timer({ label, seconds, urgent = false }: { label: string; seconds: number; urgent?: boolean }) {
  return <div className={`timer ${urgent ? 'timer-urgent' : ''}`}><Clock3 size={17} aria-hidden="true" /><span>{label}</span><strong>{formatTime(seconds)}</strong></div>
}
