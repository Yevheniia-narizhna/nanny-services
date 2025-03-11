import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";
import s from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";
import Welcome from "../Welcome/Welcome";
import { fetchNannies } from "../../utils/nannies";

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);

  useEffect(() => {
    fetchNannies(setNannies, (error) => console.error(error));
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
    </>
  );
};

export default NanniesList;
