import { isEscapeKey } from './util.js';
import { initRadios, resetFilters } from './effects.js';
import { pristine } from './hashtags-pristine.js';
import { uploadData } from './fetch.js';
import { onSuccess, onError } from './messages.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.body;
const formUpload = body.querySelector('.img-upload__form');
const uploadOverlay = formUpload.querySelector('.img-upload__overlay');
const imagePreview = formUpload.querySelector('.img-upload__preview img');
const fileUpload = formUpload.querySelector('#upload-file');
const formUploadClose = formUpload.querySelector('#upload-cancel');
const minusButton = formUpload.querySelector('.scale__control--smaller');
const plusButton = formUpload.querySelector('.scale__control--bigger');
const scaleControlValue = formUpload.querySelector('.scale__control--value');
const mainPicture = formUpload.querySelector('.img-upload__preview img');
const imgUploadSubmitButton = formUpload.querySelector('.img-upload__submit');

const onFormUploadSubmit = (evt) => {
  evt.preventDefault();
  uploadData(onSuccess, onError, 'POST', new FormData(evt.target));
};

const openForm = () => {
  formUploadClose.addEventListener('click', onCloseFormClick);
  document.addEventListener('keydown', onCloseFormEscKeyDown);

  fileUpload.addEventListener('change', onFileUploadChange);
  scaleControlValue.value = '100%';
  formUpload.addEventListener('submit', onFormUploadSubmit);
};

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (Zoom.STEP * factor);

  if (size < Zoom.MIN) {
    size = Zoom.MIN;
  }

  if (size > Zoom.MAX) {
    size = Zoom.MAX;
  }

  scaleControlValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
};

const onMinusButtonClick = () => {
  changeZoom(-1);
};

const onPlusButtonClick = () => {
  changeZoom();
};

const removeEvents = () => {
  formUploadClose.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscKeyDown);
  formUpload.removeEventListener('submit', onFormUploadSubmit);

  minusButton.removeEventListener('click', onMinusButtonClick);
  plusButton.removeEventListener('click', onPlusButtonClick);

};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  removeEvents();

  formUploadClose.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscKeyDown);

  formUpload.reset();
  resetFilters();

  imgUploadSubmitButton.disabled = false;

  pristine.reset();

  scaleControlValue.value = '100%';
  imagePreview.style.transform = 'scale(100%)';
};

function onCloseFormClick (evt) {
  evt.preventDefault();
  closeForm();
}

function onCloseFormEscKeyDown (evt) {
  if (isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description') &&
    !body.querySelector('.error'))
  {
    evt.preventDefault();
    closeForm();
  }
}

const changeImages = () => {
  const file = fileUpload.files[0];
  const fileUrl = URL.createObjectURL(file);

  mainPicture.src = fileUrl;
};

const initButtons = () => {
  minusButton.addEventListener('click', onMinusButtonClick);
  plusButton.addEventListener('click', onPlusButtonClick);
};

function onFileUploadChange () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  openForm();
  changeImages();

  formUploadClose.addEventListener('click', onCloseFormClick);

  document.addEventListener('keydown', onCloseFormEscKeyDown);
  initButtons();
  initRadios();
}

export { openForm, closeForm };
