import { CustomTooltip } from "comps/accessibility/tooltip";

const LinkIcon = ({
  href = "#",
  tooltipText,
  ariaDescribedby = "",
  children,
}) => {
  return (
    <a
      className={`${s.icon_btn}`}
      href={href}
      aria-label={tooltipText}
      aria-description={ariaDescribedby}
    >
      <CustomTooltip tooltipText={tooltipText}>{children}</CustomTooltip>
    </a>
  );
};

export default LinkIcon;
