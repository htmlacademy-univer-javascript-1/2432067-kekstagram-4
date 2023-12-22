import { renderPhotos } from './pictures.js';
import './pictures.js';
import { openForm } from './form.js';
import './hashtags-pristine.js';
import './effects.js';
import { loadData } from './fetch.js';
import './filters.js';
import './add-photos.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '20px';
  messageAlert.style.backgroundColor = '#e1375f';
  messageAlert.style.padding = '15px';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фотографий';
  document.body.append(messageAlert);
};

loadData(onSuccess, onError);
openForm();

export { photos };
