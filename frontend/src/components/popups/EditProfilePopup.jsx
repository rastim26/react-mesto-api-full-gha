import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Form from "./Form";
import React from "react";

function EditProfilePopup({
  isOpen, onClose, onUpdateUser
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      description: currentUser.about,
    })
  }, [currentUser, isOpen]);

  const handleChange = (event) => { 
    const { name, value } = event.target
      setValues((prev) => ({ 
      ...prev, 
      [name]: value,
    })) 
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({    // Передаём значения управляемых компонентов во внешний обработчик
      name: values.name,
      about: values.description,
    });
  } 

  
  return (
    <Form 
      name="edit-profile" 
      title="Редактировать профиль" 
      buttonTitle="сохранить"
      selector="popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input value={values.name || ''} onChange={handleChange} id="name" name="name" type="text" placeholder="Имя" className="popup__input popup__input_type_name" required
        minLength="2" maxLength="40" />
      <span className="popup__error name-error">Вы пропустили это поле.</span>
      <input value={values.description || ''} onChange={handleChange} id="about" name="description" type="text" placeholder="О себе" className="popup__input popup__input_type_info" required
        minLength="2" maxLength="200" />
      <span className="popup__error about-error">Вы пропустили это поле.</span>
    </Form>
  )
}

export default EditProfilePopup;