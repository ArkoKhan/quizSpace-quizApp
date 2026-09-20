import { ArrowRight, Calculator, Languages } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { Seo } from '../components/Seo'
import { siteSchema } from '../utils/siteSchema'

export function HomePage() {
  return <><Seo title="Quizspace | Focused English and mathematics quizzes" description="Build confidence with focused English and mathematics quizzes, one clean step at a time." jsonLd={siteSchema()} /><main className="page-shell home-shell"><header className="topbar"><Link className="brand" to="/"><span className="brand-mark">Q</span><span>quiz<span className="brand-accent">/</span>space</span></Link><ThemeToggle /></header><section className="home-hero"><p className="eyebrow">A sharper way to practice</p><h1>Make every answer<br /><em>count.</em></h1><p className="hero-copy">Focused quizzes for language and numbers, designed to turn a few spare minutes into real progress.</p></section><section className="subject-grid" aria-label="Choose a subject"><Link to="/english" className="subject-card subject-english"><span className="subject-number">01</span><Languages size={34} /><div><h2>English</h2><p>Grammar, vocabulary, and the details that make your writing sing.</p></div><ArrowRight className="subject-arrow" /></Link><Link to="/math" className="subject-card subject-math"><span className="subject-number">02</span><Calculator size={34} /><div><h2>Mathematics</h2><p>Build confidence with arithmetic and algebra, one clean step at a time.</p></div><ArrowRight className="subject-arrow" /></Link></section></main></>
}
