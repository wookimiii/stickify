/***
 * Stickify jQuery UI plugin
 * by Andrew Kim (@wookimiii)
 */
(function( $ ){
    var spacerClass = "ui-scrollie-spacer";
    var scrollieClass = "ui-scrollie"
    $.widget( "ui.stickify", {
        options: {
            scrolling: false,
            shadow: true,
            offset: 0 // in pixels
        },

        _create: function(){
            $(this.element).addClass(scrollieClass).bind("windowScroll", {wdgt:this}, this.onScroll);
            $(window).scroll({wdgt:this}, function(e){
                $(e.data.wdgt.element).trigger("windowScroll");
            });
        },

        onScroll: function(e){
            var wdgt = e.data.wdgt;
            var elemOffset = wdgt.element.position().top;
            if(wdgt.options.scrolling){ elemOffset = wdgt.element.prev().position().top; }
            if(window.pageYOffset >= (elemOffset - wdgt.options.offset) ){
                wdgt.scrollify();
            }else{
                wdgt.descrollify();
            }
        },

        scrollify: function(){
            this.options.scrolling = true;
            if(!this.element.prev().hasClass(spacerClass)){
                this.createCopy();
                if (this.options.shadow) this.element.addClass("ui-scrollie-shadow");
            }
            this.element.width(this.element.prev().width());
        },

        createCopy: function(){
            $("<div></div>").insertBefore(this.element).addClass(spacerClass).css({height:this.element.outerHeight()});
            this.element.css({position:"fixed", top: this.options.offset, height: this.element.height()});
        },

        descrollify: function(){
            this.options.scrolling = false;
            if(this.element.prev().hasClass(spacerClass)){
                this.removeCopy();
                if (this.options.shadow) this.element.removeClass("ui-scrollie-shadow");
            }
        },

        removeCopy: function(){
            this.element.prev().remove();
            this.element.css({position:"", top: this.options.offset});
        }

  });
})( jQuery );
