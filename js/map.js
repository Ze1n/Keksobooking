'use strict';

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_IMG_HEIGHT = 62;
const MAIN_PIN_AFTER = 22;
const MAIN_PIN_HEIGHT = MAIN_PIN_IMG_HEIGHT + MAIN_PIN_AFTER;
const MAIN_PIN_START_X = 600;
const MAIN_PIN_START_Y = 375;
let similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
let similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');
let similarFeatures = document.querySelector('template').content.querySelector('.popup__features');
let fragment = document.createDocumentFragment();
let fragment2 = document.createDocumentFragment();
let fragment3 = document.createDocumentFragment();
let similarPinsElement = document.querySelector(".map__pins");
let similarCardElement = document.querySelector(".map");
let titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
let types = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
let hours = ['12:00', '13:00', '14:00'];
let featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let photosLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getRandomElementFromArray(array){
    var index = Math.floor(Math.random() * array.length);

    return array[index];
}

function generateIndexes(num){
    var array = [];
    for (var i = 0; i < num; i++){
        array.push(i);
    }

    return array;
}

function generateFeatures(num){
    var indexes = generateIndexes(num);
    var array = [];
    for (var i = 0; i < num; i++){
        var index = Math.floor(Math.random * indexes.length);
        array.push(featuresList[indexes[index]]);
        indexes.splice(index, index);
    }

    return array;
}

function changePhotosOrder(num){
    var indexes = generateIndexes(num);
    var array = [];
    for (var i = 0; i < num; i++){
        var index = Math.floor(Math.random * indexes.length);
        array.push(photosLinks[indexes[index]]);
        indexes.splice(index, index);
    }

    return array;
}

function generateAds(n){
    var array = [n];

    for (var i = 0; i < n; i++){
        array[i] = {
            author:
            {
                avatar: `img/avatars/user${"0" + (i + 1)}.png`
            },
            offer:
            {
                title: getRandomElementFromArray(titles),
                address: '',
                price: getRandomIntInclusive(1000, 1000000),
                type: getRandomElementFromArray(types),
                rooms: getRandomIntInclusive(1, 5),
                guests: getRandomIntInclusive(1, 6),
                checkin: getRandomElementFromArray(hours),
                checkout: getRandomElementFromArray(hours),
                features: generateFeatures(getRandomIntInclusive(0, featuresList.length)),
                description: '',
                photos: changePhotosOrder(photosLinks.length)
            },
            location:
            {
                x: getRandomIntInclusive(23, 1177),
                y: getRandomIntInclusive(130, 630)
            },
            atributes:
            {
                nameOfClass: i
            }
        }

        array[i].offer.address = `${array[i].location.x}, ${array[i].location.y + 23 + 18}`;
    }

    return array;
}

function renderPins(pin){
    var pinElement = similarMapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').className = `pin__img pin__img${pin.atributes.nameOfClass}`;
    pinElement.className = `map__pin map__pin${pin.atributes.nameOfClass}`;
    pinElement.style = `left: ${pin.location.x}px; top: ${pin.location.y}px;`;
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
}

// function renderFeatures(pin, len){
//     var featureElement = similarFeatures.cloneNode(true);
//     var featuresLi = featureElement.querySelectorAll('li'); 
//     for (var i = 0; i < pin.offer.features.length; i++){
//         featuresLi[i].className = `feature feature--${pin.offer.features[i]}`;
//     }
//     for (var i = pin.offer.features.length; i < len; i++){
//         featureElement.removeChild(featuresLi[i]);
//     }
//     featureElement.className = 'popup__features';

//     return featureElement;
// }

function addPins(ads){
    for (var i = 0; i < ads.length; i++){
        fragment.appendChild(renderPins(ads[i]));
        similarPinsElement.appendChild(fragment);
    }
    fragment2.appendChild(renderCard(ads[0]));
    similarCardElement.insertBefore(fragment2, document.querySelector(".map__filters-container"));
    // similarCardElement.removeChild(document.querySelector('.popup__features'));
    // similarCardElement.insertBefore(renderFeatures(ads[0], featuresList.length), document.querySelector(".popup__description"));
}

function renderCard(pin){
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector(".popup__title").textContent = pin.offer.title;
    cardElement.querySelector(".popup__address").textContent = pin.offer.address;
    cardElement.querySelector(".popup__price").textContent = `${pin.offer.price}₽/ночь`;
    cardElement.querySelector(".popup__type").textContent = pin.offer.type;
    cardElement.querySelector(".popup__capacity").textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
    cardElement.querySelector(".popup__time").textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;
    // cardElement.querySelector(".popup__features li")
    cardElement.querySelector(".popup__description").textContent = pin.offer.description;
    // cardElement.querySelector(".popup__pictures").src = 
    cardElement.querySelector(".popup__avatar").src = pin.author.avatar;

    return cardElement;
}

