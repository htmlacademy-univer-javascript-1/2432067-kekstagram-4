import { isEscapeKey } from './util.js';
import { inputHashtag } from './hashtags-pristine.js';
import { initRadios, resetFilters } from './effects.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
};

const body = document.body;
const formUpload = body.querySelector('.img-upload__form');
const overlay = body.querySelector('.img-upload__overlay');
const imagePreview = body.querySelector('.img-upload__preview img');
const fileUpload = body.querySelector('#upload-file');
const formUploadClose = body.querySelector('#upload-cancel');
const minusButton = body.querySelector('.scale__control--smaller');
const plusButton = body.querySelector('.scale__control--bigger');
const scaleControlValue = body.querySelector('.scale__control--value');
const effects = document.querySelectorAll('.effects__preview');
const mainPicture = document.querySelector('.img-upload__preview img');

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (Zoom.MIN * factor);

  if (size < Zoom.MIN) {
    size = Zoom.MIN;
    return;
  }

  if (size > Zoom.MAX) {
    size = Zoom.MAX;
    return;
  }

  scaleControlValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
};

const initButtons = () => {
  const onMinusButtonClick = () => {
    changeZoom(-1);
  };

  const onPlusButtonClick = () => {
    changeZoom();
  };

  minusButton.addEventListener('click', onMinusButtonClick);
  plusButton.addEventListener('click', onPlusButtonClick);
};

const initForm = () => {
  formUploadClose.addEventListener('click', onCloseFormClick);
  document.addEventListener('keydown', onCloseFormEscKeyDown);

  fileUpload.addEventListener('change', onFileUploadChange);
  scaleControlValue.value = '100%';
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  formUploadClose.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscKeyDown);

  formUpload.reset();
  inputHashtag.reset();

  scaleControlValue.value = '100%';
  imagePreview.style.transform = 'scale(100%)';

  resetFilters();
};

function onCloseFormClick (evt) {
  evt.preventDefault();
  closeForm();
}

function onCloseFormEscKeyDown (evt) {
  if (isEscapeKey(evt) &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeForm();
  }
}

const changeImages = () => {
  const file = fileUpload.files[0];
  const fileUrl = URL.createObjectURL(file);

  mainPicture.src = fileUrl;

  effects.forEach((effect) => {
    effect.style.backgroundImage = `url('${fileUrl}')`;
  });
};

function onFileUploadChange () {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  initForm();
  changeImages();
  initButtons();
  initRadios();
}

export {initForm};
