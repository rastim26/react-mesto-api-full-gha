class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  _checkResponse = (res) => { 
    return res.ok ? res.json() : Promise.reject(`Ошибка api: ${res.status}`);
  }

  getCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  addNewCard = ({ name, link }) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link }),
    })
      .then(this._checkResponse)
  }

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  patchUserInfo = ({ name, about }) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about }),
    })
      .then(this._checkResponse)
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  likeCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  unlikeCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  uploadAvatar = (imageLink) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: imageLink,
      })
    })
      .then(this._checkResponse)
  }

}

export const api = new Api({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.rastimesto.nomoredomainsrocks.ru',
  // headers: {
  //   authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //   'Content-Type': 'application/json'
  // },
});