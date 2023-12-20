import { loadData } from './fetch.js';
import { renderPhotos } from './pictures.js';
import { initForm } from './form.js';
import './hashtags-pristine.js';
import './messages.js';
initForm();

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
};

const onError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фотографий';
  document.body.append(messageAlert);
};

loadData(onSuccess, onError);
