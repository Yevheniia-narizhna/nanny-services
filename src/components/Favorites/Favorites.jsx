import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";
import NannyCard from "../NannyCard/NannyCard";
import Filter, { filterOptions } from "../Filter/Filter";
import s from "./Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredNannies, setFilteredNannies] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFavorites(currentUser.uid);
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [favorites]);

  const fetchFavorites = async (userId) => {
    setLoading(true);
    const db = getDatabase();
    const favoritesRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(favoritesRef);
    if (snapshot.exists()) {
      const favoritesData = snapshot.val();
      const favoritesList = Object.keys(favoritesData).map((nannyName) => ({
        name: nannyName,
        ...favoritesData[nannyName],
      }));
      setFavorites(favoritesList);
      setFilteredNannies(favoritesList);
    }
    setLoading(false);
  };

  const handleFilterChange = (selectedOption) => {
    let updatedNannies = [...favorites];

    if (selectedOption.value === "alphabet-asc") {
      updatedNannies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedOption.value === "alphabet-desc") {
      updatedNannies.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedOption.value === "rating-asc") {
      updatedNannies.sort((a, b) => a.rating - b.rating);
    } else if (selectedOption.value === "rating-desc") {
      updatedNannies.sort((a, b) => b.rating - a.rating);
    } else if (selectedOption.value === "price-less") {
      updatedNannies = updatedNannies.filter(
        (nanny) => nanny.price_per_hour < 10
      );
    } else if (selectedOption.value === "price-greater") {
      updatedNannies = updatedNannies.filter(
        (nanny) => nanny.price_per_hour >= 10
      );
    } else {
      updatedNannies = favorites;
    }

    setFilteredNannies(updatedNannies);
    setSelectedFilter(selectedOption.value);
    setVisibleCount(3);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className={s.listCont}>
      <div className={s.filter}>
        <Filter
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className={s.listContBtn}>
        {filteredNannies.length === 0 ? (
          <p className={s.noResults}>Nothing found</p>
        ) : (
          <ul className={s.list}>
            {filteredNannies.slice(0, visibleCount).map((nanny) => (
              <li key={nanny.name}>
                <NannyCard nanny={nanny} />
              </li>
            ))}
          </ul>
        )}
        {visibleCount < filteredNannies.length && (
          <button onClick={loadMore} className={s.loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Favorites;
