import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";
import s from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";
import Welcome from "../Welcome/Welcome";

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);

  useEffect(() => {
    const nanniesRef = ref(database);
    console.log("Firebase Ref:", nanniesRef);

    onValue(
      nanniesRef,
      (snapshot) => {
        console.log("Отримали відповідь від Firebase");

        if (snapshot.exists()) {
          const value = snapshot.val();
          console.log("Firebase data:", value);
          const nanniesArray = Object.values(value);
          setNannies(nanniesArray);
        } else {
          console.log("❌ Дані відсутні у Firebase!");
        }
      },
      (error) => {
        console.error("Firebase помилка:", error);
      }
    );
  }, []);

  return (
    <>
      <ul className={s.list}>
        {nannies.map((nanny) => (
          <li key={nanny.name}>
            <NannyCard nanny={nanny} />
          </li>
        ))}
      </ul>
      <Welcome nanniesCount={nannies.length} />
    </>
  );
};

export default NanniesList;
