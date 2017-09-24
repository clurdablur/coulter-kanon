$(document).ready(function () {

    //Navbar resize
    $(window).scroll(function() {
      if ($(document).scrollTop() > 150) {
        $('nav').removeClass('hidden');
      }
      else {
      	$('nav').addClass('hidden');
      }
    });

  });