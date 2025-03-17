import NanniesList from "../../components/NanniesList/NanniesList";
import s from "./NanniesPage.module.css";

const NanniesPage = () => {
  return (
    <div className={s.nanniesPage}>
      <NanniesList />
    </div>
  );
};

export default NanniesPage;
