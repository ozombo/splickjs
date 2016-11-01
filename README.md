# splickjs
Simple and easily extensible lightweight javascript library. 

# usage
Splick works like jquery but faster and easier to use. 

# Setup the variable for your library:
var $ = function (selector) {
    return new DOM(selector);
};

# Animate a fdiv on click
$("#click-me").click(function(){
    $(this).animate({
            "opacity": 0
        }, 1000);
    });
});
