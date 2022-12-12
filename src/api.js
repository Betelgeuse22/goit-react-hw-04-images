import axios from 'axios';

const API_KEY = '30791377-a48f7d7a4f3867fd227b1c1aa';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
