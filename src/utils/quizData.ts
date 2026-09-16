import englishData from '../data/engquiz.json'
import mathData from '../data/matquiz.json'
import type { EnglishQuiz, MathQuiz, Quiz } from '../types/quiz'

function hasQuestions(quiz: Quiz): boolean {
  return Array.isArray(quiz.questions) && quiz.questions.length > 0 && quiz.questions.every((question) => question.answer)
}

function isMathQuiz(quiz: Quiz): quiz is MathQuiz {
  return typeof quiz.header === 'object' && typeof quiz.topic === 'object'
}

export function loadQuizzes(subject: 'english' | 'math'): { quizzes: Quiz[]; error?: string } {
  const source = subject === 'english' ? englishData : mathData
  if (!Array.isArray(source) || source.length === 0) return { quizzes: [], error: 'No quizzes are available right now.' }
  const quizzes = source.filter((quiz) => hasQuestions(quiz as Quiz) && (subject === 'math' ? isMathQuiz(quiz as Quiz) : typeof (quiz as EnglishQuiz).header === 'string')) as Quiz[]
  return quizzes.length ? { quizzes } : { quizzes: [], error: 'The quiz data is incomplete. Please check the local JSON files.' }
}

export function findQuiz(subject: 'english' | 'math', id: string): Quiz | undefined {
  return loadQuizzes(subject).quizzes.find((quiz) => quiz.id === id)
}
