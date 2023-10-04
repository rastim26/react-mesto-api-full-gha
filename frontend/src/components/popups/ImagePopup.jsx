function ImagePopup ({card, onClose}) {
  return (
    <section className={`popup popup_type_image image-popup ${card.name && 'popup_open'}`}>
      <div className="image-popup__container">
        <img src={card.link} alt={card.name} className="image-popup__image" />
        <p className="image-popup__descr">{card.name}</p>
        <button onClick={onClose} type="button" aria-label="Close" className="popup__close"></button>
      </div>
    </section>
  );
}

export default ImagePopup ;