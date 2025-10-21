import { useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

export const usePageValidation = (numPages) => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    // Get filtersStr from URL params (if it's a path parameter)
    let filtersStr = params.filtersStr
    
    // If not found in params, check search params
    if (!filtersStr) {
      const searchParams = new URLSearchParams(location.search)
      filtersStr = searchParams.get('filtersStr')
    }

    // If still not found, check if it's part of the pathname
    if (!filtersStr) {
      const pathSegments = location.pathname.split('/')
      filtersStr = pathSegments[pathSegments.length - 1]
    }

    if (filtersStr) {
      const match = filtersStr.match(/page=(\d+)/)
      const pageValue = match ? parseInt(match[1], 10) : null

      if (pageValue && (pageValue > numPages || pageValue < 1)) {
        navigate('/404')
      }
    }
  }, [location.pathname, location.search, params, numPages, navigate])
}

