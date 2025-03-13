import { GoStarFill } from "react-icons/go";
import s from "./Reviews.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";

const Reviews = ({ reviews }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!reviews || reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <div>
      <div className={s.contRev}>
        {reviews.map((review, index) => (
          <div key={index}>
            <div className={s.titles}>
              <p className={s.letter}>{review.reviewer.charAt(0)}</p>
              <div className={s.nameStar}>
                <p>{review.reviewer}</p>
                <div className={s.contStar}>
                  <GoStarFill className={s.iconStar} />
                  <span>{Number(review.rating).toFixed(1)}</span>
                </div>
              </div>
            </div>
            <p className={s.textRew}>{review.comment}</p>
          </div>
        ))}
      </div>
      <button className={s.btnRew} onClick={() => setIsOpen(true)}>
        Make an appointment
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Reviews;
