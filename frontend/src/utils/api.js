const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", { headers: this._headers,  credentials: "include", }).then(
      handleOriginalResponse
    );
  }

  getMyInfo() {
    return fetch(this._baseUrl + "/users/me", { headers: this._headers,  credentials: "include", }).then(
      handleOriginalResponse
    );
  }

  createNewCard(newCardData) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(newCardData),
    }).then(handleOriginalResponse);
  }

  changeUserInfo(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(handleOriginalResponse);
  }

  changeUserAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then(handleOriginalResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  setLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  changeLikeCardStatus(id, isLike) {
  return  isLike ? this.setLike(id) : this.deleteLike(id);
  }
}

const api = new Api({
  baseUrl: "https://api.karina.mesto.students.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
