import s from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={s.welcomeCont}>
      <div className={s.contText}>
        <h1 className={s.title}>Make Life Easier for the Family:</h1>
        <p className={s.textWelc}>Find Babysitters Online for All Occasions</p>
        <button className={s.btnWelc}>Get started</button>
      </div>
      <div className={s.contImg}></div>
    </div>
  );
};

export default Welcome;
