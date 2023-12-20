const DEFAULT_EFFECT_LEVEL = 100;
const MIN_VALUE_EFFECT = 0;
const EFFECTS_STEP = 0.1;
const MAX_GRAYSCALE = 1;
const MAX_SEPIA = 1;
const MAX_BLUR = 3;
const MIN_BRIGHTNESS = 1;
const MAX_BRIGHTNESS = 3;

const Slider = {
  MIN: 10,
  MAX: 100,
  STEP: 10,
};

const uploadForm = document.querySelector('.img-upload__form');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const sliderUpload = uploadForm.querySelector('.img-upload__effect-level');
const currentSlider = uploadForm.querySelector('.effect-level__value');
const filterRadios = uploadForm.querySelectorAll('.effects__item');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');

let currentEffect = document.querySelector('.effects__radio').value;

currentSlider.value = DEFAULT_EFFECT_LEVEL;

const effects = {
  none: 0,
  chrome: {
    filter: 'grayscale',
    range: {min: MIN_VALUE_EFFECT, max: MAX_GRAYSCALE},
    step: EFFECTS_STEP,
    measurementUnit: ''},
  sepia: {
    filter: 'sepia',
    range: {min: MIN_VALUE_EFFECT, max: MAX_SEPIA},
    step: EFFECTS_STEP,
    measurementUnit: ''},
  marvin: {
    filter: 'invert',
    range: {min: MIN_VALUE_EFFECT, max: DEFAULT_EFFECT_LEVEL},
    step: 1,
    measurementUnit: '%'},
  phobos: {
    filter: 'blur',
    range: {min: MIN_VALUE_EFFECT, max: MAX_BLUR},
    step: EFFECTS_STEP,
    measurementUnit: 'px'},
  heat: {
    filter: 'brightness',
    range: {min: MIN_BRIGHTNESS, max: MAX_BRIGHTNESS},
    step: EFFECTS_STEP,
    measurementUnit: ''}
};

const applySliderValue = () => {
  if (currentEffect !== 'none') {
    const effect = effects[currentEffect];
    imagePreview.style.filter = `${effect.filter}(${sliderElement.noUiSlider.get()}${effect.measurementUnit})`;
    currentSlider.value = `${parseFloat(sliderElement.noUiSlider.get())}${effect.measurementUnit}`;
  } else {
    imagePreview.style.filter = '';
  }
};

const changeSlider = (newEffect) => {
  const effect = effects[newEffect];
  if(effect !== 0){
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.range.min,
        max: effect.range.max,
      },
      start: effect.range.max,
      step: effect.step
    });
    sliderUpload.classList.remove('visually-hidden');
    applySliderValue();
  }
  else{
    sliderUpload.classList.add('visually-hidden');
    imagePreview.style.filter = '';
  }
};

const onNoUiSliderChange = () => {
  applySliderValue();
};

const onRadioChange = (evt) =>{
  currentEffect = evt.currentTarget.querySelector('.effects__radio').value;
  changeSlider(currentEffect);
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
    max: Slider.MAX
  },

  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

export {initRadios,  resetFilters};
