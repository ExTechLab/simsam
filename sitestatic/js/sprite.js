// Generated by CoffeeScript 1.6.2
(function() {
  var GenericSprite, Interaction, Rule, SpriteFactory, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  GenericSprite = (function(_super) {
    __extends(GenericSprite, _super);

    GenericSprite.prototype._rules = [];

    function GenericSprite(spriteId) {
      var shapeParams;

      this.spriteId = spriteId;
      shapeParams = {
        x: 10,
        y: 10,
        width: 100,
        height: 50,
        fill: 'black',
        strokeWidth: 0,
        offset: [50, 25]
      };
      Kinetic.Image.call(this, shapeParams);
    }

    GenericSprite.prototype.applyRules = function(environment) {
      var rule, _i, _len, _ref, _results;

      _ref = this._rules;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        _results.push(rule.act(this, environment));
      }
      return _results;
    };

    GenericSprite.prototype.addRule = function(rule) {
      this._rules.push(rule);
      return this._rules.length - 1;
    };

    GenericSprite.prototype.setRule = function(index, rule) {
      if (this._rules[index] !== void 0) {
        return this._rules[index] = rule;
      } else {
        throw Error("The rule index " + index + " doesn't exist.");
      }
    };

    GenericSprite.prototype.applyTransform = function(transform) {
      var scale;

      this.setX(this.getX() + transform.dx);
      this.setY(this.getY() + transform.dy);
      this.rotate(transform.dr);
      scale = this.getScale();
      return this.setScale(scale.x * transform.dxScale, scale.y * transform.dyScale);
    };

    return GenericSprite;

  })(Kinetic.Image);

  SpriteFactory = function(spriteType, imageId) {
    var Sprite, _ref;

    Sprite = (function(_super) {
      __extends(Sprite, _super);

      function Sprite() {
        _ref = Sprite.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Sprite.prototype.spriteType = spriteType;

      Sprite.prototype.imageId = imageId;

      return Sprite;

    })(GenericSprite);
    return Sprite;
  };

  Rule = (function() {
    function Rule() {}

    Rule.prototype.setTransform = function(transform) {
      var defaultTransform, p, v;

      defaultTransform = {
        dx: 0,
        dy: 0,
        dr: 0,
        dxScale: 1,
        dyScale: 1
      };
      for (p in defaultTransform) {
        v = defaultTransform[p];
        if (!(p in transform)) {
          transform[p] = v;
        }
      }
      return this.transform = transform;
    };

    Rule.prototype.act = function(sprite, environment) {
      return sprite.applyTransform(this.transform);
    };

    return Rule;

  })();

  Interaction = (function(_super) {
    __extends(Interaction, _super);

    function Interaction() {
      _ref = Interaction.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Interaction.prototype.setEnvironment = function(requiredEnvironment) {
      this.requiredEnvironment = requiredEnvironment;
    };

    Interaction.prototype.act = function(sprite, environment) {
      var minCount, shouldAct, spriteType, _ref1;

      shouldAct = true;
      _ref1 = this.requiredEnvironment;
      for (spriteType in _ref1) {
        minCount = _ref1[spriteType];
        if (!(spriteType in environment)) {
          shouldAct = false;
        } else if (environment[spriteType] < minCount) {
          shouldAct = false;
        }
      }
      if (shouldAct) {
        return sprite.applyTransform(this.transform);
      }
    };

    return Interaction;

  })(Rule);

  window.spriteList = [];

  window.tick = function() {
    var sprite, _i, _len;

    for (_i = 0, _len = spriteList.length; _i < _len; _i++) {
      sprite = spriteList[_i];
      sprite.applyRules();
    }
    return window.layer.draw();
  };

  window.init = function() {
    var moveDown, moveRight, spin, stretchy;

    window.Star = SpriteFactory('Star');
    window.starA = new Star('A');
    spriteList.push(starA);
    layer.add(starA);
    stage.add(layer);
    moveRight = new Rule();
    moveRight.setTransform({
      dx: 10
    });
    Star.prototype.addRule(moveRight);
    moveDown = new Rule();
    moveDown.setTransform({
      dy: 10
    });
    Star.prototype.addRule(moveDown);
    spin = new Rule();
    spin.setTransform({
      dr: Math.PI / 6
    });
    Star.prototype.addRule(spin);
    stretchy = new Rule();
    stretchy.setTransform({
      dyScale: 1.1
    });
    return Star.prototype.addRule(stretchy);
  };

}).call(this);
