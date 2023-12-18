function fetchGallery(page, search) {
  const KEY_API = '40401153-d6fc01439f26ff2abc7a0d7c3';

  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('Error'));
  });
}
const api = {
  fetchGallery,
};
export default api;
