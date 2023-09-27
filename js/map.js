var MAIN_PIN_X = 750;
var MAIN_PIN_Y = 325;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 82;
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var similarFeatures = document.querySelector('template').content.querySelector('.popup__features');
var fragment = document.createDocumentFragment();
var fragment2 = document.createDocumentFragment();
var fragment3 = document.createDocumentFragment();
var similarPinsElement = document.querySelector(".map__pins");
var similarCardElement = document.querySelector(".map");
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var hours = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
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
                x: getRandomIntInclusive(130, 630),
                y: getRandomIntInclusive(130, 630)
            },
            atributes:
            {
                nameOfClass: i
            }
        }

        array[i].offer.address = `${array[i].location.x}, ${array[i].location.y}`;
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

function fillAdress(){
    adressInput.value = ads[0].offer.address;
}

function makeDisOrAble(flag){
    fieldset.forEach(element => {
        element.disabled = flag;
    });
}

function onMainPinMouseupPress(){
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    fillAdress();
    makeDisOrAble(false);
    addPins(ads);
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
        adressInput.value = '750, 325';
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
    adressInput.value = '750, 325';
}

function onPinClickPress(evt){
    for (var i = 0; i < ads.length; i++){
        if (evt.target.className === `pin__img pin__img${i}`){
            similarCardElement.removeChild(similarCardElement.querySelector('article'));
            fragment2.appendChild(renderCard(ads[i]));
            similarCardElement.insertBefore(fragment2, document.querySelector(".map__filters-container"));
        } 
    }
}

makeDisOrAble(true);
mapPinMain.addEventListener('mouseup', onMainPinMouseupPress);
document.addEventListener('click', onPinClickPress);
noticeForm.addEventListener('invalid', function(evt){
    evt.target.classList.add('input--invalid')
}, true);
noticeSubmit.addEventListener('click', onButtonSubmitPress);
resetButton.addEventListener('click', onButtonResetPress);