import s from './tab.module.scss'

const Tab = ({ children, href, onClick }) => {
  return (
    <li className={`${s.tab}`} onClick={onClick}>
      <a className={`${s.content}`} href={href}>
        {children}
      </a>
    </li>
  )
}

export default Tab
