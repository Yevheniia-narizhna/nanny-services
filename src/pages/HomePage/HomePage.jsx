import Welcome from "../../components/Welcome/Welcome";
import s from "./HomePage.module.css";

const HomePage = ({ nanniesCount }) => {
  return (
    <div className={s.homeCont}>
      <Welcome nanniesCount={nanniesCount} />
    </div>
  );
};

export default HomePage;
