/* ========================================================================
 * jQuery: puppeteer.js v0.1.0
 * <url goes here>
 * Inspired by "On Scroll Effect Layout" on codrops [http://tympanus.net/codrops/2013/07/18/on-scroll-effect-layout/]
 * ========================================================================
 * Copyright 2013 Terry Schmidt
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

+function ($) { "use strict";
	var Puppeteer = function (element, options) {
		this.options		=
		this.enabled		=
		this.$element 	= null
		
		this.init('puppet', element, options)
	}
	
	Puppeteer.DEFAULTS = {
		onScreenPercentage	: 0.2
	, persistOnScreen			: true
	, didScroll						: false
	, setupClass					: null
	, actionClass					: null
	}
	
	Puppeteer.prototype.init = function (type, element, options) {
		this.enabled 	= true
		this.type			= type
		this.$element	= $(element)
		this.options	= this.getOptions(options)
		
		this.showtime();
		
		$(window).on('scroll', '', $.proxy(this.scrollHandler, this))
	}
	
	Puppeteer.prototype.getOptions = function (options) {
		options = $.extend({}, this.getDefaults(), this.$element.data(), options)
		return options
	}
	
	Puppeteer.prototype.getDelegateOptions = function () {
		var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
	}
	
	Puppeteer.prototype.getDefaults = function () {
		return Puppeteer.DEFAULTS
	}
	
	Puppeteer.prototype.scrollHandler = function () {
		var that = this;
		if( !this.options.didScroll ) {
			this.options.didScroll = true;
			setTimeout(function () {
				that.showtime()
			}, 80)
		}
	}
	
	Puppeteer.prototype.scrollY = function () {
		return window.pageYOffset || window.document.documentElement.scrollTop;
	}
	
	Puppeteer.prototype.getViewportHeight = function () {
		var client = window.document.documentElement['clientHeight'],
			inner = window['innerHeight'];
		
		if( client < inner )
			return inner;
		else
			return client;
	}
	
	Puppeteer.prototype.getOffset = function () {
		var offsetTop = 0, offsetLeft = 0, element = this.$element[0];
		do {
			if ( !isNaN( element.offsetTop ) ) {
				offsetTop += element.offsetTop;
			}
			if ( !isNaN( element.offsetLeft ) ) {
				offsetLeft += element.offsetLeft;
			}
		} while( element = element.offsetParent )

		return {
			top : offsetTop,
			left : offsetLeft
		}
	}
	
	Puppeteer.prototype.preparePuppet = function () {
		if (!this.$element.hasClass(this.options.setupClass)) {
			this.$element.addClass(this.options.setupClass)
		}
	}
	
	Puppeteer.prototype.dancePuppetDance = function () {
		if (!this.$element.hasClass(this.options.actionClass)) {
			this.$element.addClass(this.options.actionClass)
		}
	}
	
	Puppeteer.prototype.cutTheStrings = function () {
		this.$element.removeClass(this.options.actionClass)
	}
	
	Puppeteer.prototype.showtime = function () {
		this.preparePuppet()
		
		if (this.options.persistOnScreen) {
			if (this.onStage()) {
				this.dancePuppetDance()
			}
		} else {
			if (this.onStage()) {
				this.dancePuppetDance()
			} else {
				this.cutTheStrings()
			}
		}
		
		this.options.didScroll = false;
	}
	
	Puppeteer.prototype.onStage = function () {
		var elementHeight = this.$element[0].offsetHeight
			, scrolled = this.scrollY()
			, viewed = scrolled + this.getViewportHeight()
			, elementTop = this.getOffset().top
			, elementBottom = elementTop + elementHeight;
		
		return (elementTop + elementHeight * this.options.onScreenPercentage) <= viewed && (elementBottom) >= scrolled;
	}
	
  // PUPPETEER PLUGIN DEFINITION
  // ===========================

	var old = $.fn.puppeteer
	
	$.fn.puppeteer = function (option) {
		return this.each(function () {
			var $this		= $(this)
			var data		= $this.data('tms.puppet')
			var options	= typeof option == 'object' && option
			
			if (!data) $this.data('tms.puppet', (data = new Puppeteer($this, options)))
		})
	}
	
	$.fn.puppeteer.Constructor = Puppeteer
	
	// PUPPETEER NO CONFLICT
	// =====================
	
	$.fn.puppeteer.noConflict = function () {
		$.fn.puppeteer = old
		return this
	}
	
}(window.jQuery);