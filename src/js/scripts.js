$('.partner-carousel').slick({
	dots: false,
	slidesToShow: 6,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '0',
				slidesToShow: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				// arrows: false,
				centerMode: true,
				centerPadding: '0',
				slidesToShow: 1
			}
		}
	]
});