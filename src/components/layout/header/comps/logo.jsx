import { pacifico } from 'pages/_app'

import hs from '../header.module.scss'

import s from './logo.module.scss'

const Logo = () => {
  return (
    <>
      <a className={`${s.logo} ${hs.logo} ${pacifico.className}`} href='/'>
        <img
          src={'/assets/logo.svg'}
          alt='Логотип'
          aria-label='Перейти на головну сторінку'
          width={50}
          height={50}
          priority
        />
        <span>Живий світ</span>
      </a>
    </>
  )
}

export default Logo
