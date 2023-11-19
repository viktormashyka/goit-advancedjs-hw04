import axios from 'axios';

const PIXABAY_API_KEY = '29782836-0cb6e5c5167e525a8102df66c';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['key'] = PIXABAY_API_KEY;
// let query = `yellow+flowers`;

// async function fetchPhotos() {
//   const url = `?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true
//   `;

//   const { data } = await axios.get(url);
//   return data;
// }

async function fetchPhotosByQuery(query) {
  const url = `?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true
  `;

  const { data } = await axios.get(url);
  return data;
}

export { fetchPhotosByQuery };
