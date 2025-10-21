import s from './selected.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAllFilters } from 'store/slices/filters.slice'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { startLoading } from 'store/slices/global_comps/global_comps.slice.js'

const Selected = ({ productsCount }) => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const { filters: activeFilters } = useSelector((state) => state.filters)
  const isActiveFilters = Object.keys(activeFilters).some((f) => f != 'page')

  return (
    <>
      {activeFilters && isActiveFilters && (
        <div className={`${s.selected}`}>
          <p tabIndex={0}>Обрано {productsCount} товарів</p>
          <button
            className={`${s.cancel_all_btn} button_danger_secondary`}
            onClick={() => {
              dispatch(startLoading())
              dispatch(deleteAllFilters())
              navigate(`/products/${params.categoryPath}/page=1`)
            }}
            aria-label='Скасувати всі фільтри товарів'
          >
            Скасувати
          </button>
        </div>
      )}
    </>
  )
}

export default Selected

