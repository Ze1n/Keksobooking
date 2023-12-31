'use strict';

(function () {
    const MAIN_PIN_WIDTH = 65;
    const MAIN_PIN_IMG_HEIGHT = 62;
    const MAIN_PIN_AFTER = 22;
    const MAIN_PIN_HEIGHT = MAIN_PIN_IMG_HEIGHT + MAIN_PIN_AFTER;
    const MAIN_PIN_START_X = 600;
    const MAIN_PIN_START_Y = 375;
    const BORDER_X_LEFT = 32;
    const BORDER_X_RIGHT = 1168;
    const BORDER_Y_TOP = 130;
    const BORDER_Y_BOTTOM = 630;


    let similarPinsElement = document.querySelector(".map__pins");
    let similarCardElement = document.querySelector(".map");
    let mapPinMain = document.querySelector(".map__pin--main");
    let mapPinMainHandler = document.querySelector('.map__pin--main img');

    let typeFilter = document.querySelector('#housing-type');
    let priceFilter = document.querySelector('#housing-price');
    let roomsFilter = document.querySelector('#housing-rooms');
    let guestsFilter = document.querySelector('#housing-guests');

    let wifiFilter = document.querySelector('#filter-wifi');
    let dishwasherFilter = document.querySelector('#filter-dishwasher');
    let parkingFilter = document.querySelector('#filter-parking');
    let washerFilter = document.querySelector('#filter-washer');
    let elevatorFilter = document.querySelector('#filter-elevator');
    let conditionerFiler = document.querySelector('#filter-conditioner');

    let adsData = [];

    function onPinClickPress(evt){
        let cards = similarCardElement.querySelectorAll('article');

        function onButtonCloseClick(){
            let closeButtons = similarCardElement.querySelectorAll('.popup__close');

            cards.forEach(element => {
                element.classList.add('hidden');
            });

            closeButtons.forEach(element => {
                element.removeEventListener('click', onButtonCloseClick);
            });
        };

        for (let i = 0; i < adsData.length; i++){
            if (evt.target.id === `pin__img${i}`){
                cards.forEach(element => {
                    element.classList.add('hidden');
                });

                let buttonPopupClose = similarCardElement.querySelector(`#pin__card${i}`);
                buttonPopupClose.addEventListener('click', onButtonCloseClick);
                similarCardElement.querySelector(`#pin__card${i}`).classList.remove('hidden');
            } 
        }
    };

    mapPinMainHandler.addEventListener('mousedown', function(evt){
        evt.preventDefault();

        let startChords = {
            x: evt.clientX,
            y: evt.clientY
        };

        function onMouseMove(moveEvt){
            moveEvt.preventDefault();

            let shift = {
                x: startChords.x - moveEvt.clientX,
                y: startChords.y - moveEvt.clientY
            };

            startChords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            if (mapPinMain.offsetLeft - shift.x < BORDER_X_LEFT){
                mapPinMain.style.left = BORDER_X_LEFT + 'px';
            }
            else if (mapPinMain.offsetLeft - shift.x > BORDER_X_RIGHT){
                mapPinMain.style.left = BORDER_X_RIGHT + 'px';
            }
            else {
                mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
            }

            if (mapPinMain.offsetTop - shift.y < BORDER_Y_TOP){
                mapPinMain.style.top = BORDER_Y_TOP + 'px';
            }
            else if (mapPinMain.offsetTop - shift.y > BORDER_Y_BOTTOM){
                mapPinMain.style.top = BORDER_Y_BOTTOM + 'px';
            }
            else {
                mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
            }
            
            window.form.adressInput.value = `${mapPinMain.offsetLeft - shift.x}, ${mapPinMain.offsetTop - shift.y + (MAIN_PIN_IMG_HEIGHT / 2 + MAIN_PIN_AFTER)}`;
        };

        function onMouseUp(upEvt){
            upEvt.preventDefault();

            let pins = document.querySelectorAll('.map__pin');

            document.querySelector('.map').classList.remove('map--faded');
            document.querySelector('.notice__form').classList.remove('notice__form--disabled');

            pins.forEach(element => {
                element.classList.remove('hidden');
            });

            window.form.makeDisable(false);

            let shift = {
                x: startChords.x - upEvt.clientX,
                y: startChords.y - upEvt.clientY
            };

            window.form.adressInput.value = `${mapPinMain.offsetLeft - shift.x}, ${mapPinMain.offsetTop - shift.y + (MAIN_PIN_IMG_HEIGHT / 2 + MAIN_PIN_AFTER)}`;

            similarPinsElement.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

        };

        similarPinsElement.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });

    function render(ads){
        let fragmentPins = document.createDocumentFragment();
        let fragmentCards = document.createDocumentFragment();

        for (let i = 0; i < ads.length; i++){
            fragmentPins.appendChild(window.renderPins(ads[i], i));
        }

        similarPinsElement.appendChild(fragmentPins);

        for (let i = 0; i < ads.length; i++){
            fragmentCards.appendChild(window.renderCard(ads[i], i));
        }

        similarCardElement.insertBefore(fragmentCards, document.querySelector(".map__filters-container"));
    };

    function updateAds(){
        let adsDataCopy = [];
        let subtotal = adsData.slice();
        
        function filterPins(element){
            adsDataCopy = subtotal.filter(function(it){
                if (element.checked && it.offer.features !== undefined) {
                    return it.offer.features.includes(element.value);
                }
                if (element.checked === false) {
                    return true;
                }
            });
    
            subtotal = adsDataCopy;
        };

        adsDataCopy = subtotal.filter(function(it){
            if (typeFilter.value === 'any') {
                return true;
            }

            return it.offer.type === typeFilter.value;
        });

        subtotal = adsDataCopy;

        adsDataCopy = subtotal.filter(function(it){
            if (priceFilter.value === 'any') {
                return true;
            }
            if (priceFilter.value === 'middle') {
                return (it.offer.price >= 10000 && it.offer.price <= 50000); 
            }
            if (priceFilter.value === 'low') {
                return it.offer.price < 10000;
            }
            
            return it.offer.price > 50000;
        });

        subtotal = adsDataCopy;

        adsDataCopy = subtotal.filter(function(it){
            if (roomsFilter.value === 'any') {
                return true;
            }

            return it.offer.rooms === +roomsFilter.value;
        });

        subtotal = adsDataCopy;

        adsDataCopy = subtotal.filter(function(it){
            if (guestsFilter.value === 'any') {
                return true;
            }

            return it.offer.guests === +guestsFilter.value;
        });

        subtotal = adsDataCopy;

        filterPins(wifiFilter);
        filterPins(dishwasherFilter);
        filterPins(parkingFilter);
        filterPins(washerFilter);
        filterPins(elevatorFilter);
        filterPins(conditionerFiler);

        let pins = similarPinsElement.querySelectorAll('.map__pin');
        let cards = similarCardElement.querySelectorAll('.map__card');

        for (let i = 0; i < pins.length; i++) {

            if (pins[i].className === 'map__pin map__pin--main') {
                continue;
            }

            similarPinsElement.removeChild(pins[i]);
        }

        cards.forEach(function(it) {
            similarCardElement.removeChild(it);
        });

        render(adsDataCopy);

        pins = similarPinsElement.querySelectorAll('.map__pin');

        pins.forEach(element => {
            element.classList.remove('hidden');
        });
    };

    function successHandler(ads) {
        adsData = ads;

        render(adsData);
    };

    function errorHandler(errorMessage){
        alert(errorMessage);
    };

    typeFilter.addEventListener('change', updateAds);
    priceFilter.addEventListener('change', updateAds);
    roomsFilter.addEventListener('change', updateAds);
    guestsFilter.addEventListener('change', updateAds);
    wifiFilter.addEventListener('change', updateAds);
    dishwasherFilter.addEventListener('change', updateAds);
    parkingFilter.addEventListener('change', updateAds);
    washerFilter.addEventListener('change', updateAds);
    elevatorFilter.addEventListener('change', updateAds);
    conditionerFiler.addEventListener('change', updateAds);
    
    similarPinsElement.addEventListener('click', onPinClickPress);
    window.backend.download(successHandler, errorHandler);
})();
