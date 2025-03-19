import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebaseConfig";
import s from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Registration = ({ setIsModalOpen }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, { displayName: data.name });
      setIsModalOpen(false);
      navigate("/catalog");
    } catch (error) {
      error.message;
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <p className={s.textReg}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formReg}>
        <div className={s.divRegInp}>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={s.formRegInp}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={s.divRegInp}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={s.formRegInp}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={s.divRegInp}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={s.formRegInp}
          />
          <span
            className={s.spanIcons}
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </span>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className={s.btnRegist}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Registration;
