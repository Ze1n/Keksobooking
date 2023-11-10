'use strict';

(function () {
    const MAIN_PIN_WIDTH = 65;
    const MAIN_PIN_IMG_HEIGHT = 62;
    const MAIN_PIN_AFTER = 22;
    const MAIN_PIN_HEIGHT = MAIN_PIN_IMG_HEIGHT + MAIN_PIN_AFTER;
    const MAIN_PIN_START_X = 600;
    const MAIN_PIN_START_Y = 375;

    let fieldset = document.querySelectorAll('fieldset');
    let mapPinMain = document.querySelector(".map__pin--main");
    let noticeForm = document.querySelector('.notice__form');
    let noticeSubmit = noticeForm.querySelector('.form__submit');
    let resetButton = noticeForm.querySelector('.form__reset');
    let typeSelectList = noticeForm.querySelector('#type');
    let timeInSelectList = noticeForm.querySelector('#timein');
    let timeOutSelectList = noticeForm.querySelector('#timeout');
    // let roomNumberSelectList = noticeForm.querySelector('#room_number');
    // let capacitySelectList = noticeForm.querySelector('#capacity');

    window.form = {
        makeDisable: function(flag){
            fieldset.forEach(element => {
                element.disabled = flag;
            });
        },

        adressInput: document.querySelector('input[name=address]')
    };

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
            noticeForm.submit();
        } 
    };

    function onButtonResetPress() {
        let cards = document.querySelectorAll('.map__card');
        let pins = document.querySelectorAll('.map__pin');
        let picturesBlock = document.querySelector('.form__photo-container');
        let avatarPicture = document.querySelector('.avatar-pic');

        avatarPicture.src = 'img/muffin.png';

        if (document.querySelector('.ad-picture') !== undefined) {
            let adPictures = document.querySelectorAll('.ad-picture');

            adPictures.forEach(function(element){
                picturesBlock.removeChild(element);
            });
        }

        pins.forEach(element => {
            element.classList.add('hidden');
        });

        cards.forEach(element => {
            element.classList.add('hidden');
        });

        document.querySelector('.map__pin--main').classList.remove('hidden');
        document.querySelector('.notice__form').classList.add('notice__form--disabled');
        document.querySelector('.map').classList.add('map--faded');

        noticeForm.querySelectorAll('input').forEach(element => {
            element.value = '';
            element.classList.remove('input--invalid');
        });

        noticeForm.querySelector('textarea[name=description]').value = '';
        window.form.adressInput.value = `${MAIN_PIN_START_X}, ${MAIN_PIN_START_Y}`;
        mapPinMain.style.left = MAIN_PIN_START_X + 'px';
        mapPinMain.style.top = MAIN_PIN_START_Y + 'px';

        window.form.makeDisable(true);
    };
    
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
    };
    
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
    };
    
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
    };

    function errorHandler(errorMessage){
        alert(errorMessage);
    };

    noticeForm.addEventListener('submit', function(evt){
        evt.preventDefault();

        window.backend.upload(new FormData(noticeForm), function (response){
            onButtonResetPress();
        }, errorHandler);
    });

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

    window.form.makeDisable(true);
})();