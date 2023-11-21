import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPhotosByQuery } from './api';

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

const searchFormEl = document.querySelector('form#search-form');
const galleryEl = document.querySelector('.gallery');
const textLoader = document.querySelector('.loader');
const textError = document.querySelector('.error');
const loadMoreButton = document.querySelector('.load-more');

var lightbox;

let query = '';
let page = 1;
let differenceFromTotalAmount = 0;

searchFormEl.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click' || 'keydown', handleButtonLoadMore);

async function getPhotoByQuery(query, page) {
  try {
    const result = await fetchPhotosByQuery(query, page);
    return result;
  } catch (error) {
    console.log(error);
    textError.classList.remove('hidden');
  } finally {
    textLoader.classList.add('hidden');
  }
}

async function handleSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const query = form.elements.searchQuery.value;

  if (query === '') {
    iziToast.info({
      theme: 'green',
      position: 'topRight',
      message: `Input field couldn't be empty. Please, enter search name.`,
    });
    return;
  }
  loadMoreButton.classList.add('hidden');
  textError.classList.add('hidden');
  textLoader.classList.remove('hidden');

  galleryEl.innerHTML = '';
  page = 1;

  getPhotoByQuery(query, page)
    .then(photosData => {
      const { hits, totalHits } = photosData;

      differenceFromTotalAmount = totalHits - hits.length;

      if (hits.length < 1) {
        iziToast.error({
          theme: 'red',
          position: 'topRight',
          message: `Sorry, there are no images matching your search query. Please try again.`,
        });
        return;
      }

      if (differenceFromTotalAmount > 0) {
        loadMoreButton.classList.remove('hidden');
      }

      iziToast.success({
        theme: 'green',
        position: 'topRight',
        message: `Hooray! We found ${totalHits} images.`,
      });

      photosData.hits
        .map(photo => {
          const markup = createMarkup(photo);
          galleryEl.insertAdjacentHTML('beforeend', markup);
        })
        .join('');

      lightbox = new SimpleLightbox('.gallery a', {
        /* options */
        captions: true,
        captionPosition: 'bottom',
        captionDelay: 250,
      });
      searchFormEl.reset();
    })
    .catch(error => {
      console.log(error);
      textError.classList.remove('hidden');
    });
}

function handleButtonLoadMore(evt) {
  evt.preventDefault();
  textError.classList.add('hidden');
  textLoader.classList.remove('hidden');
  page += 1;

  getPhotoByQuery(query, page)
    .then(photosData => {
      const { hits } = photosData;

      differenceFromTotalAmount -= hits.length;

      if (differenceFromTotalAmount <= 0) {
        iziToast.info({
          theme: 'green',
          position: 'topRight',
          message: `We're sorry, but you've reached the end of search results.`,
        });
        loadMoreButton.classList.add('hidden');
      }

      photosData.hits
        .map(photo => {
          const markup = createMarkup(photo);
          galleryEl.insertAdjacentHTML('beforeend', markup);
        })
        .join('');

      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
      textError.classList.remove('hidden');
    });
}

function createMarkup(photo) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = photo;
  const markup = `
      <div class="photo-card">
        <a class="photo-link" href="${largeImageURL}">
          <div class="photo-content-wrapper">
            <div photo-image-wrapper>
              <img
                class="photo-image"
                src="${webformatURL}"
                alt="${tags}"
                title="${tags}"
                loading="lazy"
              />
            </div>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <br />
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                <br />
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                <br />
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <br />
                ${downloads}
              </p>
            </div>
          </div>
        </a>
      </div>
`;

  return markup;
}
