import s from './reviews.module.scss'
import ps from '../landing_product_about.module.scss'

import ReviewItem from '../../reviews/review_item'
import {
  KeyboardArrowUpRounded,
  ModeRounded,
  KeyboardArrowDownRounded,
} from '@mui/icons-material'

import { useDispatch } from 'react-redux'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { WRITE_REVIEW_MODAL } = GLOBAL_COMPS
import WriteReviewForm from '../../mutual/write_review_form/write_review_form'
import { useNavigate, useLocation } from 'react-router-dom'

const Reviews = ({ product }) => {
  const { reviews = [] } = product
  const MAX_REVIEWS_ON_ABOUT_PAGE = 3
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()
  
  const handleNavigation = (e) => {
    const productPathNoActiveTab = location.pathname
      .split('/')
      .slice(0, -1)
      .join('/')

    e.preventDefault()
    navigate(productPathNoActiveTab + '/reviews')
  }

  const amountOfReviews = reviews?.length

  return (
    <div className={`${s.reviews}`}>
      <>
        <header className={`${s.header}`}>
          {amountOfReviews > 0 ? (
            <>
              <h2>
                Відгуки покупців
                <span>{amountOfReviews}</span>
              </h2>
              <button
                onClick={() => dispatch(toggle(WRITE_REVIEW_MODAL))}
                className={`${s.write_review_btn} button_primary`}
              >
                <p>Написати відгук</p>
                <ModeRounded />
              </button>
            </>
          ) : (
            <>
              <h2>Відгуків ще немає</h2>
              <p className={`${s.appeal}`}>
                Напишіть першим, що ви думаєте про товар
                <KeyboardArrowDownRounded />
              </p>
            </>
          )}
        </header>
        <div className={`${s.body}`}>
          {amountOfReviews === 0 && (
            <>
              <div className={`${s.write_review_embedded}`}>
                <WriteReviewForm />
              </div>
            </>
          )}
          {reviews.slice(0, MAX_REVIEWS_ON_ABOUT_PAGE).map((review) => {
            return <ReviewItem key={`review-${review.id}`} review={review} />
          })}
        </div>
        <footer className={`${s.footer}`}>
          {amountOfReviews > 0 && (
            <a href='#' onClick={handleNavigation}>
              <p>Подивитись усі відгуки на товар</p>
              <KeyboardArrowUpRounded />
            </a>
          )}
        </footer>
      </>
    </div>
  )
}

export default Reviews

