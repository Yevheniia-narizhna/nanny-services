import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TimePicker from "react-time-picker";
import { useState } from "react";
import { FaClock, FaRegClock } from "react-icons/fa";
import DateTimePicker from "react-datetime-picker";
import dayjs from "dayjs";

import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^(\+380\d{9})$/,
      "The phone number must be in the format +380XXXXXXXXX"
    )
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
    setIsTimePickerOpen((prev) => !prev); // Перемикає стан видимості вікна
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime); // оновлює вибраний час
    setIsTimePickerOpen(false); // закриває вибір часу після вибору
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
        <button onClick={onClose} className={s.btnModal}>
          Close
        </button>
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
              <input {...register("address")} placeholder="Address" />
              <p className={s.error}>{errors.address?.message}</p>

              <input
                type="number"
                {...register("childAge")}
                placeholder="Child's Age"
              />
              <p className={s.error}>{errors.childAge?.message}</p>
            </div>
            <div className={s.formContSecond}>
              <input
                type="tel"
                {...register("phone")}
                placeholder="+380"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // Видаляємо всі нецифрові символи
                  if (!value.startsWith("380")) {
                    value = "380" + value.replace(/^380/, ""); // Додаємо 380, якщо його немає
                  }
                  e.target.value = "+" + value;
                  setValue("phone", "+" + value, { shouldValidate: true }); // Оновлюємо значення для React Hook Form
                }}
              />
              <p className={s.error}>{errors.phone?.message}</p>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={s.timePickerCont}>
                  <div className={s.timePickerWrapp}>
                    <input
                      className={s.timeInput}
                      value={selectedTime.format("HH:mm")} // Виводимо вибраний час в форматі "HH:mm"
                      onClick={handleIconClick} // Відкриває вибір часу при натисканні
                      readOnly
                    />
                    {/* Іконка годинника, при натисканні відкривається вибір часу */}
                    <FaRegClock
                      className={s.clockIcon}
                      onClick={handleIconClick}
                    />

                    {/* Якщо isTimePickerOpen true, показуємо MultiSectionDigitalClock */}
                    {isTimePickerOpen && (
                      <div className={s.timePicker}>
                        <p className={s.timePickerText}>Meeting time</p>
                        <DigitalClock
                          className={s.timePickerD}
                          value={selectedTime}
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
            <input type="email" {...register("email")} placeholder="Email" />
            <p className={s.error}>{errors.email?.message}</p>

            <input
              {...register("name")}
              placeholder="Father's or mother's name"
            />
            <p className={s.error}>{errors.name?.message}</p>

            <textarea {...register("comment")} placeholder="Comment" />
            <p className={s.error}>{errors.comment?.message}</p>
          </div>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
