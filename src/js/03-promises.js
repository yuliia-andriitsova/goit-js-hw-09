import Notiflix from 'notiflix';

const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const btnSubmit = document.querySelector('.button');
const form = document.querySelector('.form');

console.log(step);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { amount, step, delay } = event.target.elements;
  let amountVal = Number(amount.value);
  let delayVal = Number(delay.value);
  let stepVal = Number(step.value);

  for (let index = 0; index < amountVal; index += 1) {
    createPromise(index + 1, delayVal)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })

      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayVal += stepVal;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
