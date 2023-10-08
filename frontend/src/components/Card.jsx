import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем


  function handleClick() {
    onCardClick(card);
  }
  
  function hahdleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img onClick={handleClick} src={card.link} alt={card.name} className="card__thumbnail" />
      {isOwn && <button onClick={handleDeleteClick} aria-label="Delete" className="card__button-del" type="button" />} 
      <div className="card__descr">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button onClick={hahdleLikeClick} aria-label="Like" className={`card__like-button ${isLiked && 'card__like-button_active'}`} type="button"></button>
          <p className="card__display">{card.likes.length || 0}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;