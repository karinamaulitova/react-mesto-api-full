import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handlePlaceAdding(e) {
    setPlace(e.target.value);
  }

  function handleLinkAdding(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link,
    });
  }

  React.useEffect(() => {
    setPlace('');
    setLink('');
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="new-card"
      title="Новое место"
      submitText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="card-adding-popup-place-name-input"
        type="text"
        name="place-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={place}
        onChange={handlePlaceAdding}
      />
      <span className="popup__input-error card-adding-popup-place-name-input-error"></span>
      <input
        className="popup__input"
        id="card-adding-popup-image-link-input"
        type="url"
        name="image-link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkAdding}
      />
      <span className="popup__input-error card-adding-popup-image-link-input-error"></span>{" "}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
