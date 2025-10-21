import { useNavigate, useLocation, useParams } from 'react-router-dom'
import s from './landing_tabs_navigation.module.scss'

import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'

const TabsNavigation = ({ activeTab }) => {
  const navigate = useNavigate()
  const params = useParams()
  
  const productSlug = params.productSlug
  const productId = params.productId

  const productUrl = (activeTab) =>
    `/product/${productSlug}/${productId}/${activeTab}`

  const TabLink = ({ tabName, label }) => {
    const handleClick = (e) => {
      e.preventDefault()
      navigate(productUrl(tabName))
    }

    return (
      <li className={`nav-item ${s.link_container}`}>
        <a
          href={''}
          className={`nav-link ${s.link}  ${
            activeTab === tabName ? s.active : ''
          }`}
          aria-current='page'
          onClick={handleClick}
        >
          {label}
        </a>
      </li>
    )
  }

  return (
    <>
      <ul className={`nav nav-underline ${s.navigation}`}>
        <div className={`${s.decor_line}`} />

        <TabLink tabName={'about'} label={'Усе про товар'} />

        <TabLink tabName={'characteristics'} label={'Характеристики'} />

        <TabLink tabName={'reviews'} label={'Відгуки'} />
      </ul>
    </>
  )
}

export default TabsNavigation

