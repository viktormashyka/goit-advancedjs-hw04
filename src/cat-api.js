import axios from 'axios';

const THE_CAT_API_KEY =
  'live_ZRgbBHJqgNMula4MM0iCWTzXUjzZl2DkCaQ88DwD6Vsb5qyd5uxrl2YpDd75X6oV';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = THE_CAT_API_KEY;

async function fetchBreeds() {
  const url = `breeds`;

  const { data } = await axios.get(url);
  return data;
}

async function fetchCatByBreed(breedId) {
  const url = `images/search?breed_ids=${breedId}`;

  const { data } = await axios.get(url);
  return data;
}

export { fetchBreeds, fetchCatByBreed };
