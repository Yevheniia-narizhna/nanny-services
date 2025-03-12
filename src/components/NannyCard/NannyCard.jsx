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
        <button className={s.btnFav}>
          <svg className={s.svgFav}>
            <use href="/symbol-defs.svg#icon-Property-1Normal"></use>
          </svg>
        </button>
        <h3>{nanny.name}</h3>
        <ul>
          <li>Age: {age}</li>
          <li>Experience: {nanny.experience}</li>
          <li>Kids Age: {nanny.kids_age}</li>
          <li>
            Characters:{" "}
            {nanny.characters
              .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
              .join(", ")}
          </li>
          <li>Education: {nanny.education}</li>
        </ul>
        <p>{nanny.about}</p>
        {!showReviews && (
          <button onClick={handleClick}>Read more</button> // Кнопка "Read more"
        )}
        {showReviews && (
          <div className={s.revCont}>
            <Reviews reviews={nanny.reviews} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NannyCard;
