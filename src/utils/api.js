class Api {
  constructor({groupID, token, authUrl}) {
    this._groupID = groupID;
    this._token = token;
    this._authUrl = authUrl;
  }

  getUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token
      }
    })
      .then(this._showErrorMessage)
  }

  setUserInfo(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._showErrorMessage)
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token
      }
    })
      .then(this._showErrorMessage)
  }

  addCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this._showErrorMessage)
  }

  deleteCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/${card._id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
      .then(this._showErrorMessage)
  }

  setUserAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._showErrorMessage)
  }

  changeLikeCardStatus(card, likeCardStatus) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${card._id}`, {
      method: (likeCardStatus ? "PUT" : "DELETE"),
      headers: {
        authorization: this._token
      }
    })
      .then(this._showErrorMessage)
  }

  _showErrorMessage = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

const api = new Api({
  token: "23cb390e-6742-419b-8dec-601afe24420f",
  groupID: "cohort-22",
  authUrl: "https://auth.nomoreparties.co"
});

export default api;