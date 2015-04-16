'use strict';

require('jasmine-jquery');

var
  view = require('../lib/view.js'),
  $ = require('jquery');

describe('view', function () {

  beforeEach(function () {
    setFixtures(window.__html__['spec/fixtures/contentFixture.html']);
  });

  describe('output events', function () {
    it('receives write events', function () {
      view.receive({
        method: 'write',
        output: '<p>foo</p>'
      });

      expect($('#content')).toContainHtml('<p>foo</p>');

    });

    it('adds write events to the bottom', function () {
      view.receive({
        method: 'write',
        output: '<p>foo</p>'
      });
      view.receive({
        method: 'write',
        output: '<p>bar</p>'
      });

      expect($('#content')).toContainHtml('<p>foo</p><p>bar</p>');
    });

  });

});