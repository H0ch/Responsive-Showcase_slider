Responsive Showcase Slider
===============

A lightweight responive slider (> 2.5kb gzipped) constructed using jQuery. It uses css3 transitions, if supported and falls back to using the jQuery animate method if they are not available. The animate method can also be forced as you can combine it with the jQuery easing plugin [jQuery easing plugin](https://github.com/gdsmith/jquery.easing). Include the plugin before this one and overwrite the animation method in the plugin settings.

Overriding Defaults
==================
The Reponsive Showcase Slider has a few defaults that can be overriden to customise how it funtions

Easing
------

'Default : swing'

To override:

	$('#showcase_slider').showcaseSlider({
		easing : 'linear'
	});

This will override the default swing method of easing to use linear (these are the only to included with jQuery by default).

Animation Speed
---------------

'Default : 800'

This is the speed at which a new slide will fade in in milliseconds.

To override:

	$('#showcase_slider').showcaseSlider({
		speed : 1000
	});

This will override the speed to be 1 second.

Slide Wrapper
-------------

'Default : article'

This is the html element wrapper used to enclose your image and caption.

To override:

	$('#showcase_slider').showcaseSlider({
		wrapper : 'div'
	});

This will tell the script that a div is wrapping the slide. You must update your HTML to the same.

Auto Carousel
--------

'Default : true'

A boolean variable that enable auto scrolling through slide when the mouse is not hovering over the slider.

To override:

	$('#showcase_slider').showcaseSlider({
		carousel : false
	});

This disables the auto carousel so slode will only change on user input.

Carousel Timer
-------------

'Default : 5000'

When Auto Carousel is enabled the timer determines how long between each new slide in milliseconds.

To override:

	$('#showcase_slider').showcaseSlider({
		timer : 4000
	});

Updates the carousel to slide in new images at 4 second intervals. *The script will not allow you to use a timer less than the animation speed.

Force Animations
---------------

'Default : false'

You can chose to overrive the default use of jQuery.animate(). By default if CSS3 transitions are supported then they will be used and it will fallback to .animate() when they're not available. You can override this behaviour by setting to true. Useful if using the [jQuery easing plugin](https://github.com/gdsmith/jquery.easing).

To override:

	$('#showcase_slider').showcaseSlider({
		forceAnim : true
	});

Image Captions
--------------
'Default : true'

Image captions are supported but can be override simply by excluding them from your markup. If you however do not wish to alter your markup you may disable them in the plugins defautl settings.

To override:

	$('#showcase_slider').showcaseSlider({
		caption : false
	});


Developed by [Orin Bailey](http://www.orinbailey.com).