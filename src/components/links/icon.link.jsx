import { CustomTooltip } from "comps/accessibility/tooltip";

const LinkIcon = ({
  href = "#",
  tooltipText,
  ariaDescribedby = "",
  children,
}) => {
  return (
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
  );
};

export default LinkIcon;
