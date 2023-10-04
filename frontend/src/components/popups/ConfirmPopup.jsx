import Form from "./Form";

function ConfirmPopup({
  isOpen,
  currentCard,
  onClose,
  onConfirm,
}) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(currentCard);
  }

  return (
    <Form 
      name="confirm" 
      title="Вы уверены?" 
      buttonTitle="так точно!"
      selector="popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmPopup;