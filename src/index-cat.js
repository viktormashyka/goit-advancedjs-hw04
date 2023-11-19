import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const textLoader = document.querySelector('.loader');
const textError = document.querySelector('.error');
const containerInfo = document.querySelector('.cat-info');

selectEl.addEventListener('change', handleOption);

async function getBreeds() {
  try {
    selectEl.classList.add('hidden');
    textLoader.classList.remove('hidden');
    const result = await fetchBreeds();
    console.log('getBreeds: ', result);
    if (result) {
      selectEl.classList.remove('hidden');
    }
    return result;
  } catch (error) {
    console.log(error);
    textError.classList.remove('hidden');
  } finally {
    textLoader.classList.add('hidden');
  }
}

getBreeds()
  .then(data => {
    return data
      .map(cat => {
        const markup = `<option value=${cat.id} key=${cat.id}>${cat.name}</option>`;
        selectEl.insertAdjacentHTML('beforeend', markup);
      })
      .join('');
  })
  .catch(error => {
    console.log(error);
    textError.classList.remove('hidden');
  });

async function getCatByBreed(breedId) {
  try {
    selectEl.classList.add('hidden');
    containerInfo.classList.add('hidden');
    textError.classList.add('hidden');
    textLoader.classList.remove('hidden');
    const result = await fetchCatByBreed(breedId);
    if (result) {
      selectEl.classList.remove('hidden');
      containerInfo.classList.remove('hidden');
    }
    return result;
  } catch (error) {
    console.log(error);
    textError.classList.remove('hidden');
  } finally {
    textLoader.classList.add('hidden');
  }
}

function handleOption(evt) {
  evt.preventDefault();
  const breedId = evt.target.value;
  getCatByBreed(breedId)
    .then(cat => {
      containerInfo.innerHTML = '';
      console.log('Cat by breed: ', cat[0]);
      const markup = `<div style="display: flex; flex-direction: row">
        <div
          style="
            margin-top: 30px;
            margin-right: 30px;
            width: 350px;
            background-color: grey;
            border-radius: 4px 4px 4px 4px;
            box-shadow: 0px 2px 1px 0px rgba(46, 47, 66, 0.08),
              0px 1px 1px 0px rgba(46, 47, 66, 0.16),
              0px 1px 6px 0px rgba(46, 47, 66, 0.08);
              overflow: hidden;
          "
        >
          <img
            src=${cat[0].url}
            alt=${cat[0].breeds[0].name}
            style="
              display: block;
              width: 100%;
            "
          />
        </div>
        <div style="display: block; margin-top: 30px">
          <h1 style="font-size: x-large; font-weight: 700; margin-bottom: 16px">
            ${cat[0].breeds[0].name}
          </h1>
          <p style="margin-bottom: 12px">${cat[0].breeds[0].description}</p>
          <p>
            <span style="font-weight: 700; padding-right: 8px">Temperament:</span>${cat[0]?.breeds[0]?.temperament}
          </p>
        </div>
      </div>`;
      if (cat) {
        containerInfo.classList.remove('hidden');
      }
      containerInfo.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
      textError.classList.remove('hidden');
    });
}
