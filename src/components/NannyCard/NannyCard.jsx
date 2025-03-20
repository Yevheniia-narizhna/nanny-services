import { useEffect, useState } from "react";
import s from "./NannyCard.module.css";
import { getAge } from "../../utils/nannies";
import { GoStarFill } from "react-icons/go";
import Reviews from "../Reviews/Reviews";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import {
  addToFavorites,
  checkIfFavorite,
  removeFromFavorites,
} from "../../utils/favourites";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const NannyCard = ({ nanny }) => {
  const [age, setAge] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  const userId = user?.uid;

  const handleClick = () => {
    setShowReviews(true);
  };

  const handleHeartClick = async (event) => {
    if (!user) {
      const rect = event.target.getBoundingClientRect();
      toast.error("This feature is only available to authorized users.", {
        position: "top-left",
        style: {
          position: "absolute",
          top: `${rect.top + window.scrollY - 50}px`,
          left: `${rect.left - 400}px`,
        },
      });
      return;
    }

    if (isFavorite) {
      await removeFromFavorites(userId, nanny);
      setIsFavorite(false);
    } else {
      await addToFavorites(userId, nanny);
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    if (nanny.birthday) {
      setAge(getAge(nanny.birthday));
    }
  }, [nanny.birthday]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        checkIfFavorite(currentUser.uid, nanny, setIsFavorite);
      } else {
        setIsFavorite(false);
      }
    });

    return () => unsubscribe();
  }, [nanny]);

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
              <p>
                Price / 1 hour: <span>${nanny.price_per_hour}</span>
              </p>
            </li>
          </ul>
        </div>
        <button
          className={`${s.btnFav} ${isFavorite ? s.active : ""}`}
          onClick={handleHeartClick}
        >
          <svg className={s.svgFav}>
            <use href="/symbol-defs.svg#icon-Property-1Normal"></use>
          </svg>
        </button>
        <ToastContainer draggable={false} closeOnClick={false} />
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
            {nanny.characters && nanny.characters.length > 0 ? (
              <span className={s.spanDet}>
                {nanny.characters
                  .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
                  .join(", ")}
              </span>
            ) : (
              <span>No characters available</span>
            )}
          </li>
          <li>
            Education: <span className={s.spanDet}>{nanny.education}</span>
          </li>
        </ul>
        <p className={s.about}>{nanny.about}</p>
        {!showReviews && (
          <button onClick={handleClick} className={s.btnRMore}>
            Read more
          </button>
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
