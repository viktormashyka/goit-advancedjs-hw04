import { fetchPhotosByQuery } from './api';

const searchFormEl = document.querySelector('form#search-form');
const galleryEl = document.querySelector('.gallery');
const textLoader = document.querySelector('.loader');
const textError = document.querySelector('.error');

searchFormEl.addEventListener('submit', handleSubmit);

async function getPhotoByQuery(query) {
  try {
    galleryEl.classList.add('hidden');
    // containerInfo.classList.add('hidden');
    textError.classList.add('hidden');
    textLoader.classList.remove('hidden');
    const result = await fetchPhotosByQuery(query);
    if (result) {
      galleryEl.classList.remove('hidden');
      //   containerInfo.classList.remove('hidden');
    }
    return result;
  } catch (error) {
    console.log(error);
    textError.classList.remove('hidden');
  } finally {
    textLoader.classList.add('hidden');
  }
}

function handleSubmit(evt) {
  evt.preventDefault();
  const query = evt.target[0]?.value;
  console.log('query: ', query);
  getPhotoByQuery(query)
    .then(photosData => {
      //   containerInfo.innerHTML = '';
      console.log('photosData by query: ', photosData);

      const { hits, total, totalHits } = photosData;

      photosData.hits.map(photo => {
        const markup = `<div class="photo-card">
    <img src=${photo.webformatURL} alt=${photo.tags} loading="lazy" style={{
        display: block,
        width: 350px, 
        hight: 'auto'}}/>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <p>${photo.likes}</p>
        </p>
            <p class="info-item">
        <b>Views</b>
        <p>${photo.views}</p>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <p>${photo.comments}</p>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <p>${photo.downloads}</p>
        </p>
    </div>
</div>`;
        if (photo) {
          galleryEl.classList.remove('hidden');
        }
        galleryEl.insertAdjacentHTML('afterend', markup);
      });

      //   const markup = `<div style="display: flex; flex-direction: row">
      //     <div
      //       style="
      //         margin-top: 30px;
      //         margin-right: 30px;
      //         width: 350px;
      //         background-color: grey;
      //         border-radius: 4px 4px 4px 4px;
      //         box-shadow: 0px 2px 1px 0px rgba(46, 47, 66, 0.08),
      //           0px 1px 1px 0px rgba(46, 47, 66, 0.16),
      //           0px 1px 6px 0px rgba(46, 47, 66, 0.08);
      //           overflow: hidden;
      //       "
      //     >
      //       <img
      //         src=${cat[0].url}
      //         alt=${cat[0].breeds[0].name}
      //         style="
      //           display: block;
      //           width: 100%;
      //         "
      //       />
      //     </div>
      //     <div style="display: block; margin-top: 30px">
      //       <h1 style="font-size: x-large; font-weight: 700; margin-bottom: 16px">
      //         ${cat[0].breeds[0].name}
      //       </h1>
      //       <p style="margin-bottom: 12px">${cat[0].breeds[0].description}</p>
      //       <p>
      //         <span style="font-weight: 700; padding-right: 8px">Temperament:</span>${cat[0]?.breeds[0]?.temperament}
      //       </p>
      //     </div>
      //   </div>`;
      //   if (cat) {
      //     containerInfo.classList.remove('hidden');
      //   }
      //   containerInfo.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
      //   textError.classList.remove('hidden');
    });
}
