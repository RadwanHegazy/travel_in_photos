


var form = new FormData() ;


var addImageButton = document.querySelector('.add');
var presonImage = document.querySelector('.user > img');
var imageFileForm = document.querySelector('.user form input');

addImageButton.addEventListener('click',()=>{
    imageFileForm.click()
})


imageFileForm.addEventListener('change', (e)=>{
    
    var image = e.target.files[0];
    form.append('user',image)
    var image = URL.createObjectURL(image)
    presonImage.src = image;

    addImageButton.textContent = 'تغير الصورة'

})



var NextImage = document.querySelector('.images .right');
var PrevImage = document.querySelector('.images .left');
var bg_image = document.querySelector('.images img')
let imageTurn = 0 ;

var Allimages = [

    'static/places/aqsa.jpeg',
    'static/places/Cairo-Tower.jpeg',
    'static/places/giza.jpeg',
    'static/places/ka3ba.jpeg',
    'static/places/khlifa.jpeg',

];

NextImage.addEventListener('click',function(){
    
    if (imageTurn <= Allimages.length - 1){
        var image_url = Allimages[imageTurn];
        bg_image.src = image_url;
        imageTurn++
    }
    
})

PrevImage.addEventListener('click',function(){
    
    if (imageTurn > 0){
        imageTurn-- 
        var image_url = Allimages[imageTurn];
        bg_image.src = image_url;
    }

})



var doneButton = document.querySelector('.done');
var loadLayer = document.querySelector('.load');

doneButton.addEventListener('click',()=>{
    form.append('bg',`${bg_image.src}`.split('/')[`${bg_image.src}`.split('/').length - 1])

    loadLayer.classList.toggle('view');
    
    $.ajax({
        url: 'process/',
        data: form,
        processData: false,
        contentType: false,
        method: 'POST',
        success: function(data){
            
            form.delete('bg')
            form.delete('user')
            presonImage.src = '';
            
            
            var download = document.createElement('a')
            download.href = data;
            download.download = true
            download.click()
            
            loadLayer.classList.toggle('view');
            

        }
    })

})


