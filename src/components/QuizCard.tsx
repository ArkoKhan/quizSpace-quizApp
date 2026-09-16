import { ArrowUpRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MathLanguage, Quiz, Subject } from '../types/quiz'

export function QuizCard({ quiz, subject, language = 'en' }: { quiz: Quiz; subject: Subject; language?: MathLanguage }) {
  const header = typeof quiz.header === 'string' ? quiz.header : quiz.header[language]
  const topic = typeof quiz.topic === 'string' ? quiz.topic : quiz.topic[language]
  return <article className="quiz-card">
    <div className="card-icon"><BookOpen size={22} /></div>
    <div className="quiz-card-copy"><p className="eyebrow">{topic}</p><h2>{header}</h2><p className="muted">{quiz.questions.length} questions <span aria-hidden="true">·</span> 40 sec each</p></div>
    <Link className="primary-button card-button" to={`/${subject}/quiz/${quiz.id}`}>Start quiz <ArrowUpRight size={18} /></Link>
  </article>
}
