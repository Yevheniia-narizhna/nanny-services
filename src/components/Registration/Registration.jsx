import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebaseConfig";
// import { auth } from "./firebaseConfig.js";

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

const Registration = () => {
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
      // alert("Реєстрація успішна!");
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Ім'я" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Пароль" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Registration;
