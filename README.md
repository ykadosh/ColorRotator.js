# color-rotator [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

This plugin uses <strong>CSS3 transitions</strong> to smoothly animate various CSS color properties (i.e. background color, text color, shadow color etc.) subject to a delay.
Given a list of colors (in any format acceptible to CSS), the plugin will transition between the colors once or infinitely many times, depending on the settings.
## Basic Example

```javascript
$('#element').colorRotator({
  colors: ['#3498db','#2980b9','#2ecc71','#27ae60'],
  property: 'background',
  easing: 'linear',
  random: true,
  delay: 500 // In milliseconds
});
```

## Available Options

#### `colors` [array|object]
The <code>color</code> option takes an array of colors in any type supported by CSS (Hex, RGB, RGBA, HSL, HSLA or predefined names), or an object specifying a range.

```javascript
// Colors array
$('#element').colorRotator({
    colors: ['#1abc9c','#16a085','#2ecc71','#27ae60'],
    property: 'background'
});

// Color range
$('#element').colorRotator({
    colors: {
        
        // Only RGB and hexadecimal colors are 
        // supported here
        from: 'rgb(52, 152, 219)',
        to: 'rgb(211, 84, 0)',
        
        // The number of colors to generate 
        // within the given range
        count: 16 
    },
    property: 'background'
});
```
#### `property` [string]
The <code>property</code> option takes a string with one or more properties, separated by space. The color of the given property will change according to the given colors. Supported properties:
* `background` - Changes the background color
* `shadow` - Changes the box-shadow color
* `text` - Changes the font color
```javascript
$('#element').colorRotator({
    colors: [...],
    property: 'background text'
});
```
#### `delay` [number]
The <code>delay</code> option represents the number of milliseconds between each transition.
```javascript
$('#element').colorRotator({
    colors: [...],
    delay: 1200
});
```
#### `random` [boolean]
The <code>random</code> option takes a boolean value. If <code>random</code> is set to true, the colors will be picked randomly from the color pool.
```javascript
$('#element').colorRotator({
    colors: [...],
    random: true
});
```
#### `easing` [string]
The <code>easing</code> option takes a string with one of the CSS3 supported easing functions (see <a href="http://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp">transition-timinig-function</a>).
```javascript
$('#element').colorRotator({
    colors: [...],
    easing: 'linear'
});
```
## Available Methods
#### start()
Continues the color rotation if it was stopped.
```javascript
$('#element').colorRotator('start');
```
#### stop()
Stops the color rotation.
```javascript
$('#element').colorRotator('stop');
```
#### update()
Updates the options with new values.
```javascript
$('#element').colorRotator('update', {/* new options */});
```
#### colors()
Calls a function that takes the colors array as an argument.
```javascript
$('#element').colorRotator('colors',function(colors){
    // Do something with the 'colors' array
});
```
