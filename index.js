let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameField = document.querySelector('.form-profile__item_el_name');
let descriptionField = document.querySelector('.form-profile__item_el_description');


function toggleProfilePopup () {
    document.querySelector('.popup').classList.toggle('popup-opened');
}

function editProfile () {
    nameField.value = profileName.innerText;
    descriptionField.value = profileDescription.innerText;
    toggleProfilePopup();
}

function saveProfileForm (e) {
    e.preventDefault();
    profileName.innerText = nameField.value;
    profileDescription.innerText = descriptionField.value;
    toggleProfilePopup();
}

document.querySelector('.popup__close-button').addEventListener('click', toggleProfilePopup);
document.querySelector('.profile__edit-button').addEventListener('click', editProfile);
document.querySelector('.form-profile').addEventListener('submit', saveProfileForm);
