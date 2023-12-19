import {getRandomInteger, createRandomId} from './util.js';
const DESCRIPTIONS = [
  'Классная фотка',
  'Я здесь был',
  'Хочу сюда вернуться',
  'Классный вид',
  'Зацените',
  'С кайфом'
];

const NAMES = [
  'Алан',
  'Синклер',
  'Джимми',
  'Ханс Грубер',
  'Северус',
  'Метатрон'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COUNT_PHOTOS = 25;
const COUNT_COMMENTS = 30;

const Likes = {
  MIN: 15,
  MAX: 200
};

const Avatar = {
  MIN: 1,
  MAX: 6
};

const generateCommentId = createRandomId(1, COUNT_COMMENTS);

const addComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(Avatar.MIN, Avatar.MAX)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const addComments = () => Array.from({length: getRandomInteger(0, COUNT_COMMENTS)}, addComment);

const generatePhotoId = createRandomId(1, COUNT_PHOTOS);
const generatePhotoUrl = createRandomId(1, COUNT_PHOTOS);

const addPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: addComments()
});

const photos = Array.from({length: COUNT_PHOTOS}, addPhoto);

export {photos};
