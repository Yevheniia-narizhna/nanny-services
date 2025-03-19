import { get, getDatabase, ref, remove, set } from "firebase/database";

export const addToFavorites = async (userId, nanny) => {
  if (!userId || !nanny) return;


  const db = getDatabase();
  const favoritesRef = ref(db, `favorites/${userId}/${nanny.name}`);
  await set(favoritesRef, nanny); 
};


export const removeFromFavorites = async (userId, nanny) => {
  if (!userId || !nanny) return;
  

  const db = getDatabase();
  const favoritesRef = ref(db, `favorites/${userId}/${nanny.name}`);
  await remove(favoritesRef);
};


export const checkIfFavorite = async (userId, nanny, setIsFavorite) => {
  if (!userId || !nanny) return;

  const db = getDatabase();
  const favoritesRef = ref(db, `favorites/${userId}/${nanny.name}`);
  const snapshot = await get(favoritesRef);
  setIsFavorite(snapshot.exists()); 
};
