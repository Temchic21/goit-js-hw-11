import ImgApiService from './fetchImages'

const imgApiService = new ImgApiService();
const searchFormBtn = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

searchFormBtn.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitForm(evt) {
    evt.preventDefault();
    const inputQuery = evt.target.searchQuery.value;

    imgApiService.resetPage();
    galleryEl.innerHTML = '';
    hiddenLoadMoreBtn();
    evt.target.searchQuery.value = '';
    imgApiService.query = inputQuery;
    imgApiService.fetchSearchImg();
};

function onLoadMore() {
    hiddenLoadMoreBtn();
    imgApiService.fetchSearchImg();
};

function hiddenLoadMoreBtn() {
    loadMoreBtn.style.display = 'none';
};