import { showBigPicture } from './big-picture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (picture) => {
  const {url, description, likes, comments} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  const onPictureElementClick = (event) => {
    event.preventDefault();

    showBigPicture(picture);
  };

  pictureElement.addElement('click', onPictureElementClick);
  return pictureElement;
};

const fragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  pictures.appendChild(fragment);
};

export {renderPhotos};