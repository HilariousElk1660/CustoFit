import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Modal.css";

export default function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-2" onClick={(e) => e.stopPropagation()}>
        <DotLottieReact
          src="https://lottie.host/9ad42da6-1686-4a70-a485-72d9fd01f40d/2QxCQ9Fa8B.lottie"
          autoplay
        />
        <p className="modal-message">{message}</p>
        <button className="modal-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}