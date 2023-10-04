import React from "react";
import Popup from "./Popup";

function Form({
  name, 
  title, 
  buttonTitle, 
  selector,
  isOpen, 
  onClose,
  onSubmit, 
  children}) {


  return (
    <Popup
      name={name}
      title={title}
      selector={selector}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form name={name} onSubmit={onSubmit} className={`${selector}__form ${name && `${selector}__form_type_${name}`}`}>
        {children}
        <button type="submit" aria-label="Save" className={`${selector}__button`}>
            {buttonTitle}
        </button>
      </form> 
    </Popup>
  );
}

export default Form;

