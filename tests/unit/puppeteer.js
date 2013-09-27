$(function () {
	
	module("puppeteer")
	
	test("should provide no conflict", function () {
		var puppeteer = $.fn.puppeteer.noConflict()
		ok(!$.fn.puppeteer, 'puppeteer was set back to undefined (org value)')
		$.fn.puppeteer = puppeteer
	})
	
	test("should be defined on jquery object", function() {
		var div = $('<div></div>')
		ok(div.puppeteer, 'puppeteer method is defined')
	});
	
	test("should return element", function() {
		var div = $('<div></div>')
		ok(div.puppeteer() == div, 'div was returned')
	});
	
	test("should expose puppeteer object", function() {
		var div = $('<div></div>').puppeteer()
		ok(div.data()['tms.puppet'], 'object has been puppeteered')
	});
	
	test("should set default options for puppet", function() {
		var div = $('<div></div>').puppeteer()
		var options = div.data('tms.puppet').options
		
		deepEqual(options.onScreenPercentage, 0.2, 'on screen percentage is set')
		deepEqual(options.persistOnScreen, true, 'persist on screen is set')
		deepEqual(options.didScroll, false, 'did scroll is set')
		deepEqual(options.setupClass, null, 'setup class is set')
		deepEqual(options.actionClass, null, 'action class is set')
	});
	
	test("should set $element on puppeteer object", function() {
		var div = $('<div></div>')
		div.puppeteer()
		ok(div.data('tms.puppet').$element, 'sets the element')
	});
	
	test("should be able to set options when calling puppeteer()", function() {
		var div = $('<div></div>').puppeteer({ onScreenPercentage : 1 })
		deepEqual(div.data('tms.puppet').options.onScreenPercentage, 1, 'set options via an options object')
	});
	
	test("should be able to set options using data attributes on dom element", function() {
		var div = $('<div data-on-screen-percentage="0.8"></div>').puppeteer()
		deepEqual(div.data('tms.puppet').options.onScreenPercentage, 0.8, 'set options via data attribute')
	});
	
	test("should apply setupClass on initialize with options", function() {
		var div = $('<div></div>').puppeteer({setupClass : 'init-class'})
		ok(div.hasClass('init-class'), 'set the setupClass on initialize with options')
	});
	
	test("shoul apply setupClass on initialize with data attribute", function() {
		var div = $('<div data-setup-class="init-class"></div>').puppeteer()
		ok(div.hasClass('init-class'), 'set the setupClass on initialize with data attribute')
	});
	
})