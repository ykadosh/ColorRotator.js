/**
 * Package: ColorRotator
 * URL:     http://products.askupasoftware.com/color-rotator/
 * Version: 1.0.0
 * Date:    2016-02-01
 * License: GNU GENERAL PUBLIC LICENSE
 *
 * Developed by Askupa Software http://www.askupasoftware.com
 */
(function ( $ ) {
 
    function colorRotator( $selection, options )
    {
        this.settings = $.extend(colorRotator.defaults, options);
        this.$selection = $selection;
        this.currentColor = 0;
        this.init();
    }
    
    colorRotator.defaults = {
        colors: [],
        property: "background",
        repeat: true,
        delay: 500,
        random: false,
        easing: 'linear'
    };
    
    colorRotator.prototype.init = function() 
    {
        var self = this;
        this.interval = setInterval(function(){
            self.rotateBackground();
        },this.settings.delay);
    };
    
    colorRotator.prototype.rotateBackground = function() 
    {
        this.$selection.css({
            'transition':'all '+this.settings.delay+'ms '+this.settings.easing,
            'background-color':this.getNextColor()
        });
    };
    
    colorRotator.prototype.getNextColor = function() 
    {
        var color,
            count = this.settings.colors.length;
        if( this.settings.random )
        {   var index = this.currentColor;
            while( index === this.currentColor )
                index = Math.floor((Math.random() * count));
            color = this.settings.colors[this.currentColor];
            this.currentColor = index;
        }
        else
        {
            color = this.settings.colors[this.currentColor++];
            if( this.currentColor === count ) this.currentColor = 0;
        }
        return color;
    };
    
    $.fn.colorRotator = function( options ) {
 
       return new colorRotator( this, options );
 
    };
 
}( jQuery ));