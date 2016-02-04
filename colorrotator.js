/**
 * Package: ColorRotator
 * URL:     http://products.askupasoftware.com/color-rotator/
 * Version: 1.0.0
 * Date:    2016-02-04
 * License: GNU GENERAL PUBLIC LICENSE
 *
 * Developed by Askupa Software http://www.askupasoftware.com
 */
(function ( $ ) {
    
    /**
     * The constructor
     * 
     * @param {DOMElement} selection
     * @param {object} options
     */
    function ColorRotator( selection, options )
    {
        this.setOptions( options );
        this.$selection = $( selection );
        this.currentColor = 0;
        this.init();
    }
    
    ColorRotator.defaults = {
        colors:     [],
        property:   '',
        delay:      500,
        random:     false,
        easing:     'linear'
    };
    
    /**
     * Plugin's methods. 
     * In all methods, the 'this' keyword is pointing to the calling instance of ColorRotator.
     */
    ColorRotator.methods = {
        start: function(){
            this.start();
        },
        stop: function(){
            this.stop();
        },
        update: function( args ){
            var options = args[0];
            this.stop();
            this.setOptions( options );
            this.currentColor = 0;
            this.init();
        },
        colors: function( args ){
            var func = args[0];
            func.call(null, this.settings.colors);
        }
    };
    
    /**
     * Check if a given string represents a supported method
     * @param {string} method
     */
    ColorRotator.methodExists = function( method )
    {
        return typeof method === 'string' && ColorRotator.methods[method];
    };
    
    /**
     * Set or update this instance's options.
     * @param {object} options
     */
    ColorRotator.prototype.setOptions = function( options ) 
    {
        // If options were already set, update them
        if( typeof this.settings !== 'undefined' )
        {
            this.settings = $.extend({}, this.settings, options);
        }
        // Otherwise, merge them with the defaults
        else
        {
            if( typeof options.colors === 'undefined' ) console.error( "ColorRotator.js error: No colors were specified" );
            this.settings = $.extend({}, ColorRotator.defaults, options);
        }
        
        // Break property into a properties array
        this.settings.properties = this.settings.property.split(' ');
        
        // Convert range to array of colors
        if( $.isPlainObject( this.settings.colors ) ) this.settings.colors = this.rangeToColorArray( this.settings.colors );
    };
    
    /**
     * Set the CSS transition property and start the animation
     */
    ColorRotator.prototype.init = function() 
    {
        this.$selection.css({
            'transition':'all '+this.settings.delay+'ms '+this.settings.easing
        });
        
        this.start();
    };
    
    /**
     * Start rotating colors
     */
    ColorRotator.prototype.start = function() 
    {
        var self = this;
        this.stop();
        this.rotateColor();
        this.interval = setInterval(function(){
            self.rotateColor();
        },this.settings.delay);
    };
    
    /**
     * Stop rotating colors
     */
    ColorRotator.prototype.stop = function() 
    {
        clearInterval(this.interval);
    };
    
    /**
     * Convert a given range to an array of colors
     * @param {object} range {from: Color, to: Color, count: Number}
     * @returns {Array}
     */
    ColorRotator.prototype.rangeToColorArray = function( range ) 
    {
        var colors = [],
            f = new Color( range.from ),
            t = new Color( range.to ),
            m = range.count,
            step = {r:(t.r-f.r)/m,g:(t.g-f.g)/m,b:(t.b-f.b)/m};

        for( var i = 0; i < range.count; i++ )
        {
            // Using bitwise OR with 0 to convert float to int
            var color = "rgb("+[(f.r+i*step.r)|0,(f.g+i*step.g)|0,(f.b+i*step.b)|0].join(',')+")";
            colors.push(color);
        }
        
        return colors;
    }
    
    /**
     * Rotate the color once for every property in this.settings.properties
     */
    ColorRotator.prototype.rotateColor = function() 
    {
        var self = this;

        $.each(this.settings.properties,function(i,prop) {
            if( 'background' === prop ) self.rotateBackgroundColor();
            if( 'shadow' === prop ) self.rotateShadowColor();
            if( 'text' === prop ) self.rotateTextColor();
        });
    };
    
    /**
     * Transition between the current background color to the next
     */
    ColorRotator.prototype.rotateBackgroundColor = function() 
    {
        this.$selection.css({
            'background-color':this.getNextColor()
        });
    };
    
    /**
     * Transition between the current box-shadow color to the next
     */
    ColorRotator.prototype.rotateShadowColor = function() 
    {
        var newShadow = this.$selection.css('box-shadow').replace(/rgba?\([^\)]*\)/g,this.getNextColor());
        this.$selection.css({'box-shadow':newShadow});
    };
    
    /**
     * Transition between the current text color to the next
     */
    ColorRotator.prototype.rotateTextColor = function() 
    {
        this.$selection.css({
            'color':this.getNextColor()
        });
    };
    
    /**
     * Get the next color in the array, or select one randomly (if this.settings.random is set to true)
     */
    ColorRotator.prototype.getNextColor = function() 
    {
        var color,
            count = this.settings.colors.length;
        if( this.settings.random )
        {   var index = this.currentColor;
            while( index === this.currentColor )
                index = Math.floor((Math.random() * count));
            color = this.settings.colors[index];
            this.currentColor = index;
        }
        else
        {
            color = this.settings.colors[this.currentColor++];
            if( this.currentColor === count ) this.currentColor = 0;
        }
        return color;
    };
    
    /**
     * Color object
     * @param {string} colorString Hex|RGB color string
     */
    function Color( colorString )
    {
        if( colorString.indexOf('#') === 0 ) this.parseHex( colorString );
        else this.parseRGB( colorString );
    }
    
    Color.prototype.parseHex = function( hex )
    {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        this.r = parseInt(result[1], 16);
        this.g = parseInt(result[2], 16);
        this.b = parseInt(result[3], 16);
    };
    
    Color.prototype.parseRGB = function( rgb )
    {
        var result = /^rgb\(\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*\)$/i.exec(rgb);
        this.r = parseInt(result[1]);
        this.g = parseInt(result[2]);
        this.b = parseInt(result[3]);
    };
    
    $.fn.colorRotator = function( methodOrOptions ) {
        
        var args = arguments.length > 1 ? Array.apply(null, arguments).slice(1) : null;
        return this.each(function(){
            if( typeof methodOrOptions === 'object' || !methodOrOptions )
            {
                if( typeof $(this).data( 'colorRotator' ) === 'undefined' ) {
                    var plugin = new ColorRotator( this, methodOrOptions );
                    $(this).data( 'colorRotator', plugin );
                }
                else
                {
                    // Update settings if this is not the initial call
                    ColorRotator.methods['update'].call($(this).data('colorRotator'), [methodOrOptions]);
                }
            }
            // If this is a method call, run the method if it exists
            else if( ColorRotator.methodExists( methodOrOptions )  )
            {
                ColorRotator.methods[methodOrOptions].call($(this).data('colorRotator'), args);
            }
        });
    };
 
}( jQuery ));