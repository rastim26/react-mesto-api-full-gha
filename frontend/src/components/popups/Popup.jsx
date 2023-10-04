function Popup({
  name,
  title,
  selector,
  isOpen,
  onClose,
  children
}) {
  return (
    <section className={`${selector} ${isOpen && `${selector}_open`}`}>
      <div className={`${selector}__container ${name && `${selector}__container_type_${name}`}`}>
        <h2 className={`${selector}__title ${name && `${selector}__title_type_${name}`}`}>{title}</h2>
        {children}
        {onClose && <button typed="button" aria-label="Close" className={`${selector}__close`} onClick={onClose}></button>}
      </div>
    </section>
  )
}

export default Popup;