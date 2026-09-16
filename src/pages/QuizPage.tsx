import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LanguageToggle } from '../components/LanguageToggle'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionCard } from '../components/QuestionCard'
import { Timer } from '../components/Timer'
import { useQuiz } from '../context/QuizContext'
import { useQuestionTimer } from '../hooks/useQuestionTimer'
import { useTotalTimer } from '../hooks/useTotalTimer'
import type { MathLanguage, Subject } from '../types/quiz'
import { findQuiz } from '../utils/quizData'
import { saveResult } from '../utils/localStorage'
import { shuffleOptions } from '../utils/shuffleOptions'

export function QuizPage({ subject }: { subject: Subject }) {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const quiz = quizId ? findQuiz(subject, quizId) : undefined
  const { attempt, startAttempt, setAnswer, setCurrentQuestion, setLanguage, setRemainingTotalTime } = useQuiz()
  const [language, setLocalLanguage] = useState<MathLanguage>('en')
  const isMath = subject === 'math'
  const optionSets = useMemo(() => quiz?.questions.map((question) => shuffleOptions(typeof question.options === 'object' && !Array.isArray(question.options) ? question.options.en : question.options)) ?? [], [quiz])
  const initializedRoute = useRef<string | null>(null)

  useEffect(() => {
    if (!quiz || !quizId) return
    const routeKey = `${subject}/${quizId}`
    if (initializedRoute.current === routeKey) return
    initializedRoute.current = routeKey
    startAttempt(subject, quizId, quiz.questions.length, language)
  }, [language, quiz, quizId, startAttempt, subject])

  const finishQuiz = useCallback(() => {
    if (!quiz || !quizId || !attempt) return
    const answers = quiz.questions.map((question) => ({ questionId: question.id, answer: attempt.selectedAnswers[question.id] ?? '', answeredAt: Date.now() }))
    saveResult({ quizId, subject, answers, timeUsed: quiz.questions.length * 40 - attempt.remainingTotalTime, completedAt: Date.now() })
    navigate(`/${subject}/result/${quizId}`)
  }, [attempt, navigate, quiz, quizId, subject])

  const moveNext = useCallback(() => {
    if (!quiz || !attempt) return
    if (attempt.currentQuestion >= quiz.questions.length - 1) finishQuiz()
    else setCurrentQuestion(attempt.currentQuestion + 1)
  }, [attempt, finishQuiz, quiz, setCurrentQuestion])
  const questionTimer = useQuestionTimer(attempt?.currentQuestion ?? 0, moveNext, Boolean(attempt))
  useTotalTimer(attempt?.remainingTotalTime ?? 0, setRemainingTotalTime, finishQuiz, Boolean(attempt))

  if (!quiz) return <main className="page-shell"><div className="error-state" role="alert">This quiz could not be found.<Link to={`/${subject}`}>Back to quizzes</Link></div></main>
  if (!attempt) return <main className="page-shell"><div className="loading-state">Preparing your quiz...</div></main>

  const currentIndex = attempt.currentQuestion
  const question = quiz.questions[currentIndex]
  const questionText = typeof question.question === 'string' ? question.question : question.question[language]
  const options = optionSets[currentIndex] ?? []
  const mathOptions = typeof question.options === 'object' && !Array.isArray(question.options) ? question.options : undefined
  const values = mathOptions ? options : undefined
  const visibleOptions = mathOptions && language === 'bn' ? options.map((option) => mathOptions.bn[mathOptions.en.indexOf(option)]) : options
  const header = typeof quiz.header === 'string' ? quiz.header : quiz.header[language]
  const currentAnswer = attempt.selectedAnswers[question.id]

  const changeLanguage = (nextLanguage: MathLanguage) => { setLocalLanguage(nextLanguage); setLanguage(nextLanguage) }
  return <main className="page-shell quiz-shell"><header className="topbar"><Link to={`/${subject}`} className="back-link"><ArrowLeft size={17} /> Exit quiz</Link><div className="topbar-actions">{isMath && <LanguageToggle language={language} onChange={changeLanguage} />}</div></header><div className="quiz-header"><div><p className="eyebrow">{header}</p><h1>Stay curious.</h1></div><div className="timer-stack"><Timer label="Total" seconds={attempt.remainingTotalTime} urgent={attempt.remainingTotalTime < 30} /><Timer label="Question" seconds={questionTimer} urgent={questionTimer < 10} /></div></div><div className="progress-label"><span>Question {currentIndex + 1} of {quiz.questions.length}</span><span>{Math.round(((currentIndex + 1) / quiz.questions.length) * 100)}%</span></div><ProgressBar current={currentIndex} total={quiz.questions.length} /><QuestionCard question={questionText} options={visibleOptions} values={values} selected={currentAnswer} language={language} onSelect={(answer) => setAnswer(question.id, answer)} /><div className="quiz-navigation"><button className="secondary-button" type="button" onClick={() => setCurrentQuestion(currentIndex - 1)} disabled={currentIndex === 0}><ArrowLeft size={17} /> Previous</button>{currentIndex === quiz.questions.length - 1 ? <button className="primary-button" type="button" onClick={finishQuiz}><CheckCircle2 size={17} /> Submit quiz</button> : <button className="primary-button" type="button" onClick={moveNext}>Next <ArrowRight size={17} /></button>}</div></main>
}

