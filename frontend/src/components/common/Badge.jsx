import { classNames } from "../../utils/helpers.js";

/**
 * Small label pill — used as an image overlay tag (e.g. category name,
 * "New") or as a standalone meta tag (e.g. "Vegan", "30 min").
 *
 * @param {"overlay"|"tag"} variant - "overlay" sits on top of an image,
 *   "tag" is used inline in card meta rows.
 * @param {"olive"|"gold"|"cream"} tone
 */
const Badge = ({ children, variant = "tag", tone = "olive", className, icon }) => {
  return (
    <span
      className={classNames(
        "badge",
        `badge-${variant}`,
        `badge-${tone}`,
        className
      )}
    >
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
