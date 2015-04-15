var Situation = require('../lib/situation.js');

describe('Situation', function() {
  var sitch = new Situation();

  it('exports a constructor', function() {
    expect(typeof sitch).toBe('object');
  });

  it('supplies certain methods', function() {
    expect(typeof sitch.enter).toBe('function');
    expect(typeof sitch.exit).toBe('function');
    expect(typeof sitch.act).toBe('function');
    expect(typeof sitch.canView).toBe('function');
    expect(typeof sitch.canChoose).toBe('function');

  });

  describe('enter()', function() {

    it('is a method', function() {
      expect(typeof sitch.enter).toBe('function');
    });

    it('defaults to returning an empty object', function() {
      expect(sitch.enter()).toEqual({});
    });

    it('calls an _enter() method if one exists', function() {
      var sitch_ = new Situation({
        enter () {return {correct: true};}
      });
      expect(sitch_.enter()).toEqual({correct: true});
    });

    it('returns an _enter object if one exists', function() {
      var sitch_ = new Situation({
        enter: {correct: true}
      });
      expect(sitch_.enter()).toEqual({correct: true});
    });

    it('passes arguments ahead to _enter()', function() {
      var sitch_ = new Situation({
        enter (character, previous) {
          return [character, previous];
        }
      }),
        character = {name: 'bob'},
        previous = 'start';

      expect(sitch_.enter(character, previous))
        .toEqual([character, previous]);
    });

  });

describe('exit()', function() {

  it('is a method', function() {
    expect(typeof sitch.exit).toBe('function');
  });

  it('defaults to returning an empty object', function() {
    expect(sitch.exit()).toEqual({});
  });

  it('calls an _exit() method if one exists', function() {
    var sitch_ = new Situation({
      exit () {return {correct: true};}
    });
    expect(sitch_.exit()).toEqual({correct: true});
  });

  it('returns an _exit object if one exists', function() {
    var sitch_ = new Situation({
      exit: {correct: true}
    });
    expect(sitch_.exit()).toEqual({correct: true});
  });

  it('passes arguments ahead to _exit()', function() {
    var sitch_ = new Situation({
      exit (character, next) {
        return [character, next];
      }
    }),
      character = {name: 'bob'},
      next = 'start';

    expect(sitch_.exit(character, next))
      .toEqual([character, next]);
  });

});

  describe('act()', function() {

    it('is a method', function() {
      expect(typeof sitch.act).toBe('function');
    });

    it('defaults to returning an empty object', function() {
      expect(sitch.act()).toEqual({});
    });

    it('calls an _act() method if one exists', function() {
      var sitch_ = new Situation({
        act () {return {correct: true};}
      });
      expect(sitch_.act()).toEqual({correct: true});
    });

    it('passes ahead the details of the action', function() {
      var sitch_ = new Situation({
        act (character, action) {
          return [character, action];
        }
      });
      expect(sitch_.act({name: 'Jim'}, 'eat')).toEqual([{name: 'Jim'}, 'eat']);
    });

  });

  describe('canView()', function() {
    it('is a method', function() {
      expect(typeof sitch.act).toBe('function');
    });

    it('defaults to returning true', function () {
      expect(sitch.canView()).toBe(true);
    });

    it('returns _canView if it exists', function () {
      var sitch_ = new Situation({
        canView: false
      });
      expect(sitch_.canView()).toBe(false);
    });

    it('calls _canView if it is a function', function () {
      var sitch_ = new Situation({
        canView () {return 'correct'}
      });
      expect(sitch_.canView()).toBe('correct');
    });

    it('passes a character argument on to _canView', function () {
      var sitch_ = new Situation({
        canView (char) {return char;}
      }),
        char = {correct: true};

      expect(sitch_.canView(char)).toBe(char);
    });

  });

  describe('canChoose()', function () {
    it('is a method', function () {
      expect(typeof sitch.act).toBe('function');
    });

    it('defaults to returning true', function () {
      expect(sitch.canChoose()).toBe(true);
    });

    it('returns _canChoose if it exists', function () {
      var sitch_ = new Situation({
        canChoose: false
      });
      expect(sitch_.canChoose()).toBe(false);
    });

    it('calls _canChoose if it is a function', function () {
      var sitch_ = new Situation({
        canChoose () {return 'correct'}
      });
      expect(sitch_.canChoose()).toBe('correct');
    });

    it('passes a character argument on to _canChoose', function () {
      var sitch_ = new Situation({
        canChoose (char) {return char;}
      }),
        char = {correct: true};

      expect(sitch_.canChoose(char)).toBe(char);
    });

  });

  describe('tags', function () {
    var sitch_empty = new Situation({}),
        sitch_full = new Situation({tags: ['foo']});

    it('is an array', function () {
      expect(Array.isArray(sitch.tags)).toBe(true);
    });

    it('supplies default values', function () {
      expect(sitch.tags).toEqual([]);
      expect(sitch_empty.tags).toEqual([]);
    });

    it('takes a value from the spec', function () {
      expect(sitch_full.tags).toEqual(['foo']);
    });

  });

  describe('choiceData', function () {
    var sitch_empty = new Situation({});

    it('is an object', function () {
      expect(typeof sitch.choiceData).toBe('object');
      expect(typeof sitch_empty.choiceData).toBe('object');
    });

    it('returns certain defaults', function () {
      expect(sitch.choiceData).toEqual({
        priority: 1,
        frequency: 1,
        displayOrder: 1
      });
      expect(sitch_empty.choiceData).toEqual({
        priority: 1,
        frequency: 1,
        displayOrder: 1
      });
    });

    it('allows its values to be set in the constructor', function () {
      var sitch_ = new Situation({
        priority: 2,
        frequency: 100,
        displayOrder: 3,
        tags: ['data']
      });

      expect(sitch_.choiceData).toEqual({
        priority: 2,
        frequency: 100,
        displayOrder: 3
      });
    });

    it ('uses defaults if only some properties are defined', function () {
      var sitch_ = new Situation({priority: 2});

      expect(sitch_.choiceData).toEqual({
        priority: 2,
        frequency: 1,
        displayOrder: 1
      });
    });

  });

});