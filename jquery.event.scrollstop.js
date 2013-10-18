/*--------------------------------------------------------------------------*
 *  
 *  jQuery scrollstop event
 *  
 *  MIT-style license. 
 *  
 *  2012 Kazuma Nishihata 
 *  http://www.to-r.net
 *  http://blog.webcreativepark.net/2012/09/06-152317.html
 *  
 *--------------------------------------------------------------------------*/
jQuery.event.special.scrollstop = {
	setup : (function(){
		var timer,self = this;
		return function(){
			//Android 4.0 has issuue for touchend
			//http://code.google.com/p/android/issues/detail?id=19827
			if("ontouchend" in window && !/Android 4.0/.test(navigator.userAgent)){
				$("body").bind("touchend",function(){
					$(window).bind("scroll.scrollstop",scrollstop);
				});
			}else{
				$(window).load(function(){
					setTimeout(function(){
						$(window).bind("scroll",scrollstop);
					},200);
				});
			}

			function scrollstop(){
				if(timer)clearTimeout(timer);
				timer = setTimeout(function(){

					$(self).trigger("scrollstop");
					if("ontouchend" in window && !/Android 4.0/.test(navigator.userAgent)){
						$(window).unbind("scroll.scrollstop");
					}
				},200); 
			}
		}
	})()
}