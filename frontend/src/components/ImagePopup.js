import React from "react";

function ImagePopup({card, onClose}) {
  const link = card ? card.link : "";
  const name = card ? card.name : "";

  return (
    <section
      className={
        card ? "photo-popup popup popup_opened" : "photo-popup popup"
      }
      id="photo-popup"
      aria-label="Фото попап"
    >
      <div className="photo-popup__container popup__container">
        <figure className="photo-popup__image-wrapper">
          <img className="photo-popup__image" src={link} alt="Фото места" />
          <figcaption className="photo-popup__description">{name}</figcaption>
        </figure>
        <button
          onClick={onClose}
          className="photo-popup__close-button popup__close-button popup__close-button_type_photo-mobile"
          type="button"
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
