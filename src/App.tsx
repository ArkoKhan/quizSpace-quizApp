import { BrowserRouter } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'
import { AppRoutes } from './router/AppRoutes'

function App() {
  return <BrowserRouter><QuizProvider><AppRoutes /></QuizProvider></BrowserRouter>
}

export default App
