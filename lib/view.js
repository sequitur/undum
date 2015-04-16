var $ = require('jquery');

var view = {
  receive (event) {
    var {method, output} = event;
    if (this[method]) this[method](output);
  },

  write (output) {
    $('#content').append(output);
  },

}

module.exports = view;