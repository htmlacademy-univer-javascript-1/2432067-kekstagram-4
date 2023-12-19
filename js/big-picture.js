import { closeOnEscKeyDown } from './util.js';

const COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');

const commentTemplate = document.querySelector('#comments').content.querySelector('li');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');

let commentsCountShown = COMMENTS_COUNT;
let currentComments = [];

const createNewComment = (comment) => {
  const {avatar, name, message} = comment;
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  socialComments.innerHTML = '';

  commentsCountShown = (commentsCountShown > currentComments.length) ? currentComments.length : commentsCountShown;

  const commentsSelected = currentComments.slice(0, commentsCountShown);

  if (currentComments.length <= COMMENTS_COUNT || commentsCountShown > currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${commentsCountShown} из ${commentsCount.textContent} комментариев`;

  const commentFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    commentFragment.append(createNewComment(comment));
  });

  socialComments.append(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsCountShown += COMMENTS_COUNT;
  renderComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  commentsCountShown = COMMENTS_COUNT;
  currentComments = [];
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
  const {url, likes, comments, description } = picture;

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
