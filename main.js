$(document).ready(function () {

    //Navbar resize
    $(window).scroll(function() {
      if ($(document).scrollTop() > 325) {
        $('nav').removeClass('hidden');
      }
      else {
      	$('nav').addClass('hidden');
      }
    });

  });