'use strict';

(function () {
    document.addEventListener('mouseup', function() {
        document.querySelector('.map').classList.remove('map--faded');
    });

    function successHandler(ads) {
        let fragmentPins = document.createDocumentFragment();
        // let fragmentCards = document.createDocumentFragment();
    
        for (var i = 0; i < ads.length; i++){
            fragmentPins.appendChild(window.renderPins(ads[i]));
        }
    
        similarPinsElement.appendChild(fragmentPins);
    
        // fragmentCards.appendChild(window.renderCard(ads[0]));
        // similarCardElement.insertBefore(fragmentCards, document.querySelector(".map__filters-container"));
    }
    
    function errorHandler(errorMessage){
        alert(errorMessage);
    };
    
    window.backend.download(successHandler, errorHandler);
})();
