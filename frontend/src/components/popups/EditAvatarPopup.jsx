import Form from "./Form";
import React from "react";

function EditAvatarPopup({
  isOpen, onClose, onUpdateAvatar
}) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <Form 
      name="edit-avatar" 
      title="Обновить аватар" 
      buttonTitle="загрузить"
      selector="popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input ref={avatarRef} id="avatar-link" name="link" type="url" className="popup__input popup__input_type_info"
        placeholder="Ссылка на картинку" required />
      <span className="popup__error avatar-link-error"></span>
    </Form>
  )
}

export default EditAvatarPopup;