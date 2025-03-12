import { useEffect, useState } from "react";
import s from "./NannyCard.module.css";
import { get, getDatabase, ref } from "firebase/database";
import { getAge } from "../../utils/nannies";
import { GoStarFill } from "react-icons/go";

const NannyCard = ({ nanny }) => {
  const [age, setAge] = useState(null);

  useEffect(() => {
    if (nanny.birthday) {
      setAge(getAge(nanny.birthday));
    }
  }, [nanny.birthday]);

  return (
    <div className={s.card}>
      <img src={nanny.avatar_url} alt={nanny.name} className={s.cardImg} />
      <p>Nanny</p>
      <ul>
        <li>
          <svg className={s.svgLoc}>
            <use href="/symbol-defs.svg#icon-map-pin"></use>
          </svg>
          <span>{nanny.location}</span>
        </li>
        <li>
          <GoStarFill className={s.svgRat} />
          <span>Rating: {nanny.rating}</span>
        </li>
        <li>
          <span>Price / 1 hour: ${nanny.price_per_hour}</span>
        </li>
      </ul>
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
    </div>
  );
};

export default NannyCard;
