'use strict';

(function () {
    let similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

    function getRandomIntInclusive(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
    
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    };

    window.renderPins = function(pin){
        let pinElement = similarMapPinTemplate.cloneNode(true);
        // pinElement.querySelector('img').className = `pin__img pin__img${pin.atributes.nameOfClass}`;
        // pinElement.className = `map__pin map__pin${pin.atributes.nameOfClass}`;
        pinElement.style = `left: ${getRandomIntInclusive(23, 1177)}px; top: ${getRandomIntInclusive(130, 630)}px;`;
        pinElement.querySelector('img').src = pin.author.avatar;
        pinElement.querySelector('img').alt = pin.offer.title;
        pinElement.classList.add('hidden');
    
        return pinElement;
    };
})();