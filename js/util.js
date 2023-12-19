const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomId = (min, max) => {
  const usedIdArray = [];

  return function () {
    let randomId = getRandomInteger(min, max);
    if (usedIdArray.length >= (max - min + 1)) {
      return null;
    }
    while (usedIdArray.includes(randomId)) {
      randomId = getRandomInteger(min, max);
    }
    usedIdArray.push(randomId);
    return randomId;
  };
};

const isEscapeKay = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const closeOnEscKeyDown = (evt, cb) => {
  if (isEscapeKay(evt)) {
    cb();
  }
};

export {getRandomInteger, createRandomId, isEscapeKay, closeOnEscKeyDown};
