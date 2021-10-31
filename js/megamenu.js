var breakpoint = 992;

var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>';

jQuery(function ($) {
  "use strict";

  $('.megamenu-root > li:has( > .megamenu-dropdown)').addClass('megamenu-dropdown-icon');
  //Checks if li has sub (ul) and adds class for toggle icon - just an UI


  $('.megamenu-root > li > .megamenu-dropdown:not(:has(ul))').addClass('normal-sub');
  //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)

  $(".megamenu-root").before('<a href="#" class="megamenu-mobile">' + icon + '</a>');

  //Adds megamenu-mobile class (for mobile toggle menu) before the normal menu
  //Mobile menu is hidden if width is more then 959px, but normal menu is displayed
  //Normal menu is hidden if width is below 959px, and jquery adds mobile menu
  //Done this way so it can be used with wordpress without any trouble

  $(".megamenu-root > li").hover(
    function (e) {
      if ($(window).width() > breakpoint) {
        $(this).children(".megamenu-dropdown").fadeIn(150);
        e.preventDefault();
      }
    }, function (e) {
      if ($(window).width() > breakpoint) {
        $(this).children(".megamenu-dropdown").fadeOut(150);
        e.preventDefault();
      }
    }
  );
  //If width is more than 943px dropdowns are displayed on hover


  //the following hides the menu when a click is registered outside
  $(document).on('click', function (e) {
    if ($(e.target).parents('.megamenu-container').length === 0) {
      $(".megamenu-root").removeClass('show-on-mobile');
    }
  });

  $(".megamenu-root > li").click(function () {
    //no more overlapping menus
    //hides other children menus when a list item with children menus is clicked
    var thisMenu = $(this).children(".megamenu-dropdown");
    var prevState = thisMenu.css('display');

    $(".megamenu-root > li > .megamenu-dropdown").fadeOut();

    if ($(window).width() <= breakpoint) {
      if (prevState !== 'block') {
        thisMenu.fadeIn(150);
      }
    }
  });
  //If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

  $(".megamenu-mobile").click(function (e) {
    $(".megamenu-root").toggleClass('show-on-mobile');
    e.preventDefault();
  });
  //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)
});
