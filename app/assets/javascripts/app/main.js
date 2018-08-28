(function (root, factory) {
	'use strict';

	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.mudhead = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, (function (root) {
	'use strict';

	var Mudhead = {};
	var settings;
	var DEFAULTS = {
		toggleClass: {
			label: {
				selector: '.mdc-floating-label',
				toggle: 'mdc-floating-label--float-above'
			},
			ripple: {
				selector: '.mdc-line-ripple',
				toggle: 'mdc-line-ripple--active'
			},
			outline: {
				selector: '.mdc-notched-outline',
				toggle: 'mdc-notched-outline--notched'
			}
		},
		parentElem: {
			selector: '.mdc-text-field',
			toggle: 'mdc-text-field--focused'
		},
		inputSelector: '.mdc-text-field__input',
		formSelector: '[data-mudhead-form]',
		toReturn: false
	};

	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var supports = function () {
		return 'querySelector' in document && 'addEventListener' in root;
	};

	var extend = function () {
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	var getClosest = function ( elem, selector ) {
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}
		return null;
	};

	var shouldRun = function (i) {
		return i.target.form.matches(settings.formSelector);
	};

	Mudhead.init = function (opts) {
		if (!supports()) return;

		settings = extend(DEFAULTS, opts || {});

		$('body .md-input').on('focus blur', function (i) {

			if (!shouldRun(i)) return;

			var _this = this;
			var input_wrapper = $(this).parents('.md-wrapper');
			input_wrapper.toggleClass('md-input-focused', 'focus' === i.type || _this.value.length > 0);
			input_wrapper.find('.md-label').toggleClass('md-label-float', 'focus' === i.type || _this.value.length > 0);
			input_wrapper.find('.md-ripple').toggleClass('md-ripple-active', 'focus' === i.type || _this.value.length > 0);
		});

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

		if (document.querySelector('[data-plugin="metis"]')) {
			$('[data-plugin="metis"]').metisMenu();
		}

		Mudhead.settings = settings;

	};

	Mudhead.init();

	return Mudhead;

}));
