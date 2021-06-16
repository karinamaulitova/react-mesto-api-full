import React from "react";

function InfoToolTip({ imageLink, popupText, id, onClose, alt }) {
  return (
    <section className="popup popup_opened">
      <div className="popup__form-container">
        <img className="popup__image" src={imageLink} alt={alt}></img>
        <p className="popup__heading popup__heading_type_info popup__heading_type_without-input">{popupText}</p>
        <button
          className="popup__close-button"
          id={`${id}-close-button`}
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoToolTip;
