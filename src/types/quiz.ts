export type Subject = 'english' | 'math'
export type MathLanguage = 'en' | 'bn'

export interface LocalizedText {
  en: string
  bn: string
}

export interface EnglishQuestion {
  id: number
  question: string
  options: string[]
  answer: string
}

export interface EnglishQuiz {
  id: string
  header: string
  topic: string
  questions: EnglishQuestion[]
}

export interface MathQuestion {
  id: number
  question: LocalizedText
  options: {
    en: string[]
    bn: string[]
  }
  answer: string
}

export interface MathQuiz {
  id: string
  header: LocalizedText
  topic: LocalizedText
  questions: MathQuestion[]
}

export type Quiz = EnglishQuiz | MathQuiz
export type SelectedAnswers = Record<number, string | undefined>

export interface AnswerRecord {
  questionId: number
  answer: string
  answeredAt: number
}

export interface QuizResult {
  quizId: string
  subject: Subject
  answers: AnswerRecord[]
  timeUsed: number
  completedAt: number
}

export interface QuizAttempt {
  subject: Subject
  quizId: string
  currentQuestion: number
  selectedAnswers: SelectedAnswers
  language: MathLanguage
  remainingTotalTime: number
}
