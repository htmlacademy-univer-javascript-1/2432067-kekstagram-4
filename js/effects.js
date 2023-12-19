const DEFAULT_EFFECT_LEVEL = 100;
const RADIX = 10;
const EFFECTS_STEP = 0.01;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const uploadForm = document.querySelector('.img-upload__form');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const sliderUpload = uploadForm.querySelector('.img-upload__effect-level');
const currentSlider = uploadForm.querySelector('.effect-level__slider');
const filterRadios = uploadForm.querySelectorAll('.effects__item');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');

sliderElement.value = DEFAULT_EFFECT_LEVEL;
let currentEffect = document.querySelector('.effects__radio').value;

const filters = {
  none: () => {
    sliderUpload.classList.add('visually-hidden');
    return 'none';
  },

  sepia: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `sepia(${parseInt(currentSlider.value, RADIX) * EFFECTS_STEP})`;
  },

  chrome: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `grayscale(${parseInt(currentSlider.value, RADIX) * EFFECTS_STEP})`;
  },

  marvin: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `invert(${Math.floor(currentSlider.value)}%)`;
  },

  phobos: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `blur(${parseInt(currentSlider.value, RADIX) * EFFECTS_STEP * MAX_BLUR_VALUE}px)`;
  },

  heat: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `brightness(${(parseInt(currentSlider.value, RADIX) * EFFECTS_STEP) * MAX_BRIGHTNESS})`;
  },
};

const onNoUiSliderChange = () => {
  currentSlider.value = sliderElement.noUiSlider.get();
  imagePreview.style.filter = filters[currentEffect]();
};

const onRadioChange = (evt) =>{
  currentEffect = evt.currentTarget.querySelector('.effects__radio').value;
  imagePreview.style.filter = filters[currentEffect]();
  sliderElement.noUiSlider.set(Slider.MAX);
  currentSlider.value = Slider.MAX;
};

const resetFilters = () =>{
  filterRadios.forEach((filter) => {
    filter.removeEventListener('change', onRadioChange);
  });

  imagePreview.style.filter = 'none';
  sliderElement.noUiSlider.off('change', onNoUiSliderChange);
};

const initRadios = () =>{
  sliderElement.noUiSlider.on('change', onNoUiSliderChange);
  sliderUpload.classList.add('visually-hidden');
  filterRadios.forEach((filter) => {
    filter.addEventListener('change', onRadioChange);
  });
  imagePreview.style.filter = 'none';
};

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MIN,
  },

  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

export {initRadios,  resetFilters};
