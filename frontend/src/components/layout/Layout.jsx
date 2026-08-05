import { NavBar } from "../nav/index.js";
import Footer from "./Footer.jsx";

/**
 * App shell wrapping every route: nav + main content slot + footer.
 */
const Layout = ({ children }) => (
  <div className="app-shell">
    <NavBar />
    <main className="app-main">{children}</main>
    <Footer />
  </div>
);

export default Layout;
