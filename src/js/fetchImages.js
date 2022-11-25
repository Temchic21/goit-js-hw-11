import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import cardMarkup from './photoMarkup';

const loadMoreBtn = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const BASE_KEY = '31516464-506a5db8f79f2d025afbf63fb';

export default class imgApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.gallery = new SimpleLightbox('.gallery a', {});
    };

    
    async fetchSearchImg() {
        try {
            const options = {
            key: BASE_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: 40,
        };

        const response = await axios.get(BASE_URL, {
            params: options,
        });
            const totalHits = response.data.totalHits;
            if (totalHits === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            };
            showLoadMoreBtn();
            if (totalHits <= 40) {
                hiddenLoadMoreBtn();
            };

            cardMarkup(response.data);
            this.gallery.refresh();

            if (response.data.hits < 40) {
                hiddenLoadMoreBtn();
                endSearchResults();
            };

            if (this.page <= 1) {
                Notify.success(`Hooray! We found ${totalHits} images.`);
            };

        this.incrementPage();
        return response;
        } catch (error) {
            console.error(error);
        };
    };


    set query(newQuery) {
        this.searchQuery = newQuery;
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
};

function hiddenLoadMoreBtn() {
    loadMoreBtn.style.display = 'none';
};

function showLoadMoreBtn() {
    loadMoreBtn.style.display = 'block';
};

function endSearchResults() {
    Notify.failure("We're sorry, but you've reached the end of search results.");
}