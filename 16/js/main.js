import { renderPhotos } from './pictures.js';
import './form.js';
import './hashtags-pristine.js';
import './effects.js';
import { loadData } from './fetch.js';
import { showAlert } from './util.js';
import './messages.js';
import './filters.js';
import './own-photos.js';

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
