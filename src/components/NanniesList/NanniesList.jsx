import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";
import s from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);

  //   useEffect(() => {
  //     const nanniesRef = ref(database, "/");
  //     onValue(nanniesRef, (snapshot) => {
  //       const value = snapshot.val();
  //       console.log("Firebase data:", value);
  //       if (value) {
  //         setNannies(
  //           Object.entries(value).map(([id, item]) => ({ id, ...item }))
  //         );
  //       }
  //     });
  //   }, []);

  //   useEffect(() => {
  //     console.log("useEffect запущено!");
  //     console.log("Database object:", database);

  //     const nanniesRef = ref(database, "nannies");
  //     onValue(nanniesRef, (snapshot) => {
  //       console.log("Отримали відповідь від Firebase");
  //       const value = snapshot.val();
  //       console.log("Firebase data:", value); // Подивись у консолі

  //       if (value) {
  //         const formattedData = Object.entries(value).map(([id, item]) => ({
  //           id,
  //           ...item,
  //         }));
  //         console.log("Formatted nannies:", formattedData); // Перевір, що дані є
  //         setNannies(formattedData);
  //       }
  //     });
  //   }, []);

  //   useEffect(() => {
  //     console.log("useEffect запущено!");

  //     const nanniesRef = ref(database, "");
  //     console.log("Firebase Ref створено:", nanniesRef);

  //     onValue(
  //       nanniesRef,
  //       (snapshot) => {
  //         console.log("Отримали відповідь від Firebase");

  //         if (snapshot.exists()) {
  //           const value = snapshot.val();
  //           console.log("Firebase data:", value);
  //           setNannies(
  //             Object.entries(value).map(([id, item]) => ({ id, ...item }))
  //           );
  //         } else {
  //           console.log("❌ Дані відсутні у Firebase!");
  //         }
  //       },
  //       (error) => {
  //         console.error("Firebase помилка:", error);
  //       }
  //     );
  //   }, []);

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

          setNannies(value);
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
    <ul className={s.list}>
      {nannies.map((nanny) => (
        <li key={nanny.name}>
          <NannyCard nanny={nanny} />
        </li>
      ))}
    </ul>
  );
};

export default NanniesList;
