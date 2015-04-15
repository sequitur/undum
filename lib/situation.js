/* Situation.js */
/* Describes the basic Situation prototype. */

'use strict';

var $ = require('jquery');

var Situation = function (spec) {
  if (spec) {
    if (spec.enter !== undefined) this._enter = spec.enter;
    if (spec.exit !== undefined) this._exit = spec.exit;
    if (spec.act !== undefined) this._act = spec.act;
    if (spec.canView !== undefined) this._canView = spec.canView;
    if (spec.canChoose !== undefined) this._canChoose = spec.canChoose;

    this.tags = spec.tags || [];
    this._frequency = spec.frequency || 1;
    this._priority = spec.priority || 1;
    this._displayOrder = spec.displayOrder || 1;
  }
  else {
    this.tags = [];
    this._frequency = 1;
    this._priority = 1;
    this._displayOrder = 1;
  }

  Object.defineProperty(this, 'choiceData', {
    get () {
      return {
        frequency: this._frequency,
        priority: this._priority,
        displayOrder: this._displayOrder
      };
    }
  });

};

Situation.prototype.enter = function (character, previous) {
  if (this._enter !== undefined) {
    if ($.isFunction(this._enter)) return this._enter(character, previous);
    return this._enter;
  }
  return {};
};

Situation.prototype.exit = function (character, next) {
  if (this._exit !== undefined) {
    if ($.isFunction(this._exit)) return this._exit(character, next);
    return this._exit;
  }
  return {};
};

Situation.prototype.act = function (character, action) {
  if (this._act !== undefined) return this._act(character, action);
  return {};
};

Situation.prototype.canView = function (character) {
  if (this._canView !== undefined) {
    if ($.isFunction(this._canView)) return this._canView(character);
    return this._canView;
  }
  return true;
};

Situation.prototype.canChoose = function (character) {
  if (this._canChoose !== undefined) {
    if ($.isFunction(this._canChoose)) return this._canChoose(character);
    return this._canChoose;
  }
  return true;
};

module.exports = Situation;