import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { useThemeStore } from './store/themeStore'
import { usePortfolioStore } from './store/portfolioStore'
import { useEffect } from 'react'
import { trackEvent } from './utils/telemetry'

function App() {
  const initTheme = useThemeStore((state) => state.initTheme)
  const fetchPortfolioData = usePortfolioStore((state) => state.fetchPortfolioData)

  useEffect(() => {
    initTheme()
    fetchPortfolioData()
    trackEvent('visit', { path: window.location.pathname })
  }, [initTheme, fetchPortfolioData])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
