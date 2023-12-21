import { isEscapeKey } from './util.js';
import { initRadios, resetFilters } from './effects.js';
import { pristine } from './hashtag-pristine.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
};

const body = document.body;
const formUpload = body.querySelector('.img-upload__form');
const overlay = formUpload.querySelector('.img-upload__overlay');
const imagePreview = formUpload.querySelector('.img-upload__preview img');
const fileUpload = formUpload.querySelector('#upload-file');
const formUploadClose = formUpload.querySelector('#upload-cancel');
const minusButton = formUpload.querySelector('.scale__control--smaller');
const plusButton = formUpload.querySelector('.scale__control--bigger');
const scaleControlValue = formUpload.querySelector('.scale__control--value');
const mainPicture = formUpload.querySelector('.img-upload__preview img');
const imgUploadSubmitButton = formUpload.querySelector('.img-upload__submit');

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  formUploadClose.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscKeyDown);

  formUpload.reset();
  resetFilters();

  imgUploadSubmitButton.disabled = false;

  pristine.reset();

  scaleControlValue.value = '100%';
  imagePreview.style.transform = 'scale(1)';
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
