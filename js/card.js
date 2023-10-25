'use strict';

(function () {
    let similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');
    let similarFeaturesTemplate = document.querySelector('template').content.querySelector('.feature');
    let similarPhotosTemplate = document.querySelector('template').content.querySelector('.photo');

    window.renderCard = function(card, num){
        let cardElement = similarCardTemplate.cloneNode(true);
        let fragmentFeatures = document.createDocumentFragment();
        let fragmentPhotos = document.createDocumentFragment();

        function renderFeatures(card, index) {
            let featureElement = similarFeaturesTemplate.cloneNode(true);
            featureElement.className = `feature feature--${card.offer.features[index]}`;

            return featureElement;
        };

        function renderPhotos(card, index) {
            let photoElement = similarPhotosTemplate.cloneNode(true);
            photoElement.querySelector('img').src = card.offer.photos[index];

            return photoElement;
        };
    
        cardElement.id = `pin__card${num}`;
        cardElement.querySelector(".popup__title").textContent = card.offer.title;
        cardElement.querySelector(".popup__address").textContent = card.offer.address;
        cardElement.querySelector(".popup__price").textContent = `${card.offer.price}₽/ночь`;
        cardElement.querySelector(".popup__type").textContent = card.offer.type;
        cardElement.querySelector(".popup__capacity").textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
        cardElement.querySelector(".popup__time").textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
        cardElement.querySelector(".popup__description").textContent = card.offer.description;
        cardElement.querySelector(".popup__features").removeChild(cardElement.querySelector('.feature'));
        cardElement.querySelector(".popup__pictures").removeChild(cardElement.querySelector('.photo'));

        if (card.offer.features === undefined) {
            cardElement.querySelector(".popup__features").classList.add('hidden');
        } 
        else {
            for (let i = 0; i < card.offer.features.length; i++) {
                fragmentFeatures.appendChild(renderFeatures(card, i));
            }

            cardElement.querySelector(".popup__features").appendChild(fragmentFeatures); 
        }

        if (card.offer.photos === undefined) {
            cardElement.querySelector(".popup__pictures").classList.add('hidden');
        }
        else {
            for (let i = 0; i < card.offer.photos.length; i++) {
                fragmentPhotos.appendChild(renderPhotos(card, i));
            }
            cardElement.querySelector(".popup__pictures").appendChild(fragmentPhotos);
        }

        cardElement.querySelector(".popup__avatar").src = card.author.avatar;
        cardElement.classList.add('hidden');
    
        return cardElement;
    };
})();