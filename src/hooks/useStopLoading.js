import { stopLoading } from 'store/slices/global_comps/global_comps.slice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useStopLoading() {
  const location = useLocation()

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.modals)

  useEffect(() => {
    if (loading) {
      dispatch(stopLoading())
    }
  }, [location.pathname, location.search])

  return { loading }
}
