import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.headerCont}>
      <img className={s.iconLogo} src="/logo-nanny.svg" alt="Logo" />
      <div className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive && !isDetailsPage ? s.active : s.inactive
          }
        >
          Nannies
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive && !isDetailsPage ? s.active : s.inactive
          }
        >
          Favourites
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
