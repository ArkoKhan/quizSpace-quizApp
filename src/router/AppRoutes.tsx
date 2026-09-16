import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { QuizPage } from '../pages/QuizPage'
import { ResultPage } from '../pages/ResultPage'
import { SubjectHome } from '../pages/SubjectHome'

export function AppRoutes() {
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/english" element={<SubjectHome subject="english" />} /><Route path="/math" element={<SubjectHome subject="math" />} /><Route path="/english/quiz/:quizId" element={<QuizPage subject="english" />} /><Route path="/math/quiz/:quizId" element={<QuizPage subject="math" />} /><Route path="/english/result/:quizId" element={<ResultPage subject="english" />} /><Route path="/math/result/:quizId" element={<ResultPage subject="math" />} /><Route path="*" element={<HomePage />} /></Routes>
}
