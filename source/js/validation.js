const form = document.getElementById("form");
const textarea = document.getElementById("topic-text");
const topicTextInput = document.getElementById("topic-heading");
const buttonSubmit = document.querySelector(".form__button");

const eventListenerForDocumentClick = (event, message) => {
  message.remove();
  document.removeEventListener(event, eventListenerForDocumentClick);
};

const validateLength = (min, max) => {
  return function (value) {
    return value.length >= min && value.length <= max;
  }
}

const validateLengthForTextArea = validateLength(30, 200);
const validateLengthForTopicInput = validateLength(6, 30);

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__pristine-error'
});

pristine.addValidator (
  textarea,
  validateLengthForTextArea,
  'Введенное значение должно быть от 30 до 200 символов'
);

pristine.addValidator (
  topicTextInput,
  validateLengthForTopicInput,
  'Введенное значение должно быть от 6 до 30 символов'
);

form.addEventListener('submit', function (evt) {
   evt.preventDefault();
   const isValid = pristine.validate();

   if (isValid) {
    const formData = new FormData(evt.target);
    buttonSubmit.setAttribute('disabled', 'disabled');

    fetch(
      'http://localhost:3027/posts',
      {
        method: 'POST',
        body: formData,
        type: 'multipart/form-data',
      },
    )
    .then(() => {
      const successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
      const seccessMessage = successTemplate.cloneNode(true);
      document.body.append(seccessMessage);
      evt.target.reset();
      document.addEventListener('click', () => eventListenerForDocumentClick('click', seccessMessage));
      document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        seccessMessage.remove();
      }
    });
    })
    .catch(() => {
      console.log(response);
      buttonSubmit.removeAttribute('disabled');
      const errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      const errorMessage = errorTemplate.cloneNode(true);
      document.body.append(errorMessage);
      const errorButtonClose = errorMessage.querySelector('.error__button');
      errorButtonClose.addEventListener('click', () => eventListenerForDocumentClick('click', errorMessage));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          errorMessage.remove();
        }
      });
    });
   }
});
