// Website Alert





(function($){
  
  function closeDropdowns(){
      $('#pure-fix-link').next().removeClass('dropped');
      $('#pure-fix-link').removeClass('hovered');
      $('#city-link').next().removeClass('dropped');
      $('#city-link').removeClass('hovered');
      $('#road-link').next().removeClass('dropped');
      $('#road-link').removeClass('hovered');
      $('#track-link').next().removeClass('dropped');
      $('#track-link').removeClass('hovered');
      $('#kids-link').next().removeClass('dropped');
      $('#kids-link').removeClass('hovered');
      $('#cruisers-link').next().removeClass('dropped');
      $('#cruisers-link').removeClass('hovered');
  }

  
  $(function(){

    // Cache nav
    var utilityNav = $("#utility-nav");

    // Add class to submenu parents and show drop-down
    utilityNav.find("li").each(function() {
      if ($(this).find("ul").length > 0) {
        //show subnav on hover
        $(this).mouseenter(function() {
          $(this).addClass('hovered').has("ul").stop(true, true).css('visibility','visible');
        }).mouseleave(function() {
          $(this).removeClass('hovered').has("ul").stop(true, true).css('visibility','visible');
        });
      }
    });

    

    $('#main-header').waypoint(function(){
      $("#brand").toggleClass('fixed fadeInDown');
    },{offset: -150});

    $('#pure-fix-link').click(function(e) {
      if ($(this).next().hasClass('dropped')) {
        closeDropdowns();
      } else {
		closeDropdowns();
      	$(this).next().toggleClass('dropped');
      	$(this).toggleClass('hovered');
      }
      e.preventDefault();
    });
    
    $('#city-link').click(function(e) {
      if ($(this).next().hasClass('dropped')) {
        closeDropdowns();
      } else {
		closeDropdowns();
      	$(this).next().toggleClass('dropped');
      	$(this).toggleClass('hovered');
      }
      e.preventDefault();
    });
    
    $('#road-link').click(function(e) {
      if ($(this).next().hasClass('dropped')) {
        closeDropdowns();
      } else {
		closeDropdowns();
      	$(this).next().toggleClass('dropped');
      	$(this).toggleClass('hovered');
      }
      e.preventDefault();
    });
    
    
    $('#track-link').click(function(e) {
      if ($(this).next().hasClass('dropped')) {
        closeDropdowns();
      } else {
		closeDropdowns();
      	$(this).next().toggleClass('dropped');
      	$(this).toggleClass('hovered');
      }
      e.preventDefault();
    });
    
    $('#kids-link').click(function(e) {
      if ($(this).next().hasClass('dropped')) {
        closeDropdowns();
      } else {
		closeDropdowns();
      	$(this).next().toggleClass('dropped');
      	$(this).toggleClass('hovered');
      }
      e.preventDefault();
    });
    
    $('#cruisers-link').click(function(e) {
      closeDropdowns();
      $(this).next().toggleClass('dropped');
      $(this).toggleClass('hovered');
      e.preventDefault();
    });
    
    
    
    $('#blog-link').click(function(e) {
      if ($(this).next().hasClass('dropped')) {
        closeDropdowns();
      } else {
		closeDropdowns();
      	$(this).next().toggleClass('dropped');
      	$(this).toggleClass('hovered');
      }
      e.preventDefault();
    });
    

    $('.fancybox').fancybox({
      openEffect: 'elastic',
      closeEffect: 'elastic'
    });

    $('.fancybox-media').fancybox({
      openEffect: 'elastic',
      closeEffect: 'elastic',
      aspectRatio: true,
      helpers: {
        media : {},
        title : null
      },
      width       : 800,
      height      : 450,
      aspectRatio : true,
      scrolling   : 'no'
    });

    var isMobileMenuOpen = false;

    function closeMobileMenu(){
      $('#mobile-menu-toggle').removeClass('opened');
      $('body').removeClass('menu-opened');
      isMobileMenuOpen = false;
    }

    function openMobileMenu(){
      $('html, body').stop().animate({scrollTop: 0}, 0);
      $('body').addClass('menu-opened');
      $('#mobile-menu-toggle').addClass('opened');
      isMobileMenuOpen = true;
    }

    $('#mobile-menu-toggle').click(function() {
      if (isMobileMenuOpen){
        closeMobileMenu();
      }
      else {
        openMobileMenu();
      }
      return false;
    });
    $('#mobile-menu li.has-dropdown').mouseenter(function(){
      $('ul', this).stop(true, true).slideDown();
    }).mouseleave(function(){
      $('ul', this).stop(true, true).slideUp();
    });

    var jRes = jRespond([
      {
        label: 'mobile',
        enter: 0,
        exit: 959
      },{
        label: 'desktop',
        enter: 960,
        exit: 10000
      }
    ]);

    // register enter and exit functions for multiple breakpoints and functions
    jRes.addFunc([
      {
        breakpoint: 'desktop',
        enter: function() {
          closeMobileMenu();
          $("#main-header").waypoint('enable');
        },
        exit: function() {
        }
      },
      {
        breakpoint: 'mobile',
        enter: function() {
          $('#brand').removeClass('fixed fadeInDown');
          $('#main-header').waypoint('disable');
        },
        exit: function() {
          if ($(window).scrollTop() > 150){
            $('#brand').addClass('fixed fadeInDown');
          }
          $("#main-header").waypoint('enable');
          closeMobileMenu();
        }
      }
    ]);

    // Swaps images for retina version on HD devices
    $('img[data-retina]').retina({
      dataRetina: true,
      checkIfImageExists: false
    });

    // Setting Up Global Variables to be used in JS - Denotes which template is which so JavaScript is used only on proper templates
    var BODY     	      	  = $('body'),
        IS_INDEX              = (BODY.hasClass('index-template')) ? true : false,
        IS_COLLECTION         = (BODY.hasClass('collection-template')) ? true : false,
        IS_COLLECTION_LISTING = ($('#collections-id').length > 0) ? true : false,
        IS_PRODUCT            = (BODY.hasClass('product-template')) ? true : false,
        IS_BLOG               = (BODY.hasClass('blog-template')) ? true : false,
        IS_ARTICLE            = (BODY.hasClass('article-template')) ? true : false,
        IS_SEARCH             = (BODY.hasClass('search-template')) ? true : false,
        IS_CART               = (BODY.hasClass('cart-template')) ? true : false;


    if (IS_INDEX == false){
      // Search Autocomplete
      /*
      var cache = {};
      $('#search-input').autocomplete({
        source: function( request, response ) {
          if (request.term in cache) {
            response(cache[request.term]);
            return;
          }
          $.ajax({
            url: "/search",
            data: {
            q: "*" + request.term + "*",
            type: "product",
            view: "json",
          },
                 dataType: "json",
                 success: function( data ) {
            if (data.length) {
              cache[request.term] = data;
            }
            if (data.length > 6) {
              $('.ui-autocomplete').show();
            } else {
              $('.ui-autocomplete').hide();
            }
            response(data);
          }
        });
      },
      minLength: 2,
      focus: function(event, ui) {
        $('div.autoprod').removeClass('ui-state-focus');
        $('#autoprod' + ui.item.id).addClass('ui-state-focus');
      },
        select: function( event, ui ) {
          window.location = ui.item.url;
        },
      }).data( 'ui-autocomplete' )._renderItem = function(ul, item) {
        var elemHTML = '<div id="autoprod' + item.id +'" class="autoprod"><div class="autoimg"><img src="' + item.thumb + '" class="autothumb" /></div><div class="autotext"><h5 class="autotitle">' + item.label + '</h5><a href="' + item.collection_url + '" class="autocollection">' + item.type + '</a><span class="autoprice">' + item.price +'</span></div>';
        return $( '<li class="ui-menu-item" role="presentation">').append(elemHTML).appendTo(ul);
      };

      $(window).on('resize', function(){
        $('#_search-input').blur().val('');
      });
	*/
    }

    if (IS_INDEX) {

    var swiper = new Swiper('#billboard', {
      pagination: '#billboard .swiper-pagination',
      paginationClickable: true,
      prevButton: '#billboard .swiper-button-prev',
      nextButton: '#billboard .swiper-button-next',
      autoplay: 6500,
      loop: true,
      parallax: false
    });
    
   
//     $(window).scroll(function() {
//       var yPos = -($(window).scrollTop() / 7); /* Lower the number more drastic the image movement  */
//       $sldImg.css("top", yPos + 'px');
//     });

    $('.product').imagesLoaded(function(){
      $('#loading-animation').remove();
    }).waypoint(function(){
      $(this).addClass('fadeIn');
    },{offset: '75%'});

    $('#search-toggle').on('click',function(){
      $(this).toggleClass('icon-search icon-remove');
      $('#search-home').toggleClass('shown');
      $('#main-nav').toggleClass('active-search');
    });

  }

  if (IS_COLLECTION_LISTING) {
    $('.product').imagesLoaded(function(){
      //$('#loading-animation').remove();
      $('.product').addClass('fadeIn');
    });
  }

  if (IS_CART) {
    
    $(".cart-row").swipe({
      swipeLeft:function(event, direction, distance, duration, fingerCount) {
        $(this).addClass('swiped');
      },
      swipeRight:function(event, direction, distance, duration, fingerCount) {
        $(this).removeClass('swiped');
      },
      threshold:30
    });
    
    $('.product').imagesLoaded(function(){
      //$('#loading-animation').remove();
      $('.product').addClass('fadeIn');
    });
  }
  
  if (IS_PRODUCT) {
    if ($( "#olapic_specific_widget" ).hasClass( "olapic_items_0" )) {
  		$( "#olapic-wrapper").hide();
	}

  }

});
})(jQuery)