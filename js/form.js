import { isEscapeKey } from './util.js';
import { initRadios, resetFilters } from './effects.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
};

const body = document.body;
const formUpload = body.querySelector('.img-upload__form');
const overlay = body.querySelector('.img-upload__overlay');
const fileUpload = body.querySelector('#upload-file');
const formUploadClose = body.querySelector('#upload-cancel');
const minusButton = body.querySelector('.scale__control--smaller');
const plusButton = body.querySelector('.scale__control--bigger');
const scaleControlValue = body.querySelector('.scale__control--value');
const imagePreview = body.querySelector('.img-upload__preview img');
const mainPicture = document.querySelector('.img-upload__preview img');

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  formUploadClose.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscKeyDown);

  formUpload.reset();
  resetFilters();
};

function onCloseFormClick (evt) {
  evt.preventDefault();
  closeForm();
}

function onCloseFormEscKeyDown (evt) {
  if (isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description'))
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

const onFileUploadChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  changeImages();

  formUploadClose.addEventListener('click', onCloseFormClick);

  document.addEventListener('keydown', onCloseFormEscKeyDown);

  initRadios();
};

fileUpload.addEventListener('change', onFileUploadChange);

formUploadClose.addEventListener('click', () => {
  closeForm();
});

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (Zoom.MIN * factor);

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

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

export {closeForm, formUpload};