var ads = generateAds(8);
var fieldset = document.querySelectorAll('fieldset');
var mapPinMain = document.querySelector(".map__pin--main");
var adressInput = document.querySelector('input[name=address]');
let noticeForm = document.querySelector('.notice__form');
let noticeSubmit = noticeForm.querySelector('.form__submit');
let resetButton = noticeForm.querySelector('.form__reset');
let typeSelectList = noticeForm.querySelector('#type');
let timeInSelectList = noticeForm.querySelector('#timein');
let timeOutSelectList = noticeForm.querySelector('#timeout');
let roomNumberSelectList = noticeForm.querySelector('#room_number');
let capacitySelectList = noticeForm.querySelector('#capacity');

function onButtonCloseClick(){
    similarCardElement.querySelector('article').classList.add('hidden');
}

function makeDisOrAble(flag){
    fieldset.forEach(element => {
        element.disabled = flag;
    });
}

function onMainPinMouseupPress(){
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    makeDisOrAble(false);
    addPins(ads);
    let buttonPopupClose = similarCardElement.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', onButtonCloseClick);
    // mapPinMain.removeEventListener('mouseup', onMainPinMouseupPress);
}

function onButtonSubmitPress(){
    let count = 0;
    noticeForm.querySelectorAll('input').forEach(element => {
        if (element.validity.valid === false){
            count += 1;
        }
        else {
            element.classList.remove('input--invalid');
        }
    });
    if (count === 0){
        document.querySelector('.notice__form').classList.add('notice__form--disabled');
        makeDisOrAble(true);
        similarCardElement.removeChild(similarCardElement.querySelector('article'));
        for (let i = 0; i < ads.length; i++){
            similarPinsElement.removeChild(similarPinsElement.querySelector(`.map__pin${i}`));
        }
        document.querySelector('.map').classList.add('map--faded');
        noticeForm.querySelectorAll('input').forEach(element => {
            element.value = '';
        });
        noticeForm.querySelector('textarea[name=description]').value = '';
        adressInput.value = `${MAIN_PIN_START_X}, ${MAIN_PIN_START_Y}`;
        mapPinMain.style.left = MAIN_PIN_START_X + 'px';
        mapPinMain.style.top = MAIN_PIN_START_Y + 'px';
    } 
}

function onButtonResetPress(){
    document.querySelector('.notice__form').classList.add('notice__form--disabled');
    makeDisOrAble(true);
    similarCardElement.removeChild(similarCardElement.querySelector('article'));
    for (let i = 0; i < ads.length; i++){
        similarPinsElement.removeChild(similarPinsElement.querySelector(`.map__pin${i}`));
    }
    document.querySelector('.map').classList.add('map--faded');
    noticeForm.querySelectorAll('input').forEach(element => {
        element.value = '';
        element.classList.remove('input--invalid');
    });
    noticeForm.querySelector('textarea[name=description]').value = '';
    adressInput.value = `${MAIN_PIN_START_X}, ${MAIN_PIN_START_Y}`;
    mapPinMain.style.left = MAIN_PIN_START_X + 'px';
    mapPinMain.style.top = MAIN_PIN_START_Y + 'px';
}

function onPinClickPress(evt){
    for (var i = 0; i < ads.length; i++){
        if (evt.target.className === `pin__img pin__img${i}`){
            similarCardElement.removeChild(similarCardElement.querySelector('article'));
            fragment2.appendChild(renderCard(ads[i]));
            similarCardElement.insertBefore(fragment2, document.querySelector(".map__filters-container"));
            let buttonPopupClose = similarCardElement.querySelector('.popup__close');
            buttonPopupClose.addEventListener('click', onButtonCloseClick);
        } 
    }
}

function onTypeInputChange(){
    if (typeSelectList.value === 'flat'){
        noticeForm.querySelector('#price').min = '1000';
        noticeForm.querySelector('#price').placeholder = '1000';
    }
    else if (typeSelectList.value === 'bungalo'){
        noticeForm.querySelector('#price').min = '0';
        noticeForm.querySelector('#price').placeholder = '0';
    }
    else if (typeSelectList.value === 'house'){
        noticeForm.querySelector('#price').min = '5000';
        noticeForm.querySelector('#price').placeholder = '5000';
    }
    else if (typeSelectList.value === 'palace'){
        noticeForm.querySelector('#price').min = '10000';
        noticeForm.querySelector('#price').placeholder = '10000';
    }
}

function onTimeInSelectChange(){
    if (timeInSelectList.value === '12:00'){
        timeOutSelectList.value = '12:00';
    }
    else if (timeInSelectList.value === '13:00'){
        timeOutSelectList.value = '13:00';
    }
    else if (timeInSelectList.value === '14:00'){
        timeOutSelectList.value = '14:00';
    }
}

