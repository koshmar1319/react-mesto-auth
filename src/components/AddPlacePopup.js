import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const [nameInputValid, setNameInputValid] = React.useState(true);
  const [linkInputValid, setLinkInputValid] = React.useState(true);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [linkErrorMessage, setLinkErrorMessage] = React.useState("");
  const [buttonState, setButtonState] = React.useState(false);

  const [nameOriginalState, setNameOriginalState] = React.useState(true);
  const [linkOriginalState, setLinkOriginalState] = React.useState(true);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  function handleChangeTitle(e) {
    setName(e.target.value);
    checkNameInputValidity(e.target);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    checkLinkInputValidity(e.target);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
    setNameInputValid(true);
    setLinkInputValid(true);
    setButtonState(false);
    setNameOriginalState(true);
    setLinkOriginalState(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      nameInputValid &&
      linkInputValid &&
      !nameOriginalState &&
      !linkOriginalState
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [nameInputValid, linkInputValid, nameOriginalState, linkOriginalState]);

  function checkNameInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      setNameOriginalState(false);
      setNameInputValid(false);
      setNameErrorMessage(inputElement.validationMessage);
    } else {
      setNameOriginalState(false);
      setNameInputValid(true);
    }
  }

  function checkLinkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      setLinkOriginalState(false);
      setLinkInputValid(false);
      setLinkErrorMessage(inputElement.validationMessage);
    } else {
      setLinkOriginalState(false);
      setLinkInputValid(true);
    }
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText={buttonText}
      onSubmit={handleAddPlaceSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonState={buttonState}
    >
      <div className="popup__area">
        <input
          className="popup__input popup__input_type_place"
          type="text"
          name="place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangeTitle}
          onClose={onClose}
          required
        />
        <span
          className={`popup__input-error ${
            !nameInputValid ? "popup__input-error_active" : ""
          }`}
        >
          {nameErrorMessage}
        </span>
      </div>
      <div className="popup__area">
        <input
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleChangeLink}
          onClose={onClose}
          required
        />
        <span
          className={`popup__input-error ${
            !linkInputValid ? "popup__input-error_active" : ""
          }`}
        >
          {linkErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
