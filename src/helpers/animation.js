import anime from 'animejs';

export function logoHover(el) {
  this.DOM = {};
  this.DOM.el = el;
  this.DOM.stack = this.DOM.el.querySelector('.stack');
  this.DOM.stackItems = [].slice.call(this.DOM.stack.children);
  this.DOM.logo = this.DOM.el.querySelector('.up-logo');
  this._initEvents();
}

logoHover.prototype.constructor = logoHover;

logoHover.prototype._initEvents = function() {
  let self = this;
  this._mouseenterFn = function() {
    anime.remove(self.DOM.logo);
    anime.remove(self.DOM.stackItems);
    self._in();
  };
  this._mouseleaveFn = function() {
    anime.remove(self.DOM.logo);
    anime.remove(self.DOM.stackItems);
    self._out();
  };
  this.DOM.el.addEventListener('mouseenter', this._mouseenterFn);
  this.DOM.el.addEventListener('mouseleave', this._mouseleaveFn);
};

logoHover.prototype._in = function() {
  anime({
    targets: this.DOM.stackItems,
    translateZ: {
      value: function(target, index) {
        return index*10;
      },
      duration: 800,
      easing: 'easeOutExpo',
      delay: 200
    },
    opacity: {
      value: function(target, index, cnt) {
        return index !== cnt - 1 ? [0,0.1*index+0.1] : 1;
      },
      duration: 1,
      easing: 'linear',
      delay: 200
    },
    translateY: [
      {
        value: function(target, index) {
          return -40;
        },
        duration: 800,
        delay: 200,
        elasticity: 300
      }
    ],
    scaleY: [
      {
        value: 0.8,
        duration: 200,
        easing: 'easeOutExpo'
      },
      {
        value: 1,
        duration: 800,
        elasticity: 300
      }
    ],
    scaleX: [
      {
        value: 1.1,
        duration: 200,
        easing: 'easeOutExpo'
      },
      {
        value: 1,
        duration: 800,
        elasticity: 300
      }
    ]
  });

  anime({
    targets: this.DOM.logo,
    duration: 900,
    easing: 'easeOutExpo',
    delay: 200,
    scale: 0.2
  });
};

logoHover.prototype._out = function() {
  anime({
    targets: this.DOM.stackItems,
    duration: 800,
    easing: 'easeOutElastic',
    translateZ: 0,
    opacity: function(target, index, cnt) {
      return index !== cnt - 1 ? 0 : 1;
    },
    translateY: 0
  });

  anime({
    targets: this.DOM.logo,
    duration: 800,
    easing: 'easeOutElastic',
    scale: 1
  });
};