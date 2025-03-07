import s from "./NannyCard.module.css";

const NannyCard = ({ nanny }) => {
  return (
    <div className={s.card}>
      <img src={nanny.avatar_url} alt={nanny.name} />
      <h3>{nanny.name}</h3>
      <p>
        <strong>Досвід:</strong> {nanny.experience}
      </p>
      <p>
        <strong>Локація:</strong> {nanny.location}
      </p>
      <p>
        <strong>Ціна за годину:</strong> ${nanny.price_per_hour}
      </p>
      <p>
        <strong>Рейтинг:</strong> ⭐{nanny.rating}
      </p>
    </div>
  );
};

export default NannyCard;
