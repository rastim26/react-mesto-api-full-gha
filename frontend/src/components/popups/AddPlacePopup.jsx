import Form from "./Form";
import React from "react";

function AddPlacePopup({
  isOpen, onClose, onAddPlace,
}) {

  const [name, setName] = React.useState('');
  const [link, setLink] =  React.useState('');

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name, link, 
    })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <Form 
      name="add-place" 
      title="Новое место"
      buttonTitle="создать"
      selector="popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input value={name} onChange={handleSetName} id="image-name" name="name" type="text" className="popup__input popup__input_type_name"
        placeholder="Название" required minLength="2" maxLength="20" />
      <span className="popup__error image-name-error"></span>
      <input value={link} onChange={handleSetLink} id="url" name="link" type="url" className="popup__input popup__input_type_info"
        placeholder="Ссылка на картинку" required />
      <span className="popup__error url-error"></span>
    </Form>
  )
}

export default AddPlacePopup;