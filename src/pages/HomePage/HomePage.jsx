import Welcome from "../../components/Welcome/Welcome";
import s from "./HomePage.module.css";
const HomePage = () => {
  return (
    <div className={s.homeCont}>
      <Welcome />
    </div>
  );
};

export default HomePage;
