import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";
import NannyCard from "../NannyCard/NannyCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Стан для зберігання улюблених нянь
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Підписка на зміну стану аутентифікації
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFavorites(currentUser.uid); // Якщо користувач є, завантажуємо його обрані
      } else {
        setUser(null);
        setFavorites([]); // Якщо користувач не авторизований, очищаємо улюблені
      }
    });

    return () => unsubscribe();
  }, []);

  // Функція для завантаження обраних
  const fetchFavorites = async (userId) => {
    setLoading(true);
    const db = getDatabase();
    const favoritesRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(favoritesRef); // Отримуємо дані з Firebase
    if (snapshot.exists()) {
      const favoritesData = snapshot.val(); // Отримуємо всі обрані
      const favoritesList = Object.keys(favoritesData).map((nannyName) => ({
        name: nannyName, // Для кожної няні створюємо об'єкт з її ім'ям
        ...favoritesData[nannyName], // Якщо є інші дані (можна додавати їх тут)
      }));
      setFavorites(favoritesList); // Оновлюємо список обраних
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Your Favorite Nannies</h1>
      {loading ? (
        <p>Loading...</p> // Показуємо індикатор завантаження
      ) : favorites.length > 0 ? (
        <div>
          {favorites.map((nanny) => (
            <NannyCard key={nanny.name} nanny={nanny} />
          ))}
        </div>
      ) : (
        <p>You have no favorite nannies yet.</p>
      )}
    </div>
  );
};

export default Favorites;
