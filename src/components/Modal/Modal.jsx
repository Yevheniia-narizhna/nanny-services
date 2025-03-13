import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Appointment Form</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
