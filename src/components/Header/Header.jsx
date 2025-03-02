import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  const location = useLocation();
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
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Nannies
        </NavLink>
        {/* <NavLink to="/favourites">Favourites</NavLink> */}
      </div>
    </div>
  );
};

export default Header;
