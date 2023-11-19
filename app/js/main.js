const $btnOpen    = document.querySelector('#btnOpen');
const $btnClose   = document.querySelector('#btnClose');
const $mobileMenu = document.querySelector('.mobile');

/** Burger */
$btnOpen.addEventListener('click', function(){
	$mobileMenu.classList.add('active');
});

$btnClose.addEventListener('click', function(){
	$mobileMenu.classList.add('close');
	setTimeout( ()=>{
		$mobileMenu.classList.remove('active');
		$mobileMenu.classList.remove('close');
	}, 310);
});


/** Slider */
const $leftBtn    = document.querySelector('#leftButton');
const $rightBtn   = document.querySelector('#rightButton');
const $slider     = document.querySelector('.courses__slider');

const slidesArray = $slider.querySelectorAll('.courses__item');
const slidesCount = slidesArray.length;
const targetCount = slidesCount * 3; // 15

for (let i = 1; i < targetCount; i++) {
  slidesArray.forEach(slide => {
    const clonedSlide = slide.cloneNode(true);
    $slider.appendChild(clonedSlide);
  });
}

const updatedSlidesArray = $slider.querySelectorAll('.courses__item');
const updatedSlidesCount = updatedSlidesArray.length; // 75
console.log(updatedSlidesCount);
console.dir(updatedSlidesArray);

// The watcher for an active slide:
let activeSlideIndex = 0;

// Translation of the slider wrapper:
const medium = Math.floor(updatedSlidesCount / 2); // 37
const slideWidth = updatedSlidesArray[0].clientWidth; // 470
console.log('medium:', medium);
console.log('width:', slideWidth);
$slider.style.left = `-${(slideWidth * medium) + (16 * medium)}px`; // -17982px
console.log('left:', $slider.style.left);

$leftBtn.addEventListener('click', ()=>{
	changeSlide('left');
});

$rightBtn.addEventListener('click', ()=>{
	changeSlide('right');
});

function changeSlide(direction){
	if(direction === 'left'){
		activeSlideIndex++;
	} else if(direction === 'right'){
		activeSlideIndex--;
	}

	if(activeSlideIndex > 0){
		$slider.style.transform = `translateX(-${(activeSlideIndex * slideWidth) + (16 * activeSlideIndex)}px)`;
	} else {
		$slider.style.transform = `translateX(${(Math.abs(activeSlideIndex) * slideWidth) + (16 * Math.abs(activeSlideIndex))}px)`;
	}
}