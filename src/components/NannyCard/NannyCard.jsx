import { useEffect, useState } from "react";
import s from "./NannyCard.module.css";
import { get, getDatabase, ref } from "firebase/database";
import { getAge } from "../../utils/nannies";
import { GoStarFill } from "react-icons/go";
import Reviews from "../Reviews/Reviews";

const NannyCard = ({ nanny }) => {
  const [age, setAge] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const handleClick = () => {
    setShowReviews(true);
  };

  useEffect(() => {
    if (nanny.birthday) {
      setAge(getAge(nanny.birthday));
    }
  }, [nanny.birthday]);

  return (
    <div className={s.card}>
      <div>
        <img src={nanny.avatar_url} alt={nanny.name} className={s.cardImg} />
      </div>
      <div>
        <div className={s.contNannLocRat}>
          <p>Nanny</p>
          <ul className={s.ulLoc}>
            <li className={s.liLoc}>
              <svg className={s.svgLoc}>
                <use href="/symbol-defs.svg#icon-map-pin"></use>
              </svg>
              <span>{nanny.location}</span>
            </li>
            <li className={s.liRat}>
              <GoStarFill className={s.svgRat} />
              <span>Rating: {nanny.rating}</span>
            </li>
            <li className={s.liPr}>
              <span>Price / 1 hour: ${nanny.price_per_hour}</span>
            </li>
          </ul>
        </div>
        <button className={s.btnFav}>
          <svg className={s.svgFav}>
            <use href="/symbol-defs.svg#icon-Property-1Normal"></use>
          </svg>
        </button>
        <h3 className={s.name}>{nanny.name}</h3>
        <ul className={s.ulDetails}>
          <li>
            Age: <span className={s.spanDet}>{age}</span>
          </li>
          <li>
            Experience: <span className={s.spanDet}>{nanny.experience}</span>
          </li>
          <li>
            Kids Age: <span className={s.spanDet}>{nanny.kids_age}</span>
          </li>
          <li>
            Characters:{" "}
            <span className={s.spanDet}>
              {nanny.characters
                .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
                .join(", ")}
            </span>
          </li>
          <li>
            Education: <span className={s.spanDet}>{nanny.education}</span>
          </li>
        </ul>
        <p className={s.about}>{nanny.about}</p>
        {!showReviews && (
          <button onClick={handleClick} className={s.btnRMore}>
            Read more
          </button> // Кнопка "Read more"
        )}
        {showReviews && (
          <div className={s.revCont}>
            <Reviews reviews={nanny.reviews} nanny={nanny} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NannyCard;
