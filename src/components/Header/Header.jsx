import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import { IoCloseOutline } from "react-icons/io5";
import { auth } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { BiSolidUser } from "react-icons/bi";

const Header = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("register");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isCatalogPage =
    location.pathname === "/catalog" || location.pathname === "/favorites";

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
      <img className={s.iconLogo} src="/nanny-services.png" alt="Logo" />
      <div
        className={`${s.navigation} ${isCatalogPage ? s.navigationHeader : ""}`}
      >
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
            location.pathname === "/favorites") && (
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? s.active : s.inactive)}
            >
              Favorites
            </NavLink>
          )}
      </div>
      <div className={s.btnCont}>
        {user ? (
          <div className={s.userInfo}>
            <div className={s.svgUser}>
              <BiSolidUser />
            </div>
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
          <div className={s.contLogReg}>
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
