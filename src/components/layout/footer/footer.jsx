import s from './footer.module.scss'

import React, { useRef } from 'react'

import useObserver from 'hooks/useObserver.js'

import { balsamiqSansClass } from '../../../App.jsx'

import AboutUs from './comps/about_us'
import WorkHours from './comps/work_hours'
import Contacts from './comps/contacts'

import LoadingSpinner from 'comps/loading/spinner'
const Location = React.lazy(() => import('./comps/location'))

const Footer = () => {
  const footerRef = useRef()
  const isVisible = useObserver(footerRef)

  return (
    <footer
      ref={footerRef}
      className={` ${s.footer} ${balsamiqSansClass}`}
    >
      <div className={`${s.decor_line}`} />
      <div className={`row ${s.row}`}>
        <section
          className={`col-sm-12 col-md-6 col-xl-4 `}
          tabIndex={0}
          aria-label='Ми - магазин найкращих товарів для вашого дому, улюбленців та рослин'
        >
          <AboutUs />
        </section>

        <section
          className={`col-sm-12 col-md-6 col-xl-3 `}
          tabIndex={0}
          aria-label='Працюємо весь тиждень з 8:00 до 18:00'
        >
          <WorkHours />
        </section>

        <section
          className={`col-sm-12 col-md-6 col-xl-3 `}
          tabIndex={0}
          aria-label='Знаходимось за адресою місто Калинівка, вулиця Незалежності, 47б'
        >
          <Contacts />
        </section>

        <address className={`col-sm-12 col-md-6 col-xl-2`}>
          {isVisible && <Location />}
        </address>
      </div>
    </footer>
  )
}

export default Footer
