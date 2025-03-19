import { onValue, ref } from "firebase/database";
import { database } from "../../firebaseConfig";

export const fetchNannies = (callback, errorCallback) => {
  const nanniesRef = ref(database);
  onValue(
    nanniesRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        const nanniesArray = Object.values(value).filter(
          (item) => typeof item === "object" && item.name
        );
        callback(nanniesArray);
      } else {
        console.log("❌ Дані відсутні у Firebase!");
      }
    },
    (error) => {
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
        const count = Object.values(value).filter(
          (item) => typeof item === "object" && item.name
        ).length;
        callback(count);
      } else {
        console.log("❌ Дані відсутні у Firebase!");
        callback(0);
      }
    },
    (error) => {
      errorCallback(error);
    }
  );
};

export function getAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
