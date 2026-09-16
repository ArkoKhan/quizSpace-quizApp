import type { MathLanguage } from '../types/quiz'

export function QuestionCard({ question, options, values = options, selected, language, onSelect }: { question: string; options: string[]; values?: string[]; selected?: string; language: MathLanguage; onSelect: (answer: string) => void }) {
  return <section className="question-card" aria-labelledby="question-heading"><h2 id="question-heading">{question}</h2><div className="option-list">{options.map((option, index) => <button key={`${option}-${index}`} type="button" className={`option-button ${selected === values[index] ? 'option-selected' : ''}`} onClick={() => onSelect(values[index])} aria-pressed={selected === values[index]}><span className="option-index">{String.fromCharCode(65 + index)}</span><span>{option}</span></button>)}</div><p className="sr-only">{language === 'bn' ? 'একটি উত্তর নির্বাচন করুন' : 'Select one answer'}</p></section>
}
