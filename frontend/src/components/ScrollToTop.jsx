import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // If there is a hash (e.g. /#about), let the browser handle it, otherwise scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
