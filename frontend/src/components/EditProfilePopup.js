import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      id="edit-profile-popup"
      name="profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="edit-profile-popup-name-input"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error edit-profile-popup-name-input-error"></span>
      <input
        className="popup__input"
        id="edit-profile-popup-job-input"
        type="text"
        name="job"
        placeholder="Род занятий"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error edit-profile-popup-job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
