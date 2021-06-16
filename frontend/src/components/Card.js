import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeCLick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `elements__delete-button ${
    isOwn ? "" : "elements__delete-button_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked ? "elements__like-button_active" : ""
  }`;

  return (
    <li className="elements__item">
      <img
        className="elements__photo"
        src={card.link}
        alt={`Фото места ${card.name}`}
        onClick={handleClick}
      />
      <div className="elements__description-container">
        <h2 className="elements__description">{card.name}</h2>
        <div className="elements__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeCLick}></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button onClick={handleCardDelete} className={cardDeleteButtonClassName} type="button"></button>
    </li>
  );
}

export default Card;
