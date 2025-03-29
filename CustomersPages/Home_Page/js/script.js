let backgroundImagesUrls = [
    '../images/carusoal_images/1.jpg' , 
    '../images/carusoal_images/2.jpg',
    '../images/carusoal_images/3.jpeg'
    ]

let MyCarousel = document.getElementById('MyCarousel_id'); // crausoal div 
let controlPrevBtn = document.getElementById('controlPrevBtn_id'); // previous btn
let controlNextBtn = document.getElementById('controlNextBtn_id'); // next btn

let counter = 0; // counter to track my background images

controlPrevBtn.addEventListener('click' , ()=>{getPrevImage();})
function getPrevImage(){
    if(counter <= 0)
        counter = backgroundImagesUrls.length - 1;
    else
        counter--;
    
    MyCarousel.style.backgroundImage = `url(${backgroundImagesUrls[counter]})` ;
}


controlNextBtn.addEventListener('click' , ()=>{getNextImage();})
function getNextImage(){
    if(counter >= backgroundImagesUrls.length - 1)
        counter = 0;
    else
        counter++;
    
    MyCarousel.style.backgroundImage = `url(${backgroundImagesUrls[counter]})` ;
}