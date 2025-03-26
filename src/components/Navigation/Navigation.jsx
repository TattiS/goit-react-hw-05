import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.navLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={css.navLink}>
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
