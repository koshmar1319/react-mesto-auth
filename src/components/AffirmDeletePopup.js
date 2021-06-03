import React from "react";
import PopupWithForm from "./PopupWithForm";

function AffirmDeletePopup({
  isOpen,
  onClose,
  card,
  onSubmitDelete,
  buttonText,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmitDelete(card);
  }

  return (
    <PopupWithForm
      containerName="popup-sure__container"
      titleName="popup-sure__title"
      btnName="popup__btn_yes"
      title="Вы уверены?"
      name="delete"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={true}
    />
  );
}

export default AffirmDeletePopup;
