const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const closeOnEscKeyDown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    cb();
  }
};

export {getRandomInteger, isEscapeKey, closeOnEscKeyDown};
