import { ArrowLeft, Check, CircleX, Minus, RotateCcw } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import type { MathLanguage, Subject } from '../types/quiz'
import { findQuiz } from '../utils/quizData'
import { loadResult } from '../utils/localStorage'
import { formatTime } from '../utils/time'
import { Seo } from '../components/Seo'

export function ResultPage({ subject }: { subject: Subject }) {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { attempt } = useQuiz()
  const result = loadResult()
  const quiz = quizId ? findQuiz(subject, quizId) : undefined
  const language: MathLanguage = attempt?.language ?? 'en'
  if (!quiz || !result || result.quizId !== quizId) return <main className="page-shell"><div className="error-state">Result unavailable.<Link to={`/${subject}`}>Back to quizzes</Link></div></main>
  const correct = quiz.questions.filter((question) => result.answers.find((answer) => answer.questionId === question.id)?.answer === question.answer).length
  const answered = result.answers.filter((answer) => answer.answer).length
  const wrong = answered - correct
  const skipped = quiz.questions.length - answered
  const percentage = Math.round((correct / quiz.questions.length) * 100)
  return <><Seo title="Quiz result | Quizspace" description="Review your completed quiz results on Quizspace." path={`/${subject}/result/${quizId}`} noIndex /><main className="page-shell result-shell"><header className="topbar"><Link to={`/${subject}`} className="back-link"><ArrowLeft size={17} /> More quizzes</Link></header><section className="result-hero"><p className="eyebrow"><Check size={14} /> Session complete</p><h1>Quiz complete.</h1><p>You showed up. Here is how it went.</p><div className="score-ring"><strong>{percentage}%</strong><span>score</span></div></section><section className="score-grid"><div><strong>{correct}</strong><span>Correct</span></div><div><strong>{wrong}</strong><span>Wrong</span></div><div><strong>{skipped}</strong><span>Skipped</span></div><div><strong>{formatTime(result.timeUsed)}</strong><span>Time used</span></div></section><section className="review-section"><div className="section-heading compact"><div><p className="eyebrow">Answer review</p><h2>See every step.</h2></div></div><div className="review-list">{quiz.questions.map((question, index) => { const answer = result.answers.find((item) => item.questionId === question.id)?.answer ?? ''; const isCorrect = answer === question.answer; const text = typeof question.question === 'string' ? question.question : question.question[language]; const displayAnswer = answer || 'Skipped'; return <article className={`review-item ${answer ? (isCorrect ? 'review-correct' : 'review-wrong') : 'review-skipped'}`} key={question.id}><div className="review-status">{answer ? (isCorrect ? <Check size={18} /> : <CircleX size={18} />) : <Minus size={18} />}</div><div><p className="muted">Question {index + 1}</p><h3>{text}</h3><p><span>Your answer:</span> {displayAnswer}</p><p><span>Correct answer:</span> {question.answer}</p></div></article> })}</div></section><button className="primary-button result-action" type="button" onClick={() => navigate(`/${subject}`)}><RotateCcw size={17} /> Take more quizzes</button></main></>
}
