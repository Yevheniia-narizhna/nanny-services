import { get, getDatabase, ref, remove, set } from "firebase/database";

export const addToFavorites = async (userId, nanny) => {
  if (!userId || !nanny) return;
  console.log("Додаємо в обрані:", { userId, nanny });

  const db = getDatabase();
  const favoritesRef = ref(db, `favorites/${userId}/${nanny.name}`);
  await set(favoritesRef, nanny); // Позначаємо, що ця няня додана
};

// Видаляє няню з обраних
export const removeFromFavorites = async (userId, nanny) => {
  if (!userId || !nanny) return;
  console.log("Видаляємо з обраних:", { userId, nanny });

  const db = getDatabase();
  const favoritesRef = ref(db, `favorites/${userId}/${nanny.name}`);
  await remove(favoritesRef);
};

// Перевіряє, чи няня є в обраних
export const checkIfFavorite = async (userId, nanny, setIsFavorite) => {
  if (!userId || !nanny) return;

  const db = getDatabase();
  const favoritesRef = ref(db, `favorites/${userId}/${nanny.name}`);
  const snapshot = await get(favoritesRef);
  setIsFavorite(snapshot.exists()); // Якщо запис є – встановлюємо true
};
