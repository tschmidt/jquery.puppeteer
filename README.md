# jQuery Puppeteer

Puppeteer is a simple solution to help you direct element on your page like puppets on string.

## Motivation

I've been seeing a trend around the internets where elements on the page would appear and
animate when you scroll to their position on the page. For visual reference you can go
[here](http://www.mightymatcha.com), [here](http://www.apple.com/imac/design/), or [here](http://heymosaic.com).

After spending way more time than I care to admit looking for an existing solution, I decided
to create one myself. The inspiration for this plugin came from [several](http://www.creativebloq.com/css3/getting-css-animations-trigger-1132906) 
[different](http://css-tricks.com/slide-in-as-you-scroll-down-boxes/) [places](http://tympanus.net/codrops/2013/07/18/on-scroll-effect-layout/).

I tried to make this plugin as simple and user friendly as possible. really, all it does
it to apply or remove css classes that will perform the animations. This makes it great
for front end developers because they only need to deal with HTML and CSS.

## Usage

Add a common class to any element that you would like to control. I personally user the class ```puppet```. This makes it really simple to target those elmeents with a call to the $.fn.puppeteer method like so

```
$('.puppet').puppeteer()
```

Bam! You're done.

Okay, not really. There is a little more you will need to do. Each puppet element will need to define a few things.

1. The setup class
2. The action class
3. Its persistance on screen after the action class is applied
4. How much of the element should be on screen before action class is applied

### The Setup Class

This CSS class will define how the element should appear on screen when the page loads. Typically, this class will set the starting position and opacity of the element. Here's an example.

```
.get-ready {
	opacity: 0;
	transition: none;
	transform: translateX(-80px)
}
```

### The Action Class

The action CSS class will define what should happen when the class is applied to the element.

```
.lights-camera-action {
	transition: transform 0.5s, opacity 0.5s;
	transform: translateX(0px);
	opacity: 1;
}
```

### Persistance

You have 2 options here, true or false. If you set persistance to true, the element will remain in the final state defined in your action class. If you set this to false (which is the default), then the element will be reverted to the setup state.

### How much of the element should be visible

Because applying the action class as soon as a single pixel of the element scrolls into the viewport doesn't make a lot of sense, you can specify the percentage of the element that should be in the viewport before the action class is applied. This can be any number between 0 (as soon as it appears) to 1 (the bottom of the element is above the bottome of the viewport).

If you use a fraction (0.2) it will be converted to a percentage. ```0.2``` also hapens to be the default, meaning about 20% of the element will need to be in the viewport before the action class is applied.

### Ways to Apply Your Settings

Telling the Puppeteer about these settings can be done in several ways. If you are building a simple site where all the elements will use the same CSS classes and persistance you can add those options when calling the ```$.fn.puppeteer``` method.

```
$('.puppet').puppeteer({
  setupClass         : 'get-ready'
, actionClass        : 'lights-camera-action'
, persistOnScreen    : true
, onScreenPercentage : 0.5
});
```

If, however, you would like to have more control over each element then you can use data attributes.

```
&lt;div class='puppet' 
      data-setup-class='get-ready' 
      data-action-class='lights-camera-action' 
      data-persist-on-screen='true'
      data-on-screen-percentage='0.8'></div>
```

## Examples

Basic Example #1

Basic Example #2

Advanced Example