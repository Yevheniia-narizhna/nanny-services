import { onValue, ref } from "firebase/database";
import { database } from "../../firebaseConfig";

export const fetchNannies = (callback, errorCallback) => {
  const nanniesRef = ref(database);
  onValue(
    nanniesRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        const nanniesArray = Object.values(value);
        callback(nanniesArray);
      } else {
        console.log("❌ Дані відсутні у Firebase!");
      }
    },
    (error) => {
      console.error("Firebase помилка:", error);
      errorCallback(error);
    }
  );
};

export const fetchNanniesCount = (callback, errorCallback) => {
  const nanniesRef = ref(database);
  onValue(
    nanniesRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        const count = Object.values(value).length; // Підрахунок кількості
        callback(count);
      } else {
        console.log("❌ Дані відсутні у Firebase!");
        callback(0); // Повертаємо 0, якщо дані відсутні
      }
    },
    (error) => {
      console.error("Firebase помилка:", error);
      errorCallback(error);
    }
  );
};
