import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import Button from "../common/Button.jsx";
import { classNames } from "../../utils/helpers.js";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/quiz", label: "Take the quiz" },
];

/**
 * Site-wide top navigation. No auth/user state is wired up yet
 * (no backend) — the "Saved recipes" action is presentational.
 */
const NavBar = () => (
  <header className="site-header">
    <div className="container site-header-inner">
      <Logo />

      <nav className="site-nav" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) => classNames("site-nav-link", isActive && "site-nav-link-active")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <Button as={NavLink} to="/quiz" variant="primary" size="sm" className="site-header-cta">
        Get recommendations
      </Button>
    </div>
  </header>
);

export default NavBar;
