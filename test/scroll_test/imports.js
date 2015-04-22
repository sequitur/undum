var $ = require('jquery'),
    view = require('../../lib/view.js');

var outputEvent = {
method: 'write',
output: `
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis <span id="replaceme">aute</span> irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum
</p>
` };

window.generateContent = function generateContent () {
  view.receive(outputEvent);
};

window.generateLongContent = function generateLongContent () {
  view.receive([outputEvent, outputEvent, outputEvent, outputEvent, outputEvent]);
};

window.replaceEvent = function replaceEvent () {
  view.receive({
    method: 'replaceWith',
    output: '<span>foo</span>',
    selector: '#replaceme'
  });
};

$(function () {
  $("#content_wrapper, #legal").show();
  $("#tools_wrapper").show();
});