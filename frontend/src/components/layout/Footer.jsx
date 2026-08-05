import { APP_NAME } from "../../utils/constants.js";

const Footer = () => (
  <footer className="site-footer">
    <div className="container site-footer-inner">
      <p className="site-footer-copy">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
      <nav className="site-footer-links" aria-label="Footer">
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
