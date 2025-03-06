import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useForm } from "react-hook-form";
import s from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsModalOpen }) => {
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
      // alert("Вхід успішний!");
    } catch (error) {
      // alert(error.message);
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
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={s.formLogInp}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" className={s.btnLog}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
