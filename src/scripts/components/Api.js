export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getData(url) {
        return fetch(url, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(res.status);
        });
    }

    _sendData(url, method, data) {
        return fetch(url, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(res.status);
        });
    }

    getUserInfo() {
        return this._getData(`${this._baseUrl}/users/me`);
    }

    updateUserInfo(data) {
        return this._sendData(`${this._baseUrl}/users/me`, 'PATCH', data);
    }

    updateUserAvatar(data) {
        return fetch(data.avatar)
        .then(res => {
            if (res.ok) {
                return;
            }
            return Promise.reject(res.status);
        })
        .then(() => {
            return this._sendData(`${this._baseUrl}/users/me/avatar`, 'PATCH', data)
        })
        .catch(err => {
            return Promise.reject(`${err}. Ссылка на новый аватар недействительна`);
        })
    }

    getCards() {
        return this._getData(`${this._baseUrl}/cards`);
    }

    setLike(cardId) {
        return this._sendData(`${this._baseUrl}/cards/${cardId}/likes`, 'PUT', {});
    }

    deleteLike(cardId) {
        return this._sendData(`${this._baseUrl}/cards/${cardId}/likes`, 'DELETE', {});
    }

    createCard({ name, link }) {
        return this._sendData(`${this._baseUrl}/cards`, 'POST', { name, link });
    }

    deleteCard(cardId) {
        return this._sendData(`${this._baseUrl}/cards/${cardId}`, 'DELETE', {});
    }
}
