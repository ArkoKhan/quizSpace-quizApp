import { useEffect, useState } from 'react'

export function useQuestionTimer(questionIndex: number, onExpire: () => void, enabled = true): number {
  const [remaining, setRemaining] = useState(40)

  useEffect(() => {
    // The question index is the timer's external reset signal.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(40)
  }, [questionIndex])

  useEffect(() => {
    if (!enabled) return
    const interval = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval)
          onExpire()
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [enabled, onExpire, questionIndex])

  return remaining
}
