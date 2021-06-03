import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const inputRef = React.useRef();

  const [linkInputValid, setLinkInputValid] = React.useState(true);
  const [linkErrorMessage, setLinkErrorMessage] = React.useState("");
  const [buttonState, setButtonState] = React.useState(false);
  const [linkOriginalState, setLinkOriginalState] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: inputRef.current.value });
  }

  function handleChange(e) {
    if (!e.target.validity.valid) {
      setLinkOriginalState(false);
      setLinkInputValid(false);
      setLinkErrorMessage(e.target.validationMessage);
    } else {
      setLinkOriginalState(false);
      setLinkInputValid(true);
    }
  }

  React.useEffect(() => {
    setLinkOriginalState(true);
    setLinkInputValid(true);
    setButtonState(false);
    inputRef.current.value = "";
  }, [isOpen]);

  React.useEffect(() => {
    if (linkInputValid && !linkOriginalState) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [linkInputValid, linkOriginalState]);

  return (
    <PopupWithForm
      containerName="popup-upd__container"
      titleName="popup-upd__title"
      btnName="popup-upd__btn"
      title="Обновить аватар"
      name="update"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <div className="popup__area">
        <input
          className="popup-upd__input popup__input"
          type="url"
          name="link"
          placeholder="Ссылка на аватар"
          ref={inputRef}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error popup-upd__input-error ${
            !linkInputValid ? "popup__input-error_active" : ""
          }`}
          id="popup-upd-error"
        >
          {linkErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
