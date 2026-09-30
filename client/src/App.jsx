import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Hackathons from './pages/Hackathons'
import HackathonDetail from './pages/HackathonDetail'
import About from './pages/About'
import Services from './pages/Services'
import Courses from './pages/Courses'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

const publicChildren = [
  { path: '/', element: <Home /> },
  { path: '/hackathons', element: <Hackathons /> },
  { path: '/hackathons/:slug', element: <HackathonDetail /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/courses', element: <Courses /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/contact', element: <Contact /> },
  { path: '/terms', element: <Terms /> },
  { path: '/privacy', element: <Privacy /> }
]

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {publicChildren.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
