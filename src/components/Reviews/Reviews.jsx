import { GoStarFill } from "react-icons/go";
import s from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
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
      <button className={s.btnRew}>Make an appointment</button>
    </div>
  );
};

export default Reviews;
