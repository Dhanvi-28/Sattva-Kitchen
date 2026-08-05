import { classNames } from "../../utils/helpers.js";

/**
 * Circular icon-only button — used for the save/favorite heart on
 * cards, pagination arrows, and similar compact controls.
 *
 * @param {React.ReactNode} icon
 * @param {string} label - required accessible name (visually hidden)
 * @param {boolean} active - toggled/filled state (e.g. saved recipe)
 */
const IconButton = ({ icon, label, active = false, className, ...props }) => (
  <button
    type="button"
    aria-label={label}
    aria-pressed={props.onClick ? active : undefined}
    className={classNames("icon-btn", active && "icon-btn-active", className)}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;
