import { Link } from "react-router-dom";
import Button from "./Button.jsx";

/**
 * Empty-state block for any list/grid with no data yet (no backend is
 * connected, so this renders instead of fabricated sample content).
 *
 * @param {React.ReactNode} icon
 * @param {string} title
 * @param {string} description
 * @param {{label: string, to?: string, onClick?: function}} [action]
 */
const EmptyState = ({ icon, title, description, action }) => (
  <div className="empty-state">
    {icon && <div className="empty-state-icon">{icon}</div>}
    <p className="empty-state-title">{title}</p>
    {description && <p className="empty-state-desc">{description}</p>}
    {action &&
      (action.to ? (
        <Button as={Link} to={action.to} variant="secondary" size="sm">
          {action.label}
        </Button>
      ) : (
        <Button onClick={action.onClick} variant="secondary" size="sm">
          {action.label}
        </Button>
      ))}
  </div>
);

export default EmptyState;
