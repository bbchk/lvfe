import { CustomTooltip } from "comps/accessibility/tooltip";

const ButtonIcon = ({
  href = "#",
  onClick,
  tooltipText,
  ariaDescribedby = "",
  children,
}) => {
  return (
    <button onClick={onClick}>
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
    </button>
  );
};

export default ButtonIcon;
