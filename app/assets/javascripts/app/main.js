(function () {
	'use strict';

	var Mudhead = {
		layout: {
			bindResize: false
		}
	};

	if (document.querySelector('[data-toggle="push-menu"]')) {
		$('body [data-toggle="push-menu"]').on('click', function (event) {
			if ($(window).width() > 767) {
				$('body').toggleClass('sidebar-mini');
			} else {
				$('body').toggleClass('sidebar-open');
			}

			return false;
		});
	}

	// if (document.querySelector('[data-plugin="ps"]')) {
	// 	$('[data-plugin="ps"]').perfectScrollbar();
	// }
	//
	if (document.querySelector('[data-plugin="metis"]')) {
		$('[data-plugin="metis"]').metisMenu();
	}



}).call(this);
