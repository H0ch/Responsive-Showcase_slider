( function( $ ){
	
	$.fn.showcaseSlider = function( options ){
		var settings = $.extend({
			speed : 800,
			wrapper : 'article',
			carousel : true,
			timer : 5000,
			forceAnim : false,
			easing : 'swing',
			caption : true
		}, options),
		$this = $(this),
		cont = $this.find(settings.wrapper),
		nextBtn = $this.find("span[data-dir='next']"),
		prevBtn = $this.find("span[data-dir='prev']"),
		auto, trans;

		// Force the carousel time to be 200ms faster than the animtion speed to prevent
		// the carousel from interrupting the animation to switch slides.
		if((settings.timer - 200)  < settings.speed) settings.timer = settings.speed + 200;

		// jQuery.support.transition
		// To verify that CSS3 transition is supported (or any of its browser-specific implementations)
		// @ https://gist.github.com/jonraasch/373874
		$.support.transition = (function(){
		    var thisBody = document.body || document.documentElement,
		        thisStyle = thisBody.style,
		        support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
		    return support;
		})();
		// If animations are being force set the use of transitions to false otherwise
		// detect the browser support.
		trans = ( settings.forceAnim  ) ? false : $.support.transition ;



		//Assign functions to jQuery prototype object.
		//Attempt to get previous sibling, if at the end of the list select the last making
		// the function consider elements as a continual structure.
		$.fn.getPrev = function(){ return ( this.prev().length ) ? this.prev() : this.siblings().last(); }
		//Attempt to get next sibling, if at the end of the list select the first.
		$.fn.getNext = function(){ return ( this.next().length ) ? this.next(): this.siblings().first(); }

		// Go to the next slide whether it be backwards or forwards.
		var goToNext = function(button, dir){
			// Detach the click event to prevent firing mulitple times while animation is 
			// still running.
			button.off();

			// Retrieve current and it's caption from the DOM, if no caption is found 
			// the variable is 'falsy'.
			var cur = $this.find( '.active' ),
				cap = ( settings.caption ) ? cur.find( '.sc_caption' ) : 0 ;

			// Determine what method to invoke by direction parameter provided.
			( dir == "next" ) ? next = cur.getNext() : next = cur.getPrev() ;

			// Add a preloaded class to the next element and 
			// retrieve next element's caption from the DOM,
			next.addClass( 'pre' );
			nextCap = ( settings.caption ) ? next.find( '.sc_caption' ) : 0 ;

			// If the browser doesn't support transitions use jQuery animate.
			( !trans ) ? cur.animate({ opacity : 0 }, settings.speed-10, settings.easing ) : cur.addClass( 'clear' );
			
			// Check whether captions are enabled and if they exist
			if(nextCap !== undefined || nextCap !== 0 || nextCap.length > 0){
				// If the browser doesn't support transitions use jQuery animate.
				if( !trans ){
					nextCap.animate({ 'left' : '0' }, settings.speed-10, settings.easing );
					cap.animate({ 'left'     : '100%' }, settings.speed-10, settings.easing );
				}else{
					nextCap.addClass( 'slideIn' );					
					cap.addClass( 'slideOut' ).removeClass( 'slideIn' );
				}
			}

			// Set a timeout to clear positions of moved elements after the animation is complete.
			var reset = setTimeout( function(){
				// Remove classes from the current element and add active to the next.
				cur.removeClass();
				next.removeClass().addClass( 'active' );
				
				// If the browser doesn't support transitions use jQuery animate
				if( !trans ){ 
					cur.css({ "opacity" : "1" });
					cap.css({ 'left'	: '-100%' })

				}else cap.removeClass('slideOut');				
				
				// Determine the direction and bind appropriate event back on to the button 
				// clicked
				( dir == "next" ) ? button.on( 'click' , function(){ bindNext() }) : button.on( 'click' , function(){ bindPrev() });

			}, settings.speed + 10 );
		}
		var bindNext = function(){ goToNext( nextBtn, "next" ); }
		var bindPrev = function(){ goToNext( prevBtn, "prev" ); }
		// bind events to buttons and pass parameters to the goToNext method
		nextBtn.on( 'click' , function(){ bindNext() });
		prevBtn.on( 'click' , function(){ bindPrev() });

		if( !trans ) cont.first().addClass( 'active' ).find( '.sc_caption' ).css({ 'left' : '0' });
		else{
			cont.css({
				"webkit-transition" : "opacity " + settings.speed + "ms ease-in-out",
				"-moz-transition"   : "opacity " + settings.speed + "ms ease-in-out",
				"-o-transition"     : "opacity " + settings.speed + "ms ease-in-out",
				"transition"		: "opacity " + settings.speed + "ms ease-in-out"
			}).first().addClass( 'active' ).find( '.sc_caption' ).addClass( 'slideIn' );

			cont.find( '.sc_caption' ).css({
				"webkit-transition" : "left " + settings.speed + "ms ease-in-out",
				"-moz-transition"   : "left " + settings.speed + "ms ease-in-out",
				"-o-transition"     : "left " + settings.speed + "ms ease-in-out",
				"transition"		: "left " + settings.speed + "ms ease-in-out"
			});
		}

		if(settings.carousel){	
			auto = setInterval( function(){ goToNext( nextBtn, "next"); }, settings.timer );
			$this.mouseenter(function(){ clearInterval( auto ) })
			$this.mouseleave(function(){ setCarousel() })
		}
	}
}( jQuery ));
