export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._id = null;
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._descriptionElement.textContent,
            id: this._id
        }
    }

    setUserInfo(name, description, id) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = description;
        this._id = id;
    }

    setUserAvatar(avatar) {
        this._avatarElement.style.backgroundImage = `url(${avatar})`;
    }
}
