/*!
 * jQuery JetClip
 * Version: 0.0.1 (04-ABR-2013)
 * Dual licensed under the MIT and GPL licenses.
 * Requires: jQuery v1.7.1 or later
 */
;(function($, undefined) {
	
	"use strict";

	var ver = '0.0.1';

	$.fn.jetclip = function(options) {

		// Create some defaults, extending them with any options that were provided
	    var settings = $.extend( {
			'scroll': false
	    }, options);	

	    return this.each(function() {
	    	
			//log
			//console.log( jQuery(this).is(':visible') ? this : 0);
			
			//Check if not depends of something
			var attr = $(this).attr('data-depends');
			
			//console.log(attr, typeof attr !== 'undefined' && attr !== false ? 'si-depende' : 'no-depende');
			
			// Seek visible async elements to preload
			initLoadResource( typeof attr !== 'undefined' && attr !== false ? 0 : jQuery(this).is(':visible') ? this : 0 );
	
	    });
	    
	    function initLoadResource(HTMLElement)
	    {
	    	if (HTMLElement != 0) {
	    		
		    	// Remove async class
				jQuery(HTMLElement).removeClass('async');
				
				// Add a spinner
				jQuery(HTMLElement).append('<span class="icon-loading-spinner"><span class="spinner-quarter"><span class="spinner-circle"></span></span></span>');
				
				jQuery(HTMLElement).append( jQuery('<img style="display:none;" />').attr( 'src', jQuery.support.leadingWhitespace ? jQuery(HTMLElement).attr('data-image-url') : jQuery(HTMLElement).attr('data-image-url') + '?timestamp=' + new Date().getTime() ) );
				jQuery(HTMLElement).children('img').load(successLoadResource).error(errorLoadResource);

	    	}
	    }

		/**
		 * callback function that fires when images was not loaded.
		 * 
		 * @return null
		 * @version 1.0
		 */
		function errorLoadResource()
		{
			$(this).parent().addClass('async');
		}

		/**
		 * callback function that fires when images was loaded successfully.
		 * 
		 * @return null
		 * @version 1.0
		 */
		function successLoadResource()
		{
			$(this).prev().remove();
			$(this).fadeIn(1000);
		}
	
	};
	
})(jQuery);
