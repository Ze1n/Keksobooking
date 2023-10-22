'use strict';

(function () {
    let URL = 'https://24.javascript.pages.academy/keksobooking/data';

    window.backend = {
        download: function(onSuccess, onError){
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.open('GET', URL);

            xhr.addEventListener('load', function(){
                if (xhr.status === 200){
                    onSuccess(xhr.response);
                }
                else {
                    onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });

            xhr.addEventListener('error', function(){
                onError('Произошла ошибка соединения');
            });

            xhr.addEventListener('timeout', function(){
                onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
            });

            xhr.send();
        }
        
    };
})();
