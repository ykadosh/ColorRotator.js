# color-rotator
This plugin uses CSS3 transitions to smoothly animate various CSS color properties (i.e. background color, text color, shadow color etc.) subject to a delay. 
Given a list of colors (in any format acceptible to CSS), the plugin will transition between the colors once or infinitely many times, depending on the settings.
## Example

```javascript
$('#element').colorRotator({
  colors: ['#3498db','#2980b9','#2ecc71','#27ae60'],
  property: 'background',
  delay: 500 // In milliseconds
});
```

## Available Options

* `colors` (*array*) null
* `property` (*string*) null
* `repeat` (*boolean*) true
* `delay` (*number*) 500
* `random` (*boolean*) true
* `easing` (*string*) 'linear'
