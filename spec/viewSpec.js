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

      expect($('#content')).toContainHtml('<p class="new">foo</p>');
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

      expect($('#content')).toContainHtml('<p class="">foo</p><p class="new">bar</p>');
    });

    it('appends when a selector is passed to write', function () {
      view.receive({
        method: 'write',
        output: '<p>bar</p>',
        selector: '.test'
      });

      expect($('#content')).toContainHtml('<p class="test">foo</p><p class="new">bar</p>');
    });

    it('writes at the top of #content when no selector is given to writeBefore', function () {
      view.receive({
        method: 'writeBefore',
        output: '<p>foo</p>'
      });
      view.receive({
        method: 'writeBefore',
        output: '<p>bar</p>',
      });

      expect($('#content')).toContainHtml('<p class="new">bar</p><p class="">foo</p>');
    });

    it('writes before a selector with writeBefore', function () {
      view.receive({
        method: 'writeBefore',
        output: '<p>bar</p>',
        selector: '.test'
      });

      expect($('#content')).toContainHtml('<p class="new">bar</p><p class="test">foo</p>');
    });

    it('inserts with writeInto', function () {
      view.receive({
        method: 'writeInto',
        output: '<span>bar</span>',
        selector: '.test'
      });

      expect($('#content')).toContainHtml('<p class="test">foo<span class="new">bar</span></p>');
    });

    it('replaces with replaceWith', function () {
      view.receive({
        method: 'replaceWith',
        output: '<p>bar</p>',
        selector: '.test'
      });

      expect($('#content')).not.toContainHtml('<p class="test">foo</p>');
      expect($('#content')).toContainHtml('<p class="new">bar</p>');
    });

    it('adds the .new class to newly-created DOM elements', function () {
      view.receive({
        method: 'write',
        output: '<p>bar</p><p>baz</p>',
      });

      expect($('#content')).toContainHtml('<p class="new">bar</p><p class="new">baz</p>');
    });

    it('accepts a list of output events', function () {
      view.receive([
        {
          method: 'write',
          output: '<p>bar</p>'
        },
        {
          method: 'write',
          output: '<p>baz</p>'
        }]);

      expect($('#content')).toContainHtml('<p class="new">bar</p><p class="new">baz</p>');
    });

  });

  describe('clearNew', function () {

    it('removes the .new class from elements', function () {
      view.receive({
        method: 'write',
        output: '<p>bar</p>'
      });

      expect($('#content')).toContainHtml('<p class="new">bar</p>');

      view.receive({
        method: 'write',
        output: '<p>baz</p>'
      });

      expect($('#content'))
        .toContainHtml('<p class="">bar</p><p class="new">baz</p>');
    });

  });

});