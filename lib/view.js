var $ = require('jquery');

var view = {
  receive (event) {
    var {method, output, selector} = event;
    if (this[method]) this[method](output, selector);
  },

  clear (output, selector) {
    if (selector) {
      $(selector).empty();
    }
    else {
      $('#content').empty();
    }
  },

  write (output, selector) {
    if (selector) {
      $(selector).after(output);
    }
    else {
      $('#content').append(output);
    }
  },

  writeBefore (output, selector) {
    if (selector) {
      $(selector).before(output);
    }
    else {
      $('#content').prepend(output);
    }
  },

}

module.exports = view;