(function( $ ){
	var spacerClass = "ui-scrollie-spacer";
	var scrollieClass = "ui-scrollie"
  $.widget( "ui.stickify", {
		options: {
			scrolling: false
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
			if(window.pageYOffset >= elemOffset ){
				wdgt.scrollify();
			}else{
				wdgt.descrollify();
			}
			
		},
		scrollify: function(){
			this.options.scrolling = true;
			if(!this.element.prev().hasClass(spacerClass)){
				this.createCopy();
				this.element.addClass("shadow");
			}
			this.element.width(this.element.prev().width());
		},
		createCopy: function(){
			$("<div></div>").insertBefore(this.element).addClass(spacerClass);
			this.element.css({position:"fixed", top:0, height: this.element.height()});
		},
		descrollify: function(){
			this.options.scrolling = false;
			if(this.element.prev().hasClass(spacerClass)){
				this.removeCopy();
				this.element.removeClass("shadow");
			}
		},
		removeCopy: function(){
			this.element.prev().remove();
			this.element.css({position:"", top:0});
		}

  });
})( jQuery );