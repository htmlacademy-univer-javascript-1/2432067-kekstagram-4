import './form.js';
import './hashtags-pristine.js';
import './effects.js';
import './messages.js';
import './filters.js';
import { renderPhotos } from './pictures.js';
import { loadData } from './fetch.js';
import { showAlert } from './util.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onError = () => {
  showAlert();
};

loadData(onSuccess, onError);

export { photos };
