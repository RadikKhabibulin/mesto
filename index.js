let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');
let nameInputField = document.querySelector('.form-profile__item_el_name');
let descriptionInputField = document.querySelector('.form-profile__item_el_description');


function toggleProfilePopup () {
    document.querySelector('.popup').classList.toggle('popup-opened');
}

function editProfile () {
    nameInputField.value = profileNameElement.innerText;
    descriptionInputField.value = profileDescriptionElement.innerText;
    toggleProfilePopup();
}

function saveProfileForm (e) {
    e.preventDefault();
    profileNameElement.innerText = nameInputField.value;
    profileDescriptionElement.innerText = descriptionInputField.value;
    toggleProfilePopup();
}

document.querySelector('.popup__close-button').addEventListener('click', toggleProfilePopup);
document.querySelector('.profile__edit-button').addEventListener('click', editProfile);
document.querySelector('.form-profile').addEventListener('submit', saveProfileForm);
