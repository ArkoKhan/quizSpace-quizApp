/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { MathLanguage, QuizAttempt, Subject } from '../types/quiz'

interface QuizContextValue {
  attempt: QuizAttempt | null
  startAttempt: (subject: Subject, quizId: string, questionCount: number, language?: MathLanguage) => void
  setCurrentQuestion: (index: number) => void
  setAnswer: (questionId: number, answer: string) => void
  setLanguage: (language: MathLanguage) => void
  setRemainingTotalTime: (seconds: number) => void
  clearActiveAttempt: () => void
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null)

  const value = useMemo<QuizContextValue>(() => ({
    attempt,
    startAttempt: (subject, quizId, questionCount, language = 'en') => {
      setAttempt({ subject, quizId, currentQuestion: 0, selectedAnswers: {}, language, remainingTotalTime: questionCount * 40 })
    },
    setCurrentQuestion: (index) => setAttempt((current) => current ? { ...current, currentQuestion: index } : current),
    setAnswer: (questionId, answer) => setAttempt((current) => current ? { ...current, selectedAnswers: { ...current.selectedAnswers, [questionId]: answer } } : current),
    setLanguage: (language) => setAttempt((current) => current ? { ...current, language } : current),
    setRemainingTotalTime: (seconds) => setAttempt((current) => current ? { ...current, remainingTotalTime: seconds } : current),
    clearActiveAttempt: () => setAttempt(null),
  }), [attempt])

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz(): QuizContextValue {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useQuiz must be used within QuizProvider')
  return context
}

