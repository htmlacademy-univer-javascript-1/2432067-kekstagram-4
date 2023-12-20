const DELAY = 500;

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DELAY);
  };
};

const shuffleArray = (array) => {
  for (let indexOne = array.length - 1; indexOne > 0; indexOne--) {
    const indexTwo = Math.floor(Math.random() * (indexOne + 1));
    [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
  }
  return array;
};

const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const closeOnEscKeyDown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    cb();
  }
};

const showAlert = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фотографий';
  document.body.append(messageAlert);
};

export { closeOnEscKeyDown, debounce, shuffleArray, isEscapeKey, showAlert };
