import { Languages } from 'lucide-react'
import type { MathLanguage } from '../types/quiz'

export function LanguageToggle({ language, onChange }: { language: MathLanguage; onChange: (language: MathLanguage) => void }) {
  return (
    <div className="language-toggle" role="group" aria-label="Quiz language">
      <Languages size={16} aria-hidden="true" />
      <button type="button" className={language === 'en' ? 'language-active' : ''} onClick={() => onChange('en')} aria-pressed={language === 'en'}>English</button>
      <span aria-hidden="true">|</span>
      <button type="button" className={language === 'bn' ? 'language-active' : ''} onClick={() => onChange('bn')} aria-pressed={language === 'bn'}>বাংলা</button>
    </div>
  )
}
