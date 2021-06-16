import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function MainLayout({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото"
            />
          </button>
          <div className="profile__info-wrapper">
            <div className="profile__heading-button-wrapper">
              <h1 className="profile__heading" id="profile-heading">
                {currentUser.name}
              </h1>
              <button
                className="profile__edit-button"
                id="profile-edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subheading" id="profile-subheading">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          className="profile__adding-button"
          id="card-adding-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements" aria-label="Карточки с фотографиями">
        <ul className="elements__list" id="elements-list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default MainLayout;
