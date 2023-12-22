import { closeForm } from './form.js';
import { isEscapeKey } from './util.js';

const body = document.body;
const errorMessage = body.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.messages');

const onPopupClick = (evt) => {
  if (evt.target.classList.contains('success__inner') || evt.target.classList.contains('error__inner')) {
    return;
  }

  closePopup();
};

const onEscKeyDown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    closePopup();
  }
};

function closePopup () {
  body.removeEventListener('click', onPopupClick);
  document.removeEventListener('keydown', onEscKeyDown);
  body.removeChild(body.lastChild);
}

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);
  message.style.zIndex = 100;

  document.addEventListener('keydown', onEscKeyDown);
  body.addEventListener('click', onPopupClick);


  body.appendChild(message);
};

const onSuccess = () => {
  closeForm();
  showMessage(successMessage);
};

const onError = () => {
  showMessage(errorMessage);
};

export{ onSuccess, onError };
