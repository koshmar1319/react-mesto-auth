import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import AffirmDeletePopup from "./AffirmDeletePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isAffirmDeletePopupOpen, setAffirmDeletePopupOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState({});

  const [loadTextEditProfilePopup, setLoadTextEditProfilePopup] = React.useState("Сохранить");
  const [loadTextEditAvatarPopup, setLoadTextEditAvatarPopup] = React.useState("Сохранить");
  const [loadTextAddPlacePopup, setLoadTextAddPlacePopup] = React.useState("Создать");
  const [loadTextAffirmDeletePopup, setLoadTextAffirmDeletePopup] = React.useState("Да");

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setLoadTextEditProfilePopup("Сохранить");
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    setLoadTextAddPlacePopup("Создать");
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    setLoadTextEditAvatarPopup("Сохранить");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setLoadTextAffirmDeletePopup("Удаление . . .");
    api
      .deleteCard(card)
      .then(() => {
        setCards(cards.filter((i) => i._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function affirmCardDelete(card) {
    setLoadTextAffirmDeletePopup("Да");
    setCardToDelete(card);
    setAffirmDeletePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setLoadTextEditProfilePopup("Сохранение . . .");
    api
      .setUserInfo(data)
      .then((newCard) => {
        setCurrentUser({
          ...currentUser,
          name: newCard.name,
          about: newCard.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setLoadTextEditAvatarPopup("Сохранение . . .");
    api
      .setUserAvatar(avatar)
      .then((updateUser) => {
        setCurrentUser({ ...currentUser, avatar: updateUser.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard(card) {
    setLoadTextAddPlacePopup("Создание . . .");
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAffirmDeletePopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  React.useEffect(() => {
    function closeOutsidePopup(evt) {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        closeAllPopups();
      }
    }
    document.addEventListener("click", closeOutsidePopup);
    return () => document.removeEventListener("click", closeOutsidePopup);
  }, []);

  return (
    <div className="container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={affirmCardDelete}
        ></Main>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={loadTextEditProfilePopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          buttonText={loadTextAddPlacePopup}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={loadTextEditAvatarPopup}
        />

        <AffirmDeletePopup
          isOpen={isAffirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          card={cardToDelete}
          buttonText={loadTextAffirmDeletePopup}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
