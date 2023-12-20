import { showBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPhoto = (picture) => {
  const {url, description, comments, likes} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  const onPictureElementClick = (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  };

  pictureElement.addEventListener('click', onPictureElementClick);

  fragment.append(pictureElement);
};

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    renderPhoto(photo);
  });

  pictures.appendChild(fragment);
};

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};

export { renderPhotos, removePictures };
