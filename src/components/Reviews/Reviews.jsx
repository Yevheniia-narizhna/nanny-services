const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <div className="reviews">
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>
            <strong>{review.reviewer}:</strong> {review.comment}
          </p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
