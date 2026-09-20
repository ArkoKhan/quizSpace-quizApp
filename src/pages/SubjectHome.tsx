import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LanguageToggle } from '../components/LanguageToggle'
import { QuizCard } from '../components/QuizCard'
import { ThemeToggle } from '../components/ThemeToggle'
import { useState } from 'react'
import type { MathLanguage, Subject } from '../types/quiz'
import { loadQuizzes } from '../utils/quizData'
import { Seo } from '../components/Seo'

export function SubjectHome({ subject }: { subject: Subject }) {
  const [language, setLanguage] = useState<MathLanguage>('en')
  const { quizzes, error } = loadQuizzes(subject)
  const isMath = subject === 'math'
  const title = isMath ? 'Mathematics quizzes | Quizspace' : 'English quizzes | Quizspace'
  const description = isMath ? 'Practice arithmetic and algebra with focused mathematics quizzes on Quizspace.' : 'Improve grammar and vocabulary with focused English quizzes on Quizspace.'
  return <><Seo title={title} description={description} path={`/${subject}`} /><main className="page-shell"><header className="topbar"><Link to="/" className="back-link"><ArrowLeft size={17} /> Subjects</Link><div className="topbar-actions">{isMath && <LanguageToggle language={language} onChange={setLanguage} />}<ThemeToggle /></div></header><section className="section-heading"><div><p className="eyebrow"><Sparkles size={14} /> {isMath ? 'Number practice' : 'Language practice'}</p><h1>{isMath ? (language === 'bn' ? 'গণিত কুইজ' : 'Mathematics quizzes') : 'English quizzes'}</h1><p>{isMath ? (language === 'bn' ? 'ধাপে ধাপে নিজের দক্ষতা পরীক্ষা করুন।' : 'Test your skills, step by step.') : 'Small sessions. Noticeable progress.'}</p></div><span className="quiz-count">{quizzes.length} quizzes</span></section>{error ? <div className="error-state" role="alert">{error}</div> : <section className="quiz-grid">{quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} subject={subject} language={language} />)}</section>}</main></>
}
