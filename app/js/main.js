const $btnOpen    = document.querySelector('#btnOpen');
const $btnClose   = document.querySelector('#btnClose');
const $mobileMenu = document.querySelector('.mobile');

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


//** Slider */
const $leftBtn    = document.querySelector('#leftButton');
const $rightBtn   = document.querySelector('#rightButton');
const $slider     = document.querySelector('.courses__slider');
const $sliderItem = document.querySelector('.courses__item');

// The slides counter:
const slidesCount = $slider.querySelectorAll('.courses__item').length;

// The watcher for an active slide:
let activeSlideIndex = 0;

$leftBtn.addEventListener('click', ()=>{
	changeSlide('left');
});

$rightBtn.addEventListener('click', ()=>{
	changeSlide('right');
});

function changeSlide(direction){
	if(direction === 'left'){
		activeSlideIndex++;
		if(activeSlideIndex === slidesCount){
			activeSlideIndex = 0;
		}
	} else if(direction === 'right'){
		activeSlideIndex--;
		if(activeSlideIndex < 0){
			activeSlideIndex = slidesCount - 1;
		}
	}

	const slideWidth = $sliderItem.clientWidth;

	$slider.style.transform = `translateX(-${(activeSlideIndex * slideWidth) + (16 * activeSlideIndex)}px)`;

}

console.dir($slider);

