'use strict';

(function(){
    const FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif' ];

    let picturesBlock = document.querySelector('.form__photo-container');

    function setAvatarImg() {
        let fileChooser = document.querySelector('.input-avatar');
        let preview = document.querySelector('.avatar-pic');
    
        fileChooser.addEventListener('change', function() {
            let file = fileChooser.files[0];
            let fileName = file.name.toLowerCase();
    
            let matches = FILE_TYPES.some(function(it){
                return fileName.endsWith(it);
            });
    
            if (matches) {
                let reader = new FileReader();
    
                reader.addEventListener('load', function(){
                    preview.src = reader.result;
                });
    
                reader.readAsDataURL(file);
            }
        }); 
    };

    function setAdPictures(){
        let fileChooser = document.querySelector('.input-pictures');

        fileChooser.addEventListener('change', function(){
            let file = fileChooser.files[0];
            let fileName = file.name.toLowerCase();

            let matches = FILE_TYPES.some(function(it){
                return fileName.endsWith(it);
            });

            if (matches) {
                let preview = document.createElement('img');
                let reader = new FileReader();

                picturesBlock.appendChild(preview);
                preview.className = 'ad-picture';

                reader.addEventListener('load', function(){
                    preview.src = reader.result;
                });

                reader.readAsDataURL(file);
            }
        });
    };

    setAvatarImg();
    setAdPictures();
})();