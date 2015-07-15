/**
 * BearTrap
 * 
 * Catches the current bear.
 */

var Helpers = Helpers || {};

(function($, window, document, undefined) {

	'use strict';

	/**
	 * BearTrap
	 *
	 * Used to show which bear is currently being used.
	 * 
	 * @param {obj} userOptions User can override options with this.
	 */
	Helpers.BearTrap = function(userOptions){

		//default options
		this.options = {
			bears: {
				'infant': 320,
				'baby': 480,
				'child': 600,
				'teen': 768,
				'adult': 1024,
				'mama': 1100,
				'papa': 1300,
				'elder': 1920
			},
			styles: {
				'text-transform': 'uppercase',
				'padding': '5px 10px',
				'bottom': 10,
				'right': 10,
				'position': 'fixed',
				'z-index': 5000,
				'font-size': 12,
				'background-color': '#da10f2',
				'color': '#ffffff',
			},
			appendElement: $('body')

		};
		
		//extend default options with module options
		$.extend(this.options, userOptions);

		//initial functionality on instantiation
		this._init();
	};


	/**
	 * _init
	 *
	 * Initial functionality that happens on instantiation of BearTrap.
	 */
	Helpers.BearTrap.prototype._init = function(){

		//set reference to this
		var self = this;

		//build the element
		this._build();

		//set resize for check later
		var resize = false;

		//declare bear
		var bear;

		$(window).on('load resize', function(){

			//if not resizing, carry on.
			if(!resize){
				//we're resizing
				resize = true;

				//get the bear type
				bear = self.getType();

				//set the bear type in the element
				self._setType(bear);

				//we've stopped resize functionality
				resize = false;
			}
		});
	};


	/**
	 * _build
	 * 
	 * Create element and set initial styles
	 */
	Helpers.BearTrap.prototype._build = function(){

		//create the bear box
		var bearBox = $('<div />')
			.addClass('bear-box')
			.css(this.options.styles);

		//append to the body
		$(this.options.appendElement).append(bearBox);
	};

	/**
	 * getType
	 *
	 * Gets the current bear.
	 * 
	 * @return {string} Contains the bear found.
	 */
	Helpers.BearTrap.prototype.getType = function(){
		this.width = $(window).width();

		var bear = 'no';

		//loop through bear array
		for (var x in this.options.bears){

			//if the window is greater than the iterated bear
			if(this.width > this.options.bears[x]){
				//could be this bear!
				bear = x;
			}
		}

		//return the bear we found
		return bear;
	};

	/**
	 * _setType
	 *
	 * Put the bear in the bear box.
	 * 
	 * @param {string} Bear type of bear to display.
	 */
	Helpers.BearTrap.prototype._setType = function(bear){
		$('.bear-box').html(bear + ' bear');
	};


})(jQuery, window, document);