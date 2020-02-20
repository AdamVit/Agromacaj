<!-- Header manipulation -->
$(function(){
	$(document).scroll ( function() {
		$("nav").toggleClass("scrolled", $(this).scrollTop() > $("nav").height());
		$("nav.fixed-top").toggleClass("navbar-dark", $(this).scrollTop() > $("nav").height());
	});
});
	