import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      id="avatar-edit-popup"
      name="avatar-form"
      title="Обновить аватар"
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        defaultValue=''
        className="popup__input"
        id="avatar-edit-popup-url-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error avatar-edit-popup-url-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
