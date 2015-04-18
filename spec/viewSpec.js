'use strict';

require('jasmine-jquery');

var
  view = require('../lib/view.js'),
  $ = require('jquery');

describe('view', function () {

  beforeEach(function () {
    setFixtures(window.__html__['spec/fixtures/filledContentFixture.html']);
  });

  describe('output events', function () {

    it('receives clear content events', function () {
      view.receive({
        method: 'clear'
      });

      expect($('#content')).toBeEmpty();
    });

    it('receive clear events with a selector', function () {
      view.receive({
        method: 'clear',
        selector: '.test'
      });

      expect($('#content')).toContainHtml('<p class="test"></p>');
    });

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

    it('appends when a selector is passed to write', function () {
      setFixtures(window.__html__['spec/fixtures/filledContentFixture.html']);
      view.receive({
        method: 'write',
        output: '<p>bar</p>',
        selector: '.test'
      });

      expect($('#content')).toContainHtml('<p class="test">foo</p><p>bar</p>');
    });

    it('writes at the top of #content when there is no selector', function () {
      view.receive({
        method: 'writeBefore',
        output: '<p>foo</p>'
      });
      view.receive({
        method: 'writeBefore',
        output: '<p>bar</p>',
      });

      expect($('#content')).toContainHtml('<p>bar</p><p>foo</p>');
    });

    it('writes before a selector with writeBefore', function () {
      setFixtures(window.__html__['spec/fixtures/filledContentFixture.html']);
      view.receive({
        method: 'writeBefore',
        output: '<p>bar</p>',
        selector: '.test'
      });

      expect($('#content')).toContainHtml('<p>bar</p><p class="test">foo</p>');
    });

  });

});