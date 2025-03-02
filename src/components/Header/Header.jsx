import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";
import { useState } from "react";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";

const Header = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("register");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (buttonType) => {
    setActiveButton(buttonType);
    setIsModalOpen(true);
  };

  return (
    <div className={s.headerCont}>
      <img className={s.iconLogo} src="/logo-nanny.svg" alt="Logo" />
      <div className={s.navigation}>
        <NavLink to="/" className={s.inactive}>
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Nannies
        </NavLink>
        {(location.pathname === "/catalog" ||
          location.pathname === "/favourites") && (
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? s.active : s.inactive)}
          >
            Favourites
          </NavLink>
        )}
      </div>
      <div className={s.btnCont}>
        <button
          type="button"
          className={`${s.btnLog} ${
            activeButton === "login" ? s.activeBtn : ""
          }`}
          onClick={() => handleClick("login")}
        >
          Log in
        </button>
        <button
          type="button"
          className={`${s.btnReg} ${
            activeButton === "register" ? s.activeBtn : ""
          }`}
          onClick={() => handleClick("register")}
        >
          Registration
        </button>
      </div>
      {isModalOpen && (
        <div className={s.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{activeButton === "login" ? <Login /> : <Registration />}</h2>
            <button onClick={() => setIsModalOpen(false)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
