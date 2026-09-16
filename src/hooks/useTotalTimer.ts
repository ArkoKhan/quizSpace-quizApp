import { useEffect } from 'react'

export function useTotalTimer(remaining: number, setRemaining: (seconds: number) => void, onExpire: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled || remaining <= 0) return
    const interval = window.setInterval(() => {
      setRemaining(Math.max(remaining - 1, 0))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [enabled, onExpire, remaining, setRemaining])

  useEffect(() => {
    if (enabled && remaining === 0) onExpire()
  }, [enabled, onExpire, remaining])
}
