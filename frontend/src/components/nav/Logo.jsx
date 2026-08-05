import { Link } from "react-router-dom";
import { APP_NAME } from "../../utils/constants.js";

const LeafMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 20c8 0 15-6 16-16C11 5 4 11 4 20z"
      fill="var(--color-olive)"
    />
    <path d="M6 18c4-4 8-8 12-12" stroke="var(--color-cream)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const Logo = () => (
  <Link to="/" className="logo">
    <LeafMark />
    <span className="logo-text">{APP_NAME}</span>
  </Link>
);

export default Logo;
