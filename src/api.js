import axios from 'axios';

const PIXABAY_API_KEY = '29782836-0cb6e5c5167e525a8102df66c';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchPhotosByQuery(query, page) {
  const url = `?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40
  `;

  const { data } = await axios.get(url);
  return data;
}

export { fetchPhotosByQuery };
