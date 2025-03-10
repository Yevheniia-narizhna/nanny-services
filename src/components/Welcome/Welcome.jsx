import { useNavigate } from "react-router-dom";
import s from "./Welcome.module.css";
import { GoArrowUpRight } from "react-icons/go";

const Welcome = ({ nanniesCount }) => {
  const navCatalog = useNavigate();

  const toCatalog = () => {
    navCatalog("/catalog");
  };
  return (
    <div className={s.welcomeCont}>
      <div className={s.contText}>
        <h1 className={s.title}>Make Life Easier for the Family:</h1>
        <p className={s.textWelc}>Find Babysitters Online for All Occasions</p>
        <button type="button" className={s.btnWelc} onClick={toCatalog}>
          Get started
          <GoArrowUpRight className={s.iconWelc} size={32} />
        </button>
      </div>
      <div className={s.contImg}>
        <div>Experienced nannies {nanniesCount}</div>
      </div>
    </div>
  );
};

export default Welcome;
