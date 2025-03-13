import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,14}$/, "Invalid phone number")
    .required("Phone is required"),
  address: yup.string().required("Address is required"),
  childAge: yup
    .number()
    .typeError("Must be a number")
    .positive()
    .integer()
    .required("Child's age is required"),
  meetingTime: yup.string().required("Meeting time is required"),
  comment: yup.string().required("Comment is required"),
});

const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return createPortal(
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Appointment Form</h2>
        <button onClick={onClose}>Close</button>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <label>Address</label>
          <input {...register("address")} />
          <p className={s.error}>{errors.address?.message}</p>
          <label>Phone Number</label>
          <input type="tel" {...register("phone")} />
          <p className={s.error}>{errors.phone?.message}</p>
          <label>Child's Age</label>
          <input type="number" {...register("childAge")} />
          <p className={s.error}>{errors.childAge?.message}</p>
          <label>Meeting Time</label>
          <input type="time" {...register("meetingTime")} />
          <p className={s.error}>{errors.meetingTime?.message}</p>
          <label>Email</label>
          <input type="email" {...register("email")} />
          <p className={s.error}>{errors.email?.message}</p>
          <label>Name</label>
          <input {...register("name")} />
          <p className={s.error}>{errors.name?.message}</p>
          <label>Comment</label>
          <textarea {...register("comment")} />
          <p className={s.error}>{errors.comment?.message}</p>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
