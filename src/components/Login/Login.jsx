import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useForm } from "react-hook-form";
import s from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setIsModalOpen }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsModalOpen(false);
      navigate("/catalog");
    } catch (error) {
      error.message;
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <p className={s.textLog}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formLog}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className={s.formLogInp}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={s.formLogInp}
        />
        <span
          className={s.spanIcons}
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          <svg
            className={s.svgSingUp}
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="#000"
            stroke="#000"
          >
            <use
              href={`/sprite.svg#${
                passwordVisible ? "icon-eye" : "icon-eye-off"
              }`}
            ></use>
          </svg>
        </span>
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" className={s.btnLog}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
