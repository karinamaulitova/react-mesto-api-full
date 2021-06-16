import React from "react";

function PopupWithForm({
  isOpen,
  id,
  title,
  name,
  children,
  submitText,
  onClose,
  onSubmit
}) {
  return (
    <section className={isOpen ? "popup popup_opened" : "popup"} id={id}>
      <div className="popup__form-container popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form className="popup__form" id={`${id}-form`} onSubmit={onSubmit} name={name} noValidate>
          {children}
          <button className="popup__save-button" type="submit">
            {submitText}
          </button>
        </form>
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

export default PopupWithForm;
