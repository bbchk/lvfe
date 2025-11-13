import { CustomTooltip } from "comps/accessibility/tooltip";

const ButtonIcon = ({
  onClick,
  tooltipText,
  ariaDescribedby = "",
  className,
  children,
}) => {
  return (
    <CustomTooltip tooltipText={tooltipText}>
      <button
        onClick={onClick}
        className={`${className} button--icon`}
        aria-label={tooltipText}
        aria-description={ariaDescribedby}
      >
        {children}
      </button>
    </CustomTooltip>
  );
};

export default ButtonIcon;
