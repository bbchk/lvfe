import { useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from 'store/slices/filters.slice'

const genFiltersStr = (filters) => {
  let filtersStr = ''
  for (const key in filters) {
    filtersStr += `${key}=${filters[key].join(',')};`
  }

  return filtersStr.slice(0, -1)
}

export const useUpdateFilters = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  
  // Extract categoryPath from URL params
  const categoryPath = params.categoryPath
  
  // Extract filtersStr from URL params (assuming it's in the pathname)
  const filtersStr = params.filtersStr

  const { filters } = useSelector((state) => state.filters)

  useEffect(() => {
    let newFiltersStr = genFiltersStr(filters)

    if (
      Object.keys(filters).length != 0 &&
      newFiltersStr !== filtersStr
    ) {
      const filtersStrPageDefault = newFiltersStr.replace(/page=\d+/, 'page=1')
      navigate(`/products/${categoryPath}/${filtersStrPageDefault}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])
}

