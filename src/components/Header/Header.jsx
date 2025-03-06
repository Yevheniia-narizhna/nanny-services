import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import { IoCloseOutline } from "react-icons/io5";
import { auth } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";

const Header = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("register");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isCatalogPage =
    location.pathname === "/catalog" || location.pathname === "/favourites";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleClick = (buttonType) => {
    setActiveButton(buttonType);
    setIsModalOpen(true);
  };

  return (
    <div className={`${s.headerCont} ${isCatalogPage ? s.catalogHeader : ""}`}>
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
        {user &&
          (location.pathname === "/catalog" ||
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
        {user ? (
          <div className={s.userInfo}>
            <span>{user.displayName || "User"}</span>
            <button
              type="button"
              className={s.btnLogout}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
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
        )}
      </div>
      {isModalOpen && (
        <div className={s.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={s.closeIcon}>
              <IoCloseOutline size={32} onClick={() => setIsModalOpen(false)} />
            </div>

            <div>
              {activeButton === "login" ? (
                <Login setIsModalOpen={setIsModalOpen} />
              ) : (
                <Registration setIsModalOpen={setIsModalOpen} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
