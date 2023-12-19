import { closeOnEscKeyDown } from './util.js';

const COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');

const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');
const socialFooterText = bigPicture.querySelector('.social__footer-text');

let shownCommentsCount = COMMENTS_COUNT;
let currentComments = [];

const createNewComment = (comment) => {
  const newComment = document.createElement('li');
  const imgComment = document.createElement('img');
  const textComment = document.createElement('p');

  newComment.classList.add('social__comment');
  imgComment.classList.add('social__picture');
  textComment.classList.add('social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.message;

  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);

  return newComment;
};

const renderComments = () => {
  socialComments.innerHTML = '';

  shownCommentsCount = (shownCommentsCount > currentComments.length) ? currentComments.length : shownCommentsCount;

  const commentsSelected = currentComments.slice(0, shownCommentsCount);

  if (currentComments.length <= COMMENTS_COUNT || shownCommentsCount > currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${shownCommentsCount} из ${currentComments.length} комментариев`;

  const commentFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    commentFragment.appendChild(createNewComment(comment));
  });

  socialComments.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  shownCommentsCount += COMMENTS_COUNT;
  renderComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  shownCommentsCount = COMMENTS_COUNT;
  currentComments = [];
  socialFooterText.value = '';
};

const onBigPictureEscKeyDown = (evt) => {
  closeOnEscKeyDown(evt, () => {
    closeBigPicture();

    document.removeEventListener('keydown', onBigPictureEscKeyDown);
    loadComments.removeEventListener('click', onLoadCommentsButtonClick);
  });
};


const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  pictureCloseButton.removeEventListener('click', onCloseBigPictureClick);
};


const showBigPicture = (picture) => {
  const {url, description, comments, likes} = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;

  currentComments = comments.slice();

  renderComments();

  loadComments.addEventListener('click', onLoadCommentsButtonClick);

  document.addEventListener('keydown', onBigPictureEscKeyDown);
  pictureCloseButton.addEventListener('click', onCloseBigPictureClick);
};

export {showBigPicture};
