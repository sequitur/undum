var $ = require('jquery');

/*
Most methods that add more content to the page go through this generic
function. We add the .new class to every element written, both because
matching those elements will be used to correctly center the screen after
a write, and because the class itself can be highlighted to make newly-added
text more visible.
*/
var performWriteEvent = function (output, selector, withSelector, noSelector) {
  if  (selector) {
    let elem = $(selector);
    elem[withSelector]($(output).addClass('new'));
  }
  else {
    $('#content')[noSelector]($(output).addClass('new'));
  }
};

var clearNew = function () {
  $('.new').removeClass('new');
};

var scrollTopTo = function (value) {
  $('html,body').animate({scrollTop: value}, 500);
};

var scrollBottomTo = function (value) {
  scrollTopTo(value - $(window).height());
};

/*
Here there be dragons

Re-centers the vertical scrolling on the page, so that all .new elements are
in sight (if they fit), or so that the first one is at the top of the page
(if they don't).

This code is by nature untestable; the only way to make sure it's working is
testing it by hand. A testing sandbox, scroll_test, exists to for that.
*/
var centerView = function () {
  var
    $new = $('.new'),
    viewHeight = $(window).height(),
    newTop, newBottom, newHeight;

  if ($new.length === 0) return;

  newTop = $new.first().offset().top,
  newBottom = $new.last().offset().top + $new.last().height(),
  newHeight = newBottom - newTop;

  if (newHeight > (viewHeight - 100)) {
    scrollTopTo(newTop-100);
  }
  else {
    scrollBottomTo(newBottom+100);
  }
};

/* A module (container) for all of the write methods. */
var view = {

  // FIXME: Selectors matching multiple objects will currently only hit the
  // first one.

  clear (output, selector) {
    var elem;
    if (selector) elem = $(selector);
    else elem = $('#content');
    elem.empty();
  },

  write (output, selector) {
    performWriteEvent(output, selector, 'after', 'append');
  },

  writeBefore (output, selector) {
    performWriteEvent(output, selector, 'before', 'prepend');
  },

  writeInto (output, selector) {
    performWriteEvent(output, selector, 'append', 'append');
  },

  replaceWith (output, selector) {
    performWriteEvent(output, selector, 'replaceWith', 'replaceWith');
  }

}

module.exports.receive = function (event) {
  var eventList;
  if (!Array.isArray(event)) eventList = [event];
  else eventList = event;
  clearNew();

  eventList.forEach(function (eventObject) {
    var {method, output, selector} = eventObject;
    if (view[method]) view[method](output, selector);
  });

  centerView();
};