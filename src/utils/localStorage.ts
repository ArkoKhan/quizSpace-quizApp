import type { QuizResult } from '../types/quiz'

const RESULT_KEY = 'quiz-app-result'
const THEME_KEY = 'quiz-app-theme'

export function loadResult(): QuizResult | null {
  try {
    const value = localStorage.getItem(RESULT_KEY)
    return value ? JSON.parse(value) as QuizResult : null
  } catch {
    return null
  }
}

export function saveResult(result: QuizResult): void {
  localStorage.setItem(RESULT_KEY, JSON.stringify(result))
}

export function loadTheme(): 'light' | 'dark' {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme)
}
