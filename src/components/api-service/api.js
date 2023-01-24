import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31702258-55b0df7955188e2c1c841f235';

export const fetchImages = async (keyword, page) => {
  const response = await axios.get(
    `?q=${keyword}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
