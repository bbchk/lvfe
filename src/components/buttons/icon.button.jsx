import { CustomTooltip } from 'comps/accessibility/tooltip'

import s from './icon_button.module.scss'

const IconButton = ({
  href = '#',
  onClick,
  tooltipText,
  ariaDescribedby = '',
  children,
}) => {
  return (
    <li onClick={onClick}>
      <CustomTooltip tooltipText={tooltipText}>
        <a
          className={`${s.icon_btn}`}
          href={href}
          aria-label={tooltipText}
          aria-description={ariaDescribedby}
        >
          {children}
        </a>
      </CustomTooltip>
    </li>
  )
}

export default IconButton
