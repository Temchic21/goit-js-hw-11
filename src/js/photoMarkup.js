const galleryEl = document.querySelector('.gallery');

export default function cardMarkup(information) {
  const markup = information.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <a href="${webformatURL}">
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
    </a>
  <div class="info">
    <p class="info-item">
      <b>Likes<br> ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views<br> ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments<br> ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br> ${downloads}</br>
    </p>
  </div>
</div>`
  }).join('');

    galleryEl.insertAdjacentHTML('beforeend', markup);
};