import Popup from "./Popup";

function InfoTooltip({
  isOpen,
  onClose,
  title,
  children,
}) {
  return (
    <Popup
      name="tooltip"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      selector="popup"
    >
      {children}
    </Popup>
  )
}

export default InfoTooltip;