(function ($) {
	

	var mySwiper = new Swiper ('.swiper-subcategories-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    navigation: {
      nextEl: '.slider-subcategories__button-next',
      prevEl: '.slider-subcategories__button-prev',
		},
		slidesPerView: 3,
		spaceBetween: 30,
		breakpoints: {
			992: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 20
			},
		}

	});
	


	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".header-menu").toggleClass("on");
		$(".overlay").toggleClass("on");
		return false;
	});
	$(".overlay").click(function() {
		$(this).toggleClass("on");
		$(".header-menu").toggleClass("on");
		$('.toggle-mnu').toggleClass('on');
		return false;
	});
	


})(jQuery);
