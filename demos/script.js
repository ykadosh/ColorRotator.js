jQuery(document).ready(function(){
    
    // Background color rotation
    $('#bg-color-rotator').colorRotator({
        colors: ['#1abc9c','#16a085','#2ecc71','#27ae60','#3498db','#2980b9'],
        property: 'background',
        random: true
    });
    
    // Shadow color rotation
    $('#shadow-color-rotator').colorRotator({
        colors: ['#1abc9c','#16a085','#2ecc71','#27ae60','#3498db','#2980b9'],
        property: 'shadow',
        random: true
    });
    
    // Text color rotation
    $('#text-color-rotator').colorRotator({
        colors: ['#f1c40f','#f39c12','#e67e22','#d35400','#e74c3c','#c0392b'],
        property: 'text',
        random: true
    });
    
    // Navigation
    $('#color-rotating-navigation li').on('mouseenter',function(){
        var $this = $(this);
        clearTimeout($this.data('timeout'));
        $this.colorRotator({
            colors: ['#1abc9c','#16a085','#2ecc71','#27ae60','#3498db','#2980b9','#9b59b6','#8e44ad','#f1c40f','#f39c12','#e67e22','#d35400'],
            property: 'background',
            random: true,
            delay: 100
        });
        
        // Stop the color rotation after 4 colors (4*100 = 400ms)
        $this.data('timeout', setTimeout(function(){
            $this.colorRotator('stop');
        },400));
    }).on('mouseleave',function(){
        var $this = $(this);
        clearTimeout($this.data('timeout'));
        
        // Rotate 4 colors when the mouse leaves
        $this.colorRotator('start');
        $this.data('timeout', setTimeout(function(){
            // Then bring back the original color
            $this.colorRotator('stop').css({'background-color':'#34495e'});
        },400));
    });
    
    // Color range
    var count = 36;
    $('#color-range').html(function(){
        // Create 36 divs
        var html = '';
        for( var i = 0; i < count; i++ )
            html += '<div>'+(i+1)+'</div>';
        return html;
    }).colorRotator({
        colors: {from: 'rgb(52, 152, 219)', to: 'rgb(211, 84, 0)', count: count},
        property: ''
    }).colorRotator('colors',function(colors){
        $('#color-range div').each(function(i){
            $(this).css({'background-color':colors[i]});
        });
        // For each color in the generated range, paint the corresponding div
    });
});