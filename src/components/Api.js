export default class Api {
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(checkErrors);
  }

  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(checkErrors);
  }

  setUserInfo(data) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.ProfileName,
        about: data.ProfileProfession,
      })
    })
      .then(checkErrors)
  }

  setAvatar(data) {
    console.log(data)
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.AvatarLink
      })
    })
    .then(checkErrors)
  }

  addCard(data) {
    return fetch(`${this._link}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.CardName,
        link: data.CardLink
      })
    })
      .then(checkErrors);
  }

  deleteCard(data) {
    return fetch(`${this._link}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(checkErrors);
  }

  addLike(data) {
    return fetch(`${this._link}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(checkErrors);
  }

  deleteLike(data) {
    return fetch(`${this._link}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(checkErrors);
  }

  renderData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

const checkErrors = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}
