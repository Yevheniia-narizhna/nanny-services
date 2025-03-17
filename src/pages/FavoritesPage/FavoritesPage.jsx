import Favorites from "../../components/Favorites/Favorites";
import s from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  return (
    <div className={s.favPage}>
      <Favorites />
    </div>
  );
};

export default FavoritesPage;