function onTimeOutSelectChange(){
    if (timeOutSelectList.value === '12:00'){
        timeInSelectList.value = '12:00';
    }
    else if (timeOutSelectList.value === '13:00'){
        timeInSelectList.value = '13:00';
    }
    else if (timeOutSelectList.value === '14:00'){
        timeInSelectList.value = '14:00';
    }
}

// function onCapacitySelectInvalid(){
//     if(roomNumberSelectList.value === '1' && capacitySelectList.value !== '1'){
//         console.log('НЕ');
//         capacitySelectList.setCustomValidity('В однокомнатную квартиру можно заселить только одного гостя');
//     }
//     else if(roomNumberSelectList.value === '2' && (capacitySelectList.value !== '2' || capacitySelectList.value !== '1')){
//         capacitySelectList.setCustomValidity('В двухкомнатную квартиру можно заселить двух и менее гостей');
//     }
//     else if(roomNumberSelectList.value === '3' && capacitySelectList.value === '0'){
//         capacitySelectList.setCustomValidity('В трехкомнатную квартиру можно заселить трех и менее гостей');
//     }
//     else if(roomNumberSelectList.value === '100' && capacitySelectList.value !== '0'){
//         capacitySelectList.setCustomValidity('Ну 100 комнат это только не для гостей бро');
//     }
// }

let mapPinMainHandler = document.querySelector('.map__pin--main img');

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

        if (mapPinMain.offsetLeft - shift.x < 32){
            mapPinMain.style.left = 32 + 'px';
        }
        else if (mapPinMain.offsetLeft - shift.x > 1168){
            mapPinMain.style.left = 1168 + 'px';
        }
        else {
            mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }

        if (mapPinMain.offsetTop - shift.y < 130){
            mapPinMain.style.top = 130 + 'px';
        }
        else if (mapPinMain.offsetTop - shift.y > 630){
            mapPinMain.style.top = 630 + 'px';
        }
        else {
            mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }
        
        adressInput.value = `${mapPinMain.offsetLeft - shift.x}, ${mapPinMain.offsetTop - shift.y + (MAIN_PIN_IMG_HEIGHT / 2 + MAIN_PIN_AFTER)}`;
    };

    function onMouseUp(upEvt){
        upEvt.preventDefault();

        if (similarCardElement.querySelector('article') != undefined){
            similarCardElement.removeChild(similarCardElement.querySelector('article'));
            for (let i = 0; i < ads.length; i++){
                similarPinsElement.removeChild(similarPinsElement.querySelector(`.map__pin${i}`));
            }
        }

        document.querySelector('.map').classList.remove('map--faded');
        document.querySelector('.notice__form').classList.remove('notice__form--disabled');
        makeDisOrAble(false);
        addPins(ads);
        let buttonPopupClose = similarCardElement.querySelector('.popup__close');
        buttonPopupClose.addEventListener('click', onButtonCloseClick);

        let shift = {
            x: startChords.x - upEvt.clientX,
            y: startChords.y - upEvt.clientY
        };

        adressInput.value = `${mapPinMain.offsetLeft - shift.x}, ${mapPinMain.offsetTop - shift.y + (MAIN_PIN_IMG_HEIGHT / 2 + MAIN_PIN_AFTER)}`;

        similarPinsElement.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

    };

    similarPinsElement.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

})

makeDisOrAble(true);
document.addEventListener('click', onPinClickPress);
noticeForm.addEventListener('invalid', function(evt){
    evt.target.classList.add('input--invalid')
}, true);
noticeSubmit.addEventListener('click', onButtonSubmitPress);
resetButton.addEventListener('click', onButtonResetPress);
typeSelectList.addEventListener('change', onTypeInputChange);
timeInSelectList.addEventListener('change', onTimeInSelectChange);
timeOutSelectList.addEventListener('change', onTimeOutSelectChange);
// capacitySelectList.addEventListener('change', function(){
//     console.log(roomNumberSelectList.value);
//     console.log(capacitySelectList.value);
//     if(roomNumberSelectList.value === '1' && capacitySelectList.value !== '1'){
//         console.log('НЕ');
//         capacitySelectList.querySelector('input').validity.valid = false;
//         capacitySelectList.setCustomValidity('В однокомнатную квартиру можно заселить только одного гостя');
//     }
// });




//Работа с сетью

(function(){
    let URL = ' https://js.dump.academy/code-and-magick';

    window.upload = function(data, onSuccess){
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function(){
        onSuccess(xhr.response);
    })

    xhr.open('POST', URL);
    xhr.send(data);
    }; 
})();