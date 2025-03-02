import s from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={s.welcomeCont}>
      <div className={s.contText}>
        <h1>Make Life Easier for the Family:</h1>
        <p>Find Babysitters Online for All Occasions</p>
        <button>Get started</button>
      </div>
      <div className={s.contImg}></div>
    </div>
  );
};

export default Welcome;
