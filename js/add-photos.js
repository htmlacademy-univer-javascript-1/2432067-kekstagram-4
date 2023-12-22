const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const formUpload = document.querySelector('.img-upload__form');
const uploadFile = formUpload.querySelector('#upload-file');
const preview = formUpload.querySelector('.img-upload__preview img');
const effectsList = formUpload.querySelector('.effects__list');
const smallImages = effectsList.querySelectorAll('span');

const onUploadImageChange = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      smallImages.forEach((evt) => { evt.style.backgroundImage = `url(${reader.result})`;});
    });

    reader.readAsDataURL(file);
  }
};

uploadFile.addEventListener('change', onUploadImageChange);
