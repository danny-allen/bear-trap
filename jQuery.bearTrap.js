/**
 * jQuery.bearTrap.js
 *
 * A jQuery plugin that identifies the current screensize.
 *
 * The bearTrap plugin works from pre-defined screen sizes.
 */

(function($, window, document, undefined) {

    'use strict';

    //set plugin name and options
    var pluginName = 'bearTrap',
        defaults = {
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
            }
        };


    /**
     * Plugin
     * 
     * @param obj element The element to instantiate from.
     * @param obj options The options pass to the instantiated object.
     */
    function Plugin(element, options) {

        //set the element
        this.element = element;

        //extend options as settings prioritise user set options.
        this.settings = $.extend({}, defaults, options);

        //store defaults for use.
        this._defaults = defaults;

        //set the plugin name for use.
        this._name = pluginName;

        //run initial functionality.
        this._init();
    }
    

    /**
     * extend
     * 
     * Avoid Plugin.prototype conflicts
     */
    $.extend(Plugin.prototype, {


        /**
         * _init
         *
         * Initial functionality that happens on instantiation of hotel data.
         */
        _init: function() {

            //build the element
            this._build();
            
            //add the event listenrs
            this._attachListeners();
        },


        /**
         * _hotelCodeExists
         *
         * Check for a hotel code - if one exists, return it.
         * @return string The hotel code - should be two digits.
         */
        _hotelCodeExists: function(){

            //set code
            this._code = this.settings.codeAttribute.attr('ui-hotel-code');

            //check for a hotel code of some kind
            if(!this._code){
                console.log('No hotel code found.');
                return false;
            }

            //got one!
            return this._code;
        },


        /**
         * _getHotelData
         *
         * Get the data from the hotel as json so we can use it.
         * 
         * @return obj data The hotel data from the api call.
         */
        _getHotelData: function(callback){

            //maintain reference to plugin
            var self = this;

            //get the json data
            $.getJSON( '/api/hotels.php', function(data) {

                //store the hotels data
                self._hotels = data;
                
                //if callback is a function - run it!
                if(typeof callback === 'function'){
                    callback(self._hotels);
                }
            });
        },


        /**
         * _build
         * 
         * Create element and set initial styles
         */
        _build: function(){

            //create the bear box
            var bearBox = $('<div />')
                .addClass('bear-box')
                .css(this.settings.styles);

            //append to the body
            $(this.element).append(bearBox);
        },

        /**
         * getType
         *
         * Gets the current bear.
         * 
         * @return {string} Contains the bear found.
         */
        _getType: function(){
            var width = $(window).width();

            var bear = 'no';

            //loop through bear array
            for (var x in this.settings.bears){

                //if the window is greater than the iterated bear
                if(width > this.settings.bears[x]){
                    //could be this bear!
                    bear = x;
                }
            }

            //return the bear we found
            return bear;
        },


        /**
         * _setType
         *
         * Put the bear in the bear box.
         * 
         * @param   string  Bear type of bear to display.
         */
        _setType: function(bear){
            $('.bear-box').html(bear + ' bear');
        },


        /**
         * _attachListeners
         * 
         * Adds event listeners - called on instantiation.
         */
        _attachListeners: function() {

            //maintain reference to plugin
            var self = this;

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
                    bear = self._getType();

                    //set the bear type in the element
                    self._setType(bear);

                    //we've stopped resize functionality
                    resize = false;
                }
            });
        },

    });


    /**
     * A really lightweight plugin wrapper around the constructor,
     * preventing against multiple instantiations
     */
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);