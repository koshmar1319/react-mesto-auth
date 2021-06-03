import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const [name, setName] = React.useState("Name");
  const [description, setDescription] = React.useState("About");

  const [nameInputValid, setNameInputValid] = React.useState(true);
  const [aboutInputValid, setAboutInputValid] = React.useState(true);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [aboutErrorMessage, setAboutErrorMessage] = React.useState("");
  const [buttonState, setButtonState] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
    setNameInputValid(true);
    setAboutInputValid(true);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    checkNameInputValidity(e.target);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
    checkAboutInputValidity(e.target);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function checkNameInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      setNameInputValid(false);
      setNameErrorMessage(inputElement.validationMessage);
    } else {
      setNameInputValid(true);
    }
  }

  function checkAboutInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      setAboutInputValid(false);
      setAboutErrorMessage(inputElement.validationMessage);
    } else {
      setAboutInputValid(true);
    }
  }

  React.useEffect(() => {
    if (nameInputValid && aboutInputValid) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [nameInputValid, aboutInputValid]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <div className="popup__area">
        <input
          className={`popup__input popup__input_type_name`}
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
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
          className="popup__input popup__input_type_job"
          type="text"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeAbout}
          required
        />
        <span
          className={`popup__input-error ${
            !aboutInputValid ? "popup__input-error_active" : ""
          }`}
        >
          {aboutErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
