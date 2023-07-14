

(function($) {

	var	$window = $(window),
		$body = $('body')
	

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 200);
		});

	// Gallery.
	$window.on('load', function() {

		var $gallery = $('.gallery');

		$gallery.poptrox({
			baseZIndex: 10001,
			useBodyOverflow: false,
			usePopupEasyClose: false,
			overlayColor: '#1f2328',
			overlayOpacity: 0.95,
			usePopupDefaultStyling: true,
			usePopupCaption: true,
			popupLoaderText: '',
			windowMargin: 50,
			usePopupNav: true
		});

		// Hack: Adjust margins when 'small' activates.
			breakpoints.on('>small', function() {
				$gallery.each(function() {
					$(this)[0]._poptrox.windowMargin = 50;
				});
			});

			breakpoints.on('<=small', function() {
				$gallery.each(function() {
					$(this)[0]._poptrox.windowMargin = 5;
				});
			});

	});

	// Section transitions.
	if (browser.canUse('transition')) {

		var on = function() {


			// Generic sections.
				$('.wrapper')
					.scrollex({
						mode:		'middle',
						delay:		10,
						initialize:	function() { $(this).addClass('inactive'); },
						terminate:	function() { $(this).removeClass('inactive'); },
						enter:		function() { $(this).removeClass('inactive'); },
						leave:		function() { $(this).addClass('inactive'); }
					});


		};

		var off = function() {


			// Generic sections.
				$('.wrapper')
					.unscrollex();

			// Footer.
				$('#footer')
					.unscrollex();

		};

		breakpoints.on('<=small', off);
		breakpoints.on('>small', on);

	};

	// Populate gallery with new images. Assumes 45 images available

	$('.gallery a').each(function() {
		var randomNumber;
		
		// Generate a unique random number
		randomNumber = Math.floor(Math.random() * 8) + 1;
		
		
		var newHref = 'images/img' + randomNumber + '.jpg';
		
		$(this).attr('href', newHref);
		$(this).children('img').attr('src', newHref);
	});

})(jQuery);