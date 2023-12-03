const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


const isEscapeKay = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const closeOnEscKeyDown = (evt, cb) => {
  if (isEscapeKay(evt)) {
    cb();
  }
};

export {randomInteger, isEscapeKay, closeOnEscKeyDown};

