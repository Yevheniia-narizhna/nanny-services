import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import dayjs from "dayjs";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IoCloseOutline } from "react-icons/io5";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^(\+380\d{9})$/, "Invalid phone number")
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

const Modal = ({ isOpen, onClose, onSubmit, nanny }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs("2022-04-17T15:30"));
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleIconClick = () => {
    setIsTimePickerOpen((prev) => !prev);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    setIsTimePickerOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  if (!isOpen) return null;
  return createPortal(
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.btnModal}>
          <IoCloseOutline size={32} onClick={onClose} />
        </div>
        <h2 className={s.title}>Make an appointment with a babysitter</h2>
        <p className={s.text}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
        <div className={s.contNanny}>
          <img src={nanny.avatar_url} alt={nanny.name} className={s.nannyImg} />
          <div className={s.contNannyText}>
            <p>Your nanny</p>
            <h3>{nanny.name}</h3>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.formCont}>
            <div className={s.formContFirst}>
              <div className={s.inputWrapper}>
                <input {...register("address")} placeholder="Address" />
                <p className={s.error}>{errors.address?.message}</p>
              </div>
              <div className={s.inputWrapper}>
                <input
                  type="number"
                  {...register("childAge")}
                  placeholder="Child's Age"
                />
                <p className={s.error}>{errors.childAge?.message}</p>
              </div>
            </div>
            <div className={s.formContSecond}>
              <div className={s.inputWrapper}>
                <input type="tel" {...register("phone")} placeholder="+380" />
                <p className={s.error}>{errors.phone?.message}</p>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={s.timePickerCont}>
                  <div className={`${s.inputWrapper} ${s.timePickerWrapp}`}>
                    <input
                      className={s.timeInput}
                      value={selectedTime.format("HH:mm") || "00:00"}
                      onClick={handleIconClick}
                      readOnly
                    />

                    <FaRegClock
                      className={s.clockIcon}
                      onClick={handleIconClick}
                    />

                    {isTimePickerOpen && (
                      <div className={s.timePicker}>
                        <p className={s.timePickerText}>Meeting time</p>

                        <DigitalClock
                          className={s.timePickerD}
                          value={selectedTime || "00:00"}
                          onChange={handleTimeChange}
                          ampm={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <div className={s.inputWrapper}>
              <input type="email" {...register("email")} placeholder="Email" />
              <p className={s.error}>{errors.email?.message}</p>
            </div>
            <div className={s.inputWrapper}>
              <input
                {...register("name")}
                placeholder="Father's or mother's name"
              />
              <p className={s.error}>{errors.name?.message}</p>
            </div>
            <div className={s.inputWrapper}>
              <textarea {...register("comment")} placeholder="Comment" />
              <p className={s.error}>{errors.comment?.message}</p>
            </div>
          </div>

          <button type="submit" className={s.btnSubmit}>
            Send
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
