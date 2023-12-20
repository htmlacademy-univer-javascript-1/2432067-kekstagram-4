import { renderPhotos } from './pictures.js';
import './form.js';
import './hashtags-pristine.js';
import './effects.js';
import './messages.js';
import { loadData } from './fetch.js';
import { showAlert } from './util.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
};

const onError = () => {
  showAlert();
};

loadData(onSuccess, onError);

export {photos};
