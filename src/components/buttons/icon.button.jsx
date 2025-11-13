import { CustomTooltip } from "comps/accessibility/tooltip";

const ButtonIcon = ({
  onClick,
  tooltipText,
  ariaDescribedby = "",
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} button--icon`}
      aria-label={tooltipText}
      aria-description={ariaDescribedby}
    >
      <CustomTooltip tooltipText={tooltipText}>{children}</CustomTooltip>
    </button>
  );
};

export default ButtonIcon;
