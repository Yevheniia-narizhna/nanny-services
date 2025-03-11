import { useNavigate } from "react-router-dom";
import s from "./Welcome.module.css";
import { GoArrowUpRight } from "react-icons/go";
import { fetchNanniesCount } from "../../utils/nannies";
import { useEffect, useState } from "react";

const Welcome = () => {
  const [nanniesCount, setNanniesCount] = useState(0); // Стан для кількості нянь
  const [error, setError] = useState(null); // Стан для помилки
  const navCatalog = useNavigate();

  useEffect(() => {
    fetchNanniesCount(
      (count) => {
        setNanniesCount(count); // Оновлюємо кількість нянь
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
          <p>
            Experienced nannies <span>{nanniesCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
