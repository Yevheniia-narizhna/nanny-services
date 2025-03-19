import { useNavigate } from "react-router-dom";
import s from "./Welcome.module.css";
import { GoArrowUpRight } from "react-icons/go";
import { fetchNanniesCount } from "../../utils/nannies";
import { useEffect, useState } from "react";

const Welcome = () => {
  const [nanniesCount, setNanniesCount] = useState(0);
  const [error, setError] = useState(null);
  const navCatalog = useNavigate();

  useEffect(() => {
    fetchNanniesCount(
      (count) => {
        setNanniesCount(count);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  const toCatalog = () => {
    navCatalog("/catalog");
  };

  if (error) {
    return <div>Помилка: {error.message}</div>;
  }

  return (
    <div className={s.welcomeCont}>
      <div className={s.contText}>
        <div className={s.contTitle}>
          <h1 className={s.title}>Make Life Easier for the Family:</h1>
          <p className={s.textWelc}>
            Find Babysitters Online for All Occasions
          </p>
          <button type="button" className={s.btnWelc} onClick={toCatalog}>
            Get started
            <GoArrowUpRight className={s.iconWelc} size={32} />
          </button>
        </div>
      </div>
      <div className={s.contImg}>
        <div className={s.contCount}>
          <div className={s.contsvg}>
            <svg className={s.svgCheck}>
              <use href="/symbol-defs.svg#icon-feCheck0"></use>
            </svg>
          </div>
          <div className={s.expNannCont}>
            <p className={s.expNann}>Experienced nannies</p>
            <p className={s.expNannCount}>{nanniesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
