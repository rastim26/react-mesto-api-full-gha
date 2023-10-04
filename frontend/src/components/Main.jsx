import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function 
Main({
  onEditProfile, 
  onAddPlace, 
  onEditAvatar, 
  onCardClick,
  onCardLike,
  onCardDelete,
  cards}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
          <button className="profile__overlay" onClick={onEditAvatar}></button>
          <div className="profile__control">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button type="button" aria-label="Edit" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
        </div>
        <button type="button" aria-label="Add" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="gallery">
        <ul className="cards">
          {cards.map((card) => (
            <Card card={card} 
              key={card._id} 
              onCardClick={onCardClick} 
              onCardLike={onCardLike} 
              onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}



export default Main;