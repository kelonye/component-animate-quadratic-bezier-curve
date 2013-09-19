/**
  * Module dependencies
  *
  */

var raf = require('raf');
var inherit = require('inherit');

/**
  * Canvas base fn prototype
  *
  * @api private
  */

function Canvas(){
}

/**
  * Create new canvas with `width` and `height`
  *
  * @param {Number} width
  * @param {Number} height
  * @api public
  */

Canvas.prototype.createCanvas = function(width, height){
  this.el = document.createElement('canvas');
  this.el.className = 'component-animate-quadratic-bezier-curve';
  this.ctx = this.el.getContext('2d');
  this.el.width = width;
  this.el.height = height;
  document.body.appendChild(this.el);
}

/**
  * Grid that sits below the animation
  *
  * @api private
  */

function Grid(){
}

/**
 * Inherits from `Canvas.prototype`.
 */

inherit(Grid, Canvas);

/**
  * Draw the base grid and lines ab, bc on a new canvas
  *
  * @api public
  */

Grid.prototype.draw = function(){
  
  if (this.el) return;
  
  var that = this;
  this.createCanvas(this.parent.canvas.width, this.parent.canvas.height);
  
  // lines
  this.ctx.fillStyle = this.ctx.strokeStyle = this.parent.backgroundStrokeStyle;

  this.ctx.beginPath();
  
  // horizontal
  this.ctx.lineWidth = 1;
  for (var i = 0.5; i < this.el.height; i += 20) {
    this.ctx.moveTo(0.5, i);
    this.ctx.lineTo(this.el.width, i);
  }
  
  // vertical
  for (var i = 0.5; i < this.el.width; i += 20) {
    this.ctx.moveTo(i, 0.5);
    this.ctx.lineTo(i, this.el.height);
  }
 
  // right, bottom borders
  this.ctx.moveTo(this.el.width, 0.5);
  this.ctx.lineTo(this.el.width, this.el.height);
  this.ctx.lineTo(0.5, this.el.height);
  
  // diagonal: joins points a, b, c
  this.ctx.moveTo(this.parent.ax, this.parent.ay);
  this.ctx.lineTo(this.parent.bx, this.parent.by);
  this.ctx.lineTo(this.parent.cx, this.parent.cy);

  // curve
  // this.ctx.moveTo(this.parent.ax, this.parent.ay);
  // this.ctx.quadraticCurveTo(this.parent.bx,this.parent.by, this.parent.cx, this.parent.cy);

  this.ctx.stroke();
  
  // points
  this.ctx.beginPath();
  [
    [this.parent.ax, this.parent.ay],
    [this.parent.bx, this.parent.by],
    [this.parent.cx, this.parent.cy],
  ].forEach(function(set){
    that.ctx.arc(set[0], set[1], 5, 2 * Math.PI, false);
  });
  this.ctx.fill();

}

/**
  * Line joining midpoints of ab, and bc
  *
  * @api private
  */

function Line(){
}

/**
  * Inherits from `Canvas.prototype`.
  */

inherit(Line, Canvas);

/**
  * Draw the line a new canvas
  *
  * @api public
  */

Line.prototype.draw = function(){

  var that = this;

  if (!this.el) this.createCanvas(
    this.parent.canvas.width,
    this.parent.canvas.height
  );
  this.ctx.clearRect(0, 0, this.el.width, this.el.height);
  this.ctx.strokeStyle = this.ctx.fillStyle = this.parent.foregroundStrokeStyle;
  
  // points
  this.ctx.beginPath();
  [
    [this.parent.abx, this.parent.aby],
    [this.parent.bcx, this.parent.bcy]
  ].forEach(function(set){
    that.ctx.arc(set[0], set[1], 5, 2 * Math.PI, false);
  });
  this.ctx.arc(this.parent.tx, this.parent.ty, 5, 2 * Math.PI, false);
  this.ctx.fill();
  
  // join a-b and b-c points
  this.ctx.beginPath();
  this.ctx.lineWidth = 1;
  this.ctx.moveTo(this.parent.abx, this.parent.aby);
  this.ctx.lineTo(this.parent.bcx, this.parent.bcy);
  this.ctx.stroke();
  
}

/**
  * Curve that moves back and forth between a and c
  *
  * @api private
  */

function Curve(){
}

/**
  * Inherits from `Canvas.prototype`.
  */

inherit(Curve, Canvas);

/**
  * Draw the curve on a new canvas
  *
  * @api public
  */

Curve.prototype.draw = function(){
  var that = this;
  if (!this.el){
    this.createCanvas(
      this.parent.canvas.width,
      this.parent.canvas.height
    );
    this.ctx.beginPath();
    this.ctx.moveTo(this.parent.ax, this.parent.ay);
    this.ctx.strokeStyle = this.parent.foregroundStrokeStyle;
  }
  if (this.parent.t > 1 || this.parent.t < 0) {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    this.ctx.beginPath();
  }
  this.ctx.lineTo(this.parent.tx, this.parent.ty);
  this.ctx.stroke();
}


/**
  * Initialize a new Animation with ax, ay, bx, by, cx, cy as 
  *
  * ctx.moveTo(ax, ay);
  * ctx.quadraticCurveTo(bx, by, cx, cy);
  *
  * @api public
  */

function Animation(ax, ay, bx, by, cx, cy){

  if (!(this instanceof Animation)) return new Animation(ax, ay, bx, by, cx, cy);

  var that = this;

  this.ax = ax;
  this.ay = ay;
  this.bx = bx;
  this.by = by;
  this.cx = cx;
  this.cy = cy;
  
  this.grid = new Grid;
  this.line = new Line;
  this.curve = new Curve;

}


/**
  * Set the stroke style, which the animation will use
  *
  * @param {String} color
  * @return {Animation} this
  * @api public
  */

Animation.prototype.color = function(color){
  this.foregroundStrokeStyle = color;
  return this;
};


/**
  * Update the the animation params
  *
  * @api private
  */

Animation.prototype.update = function(){

  this.t = this.t || 0;
  this.direction = this.direction || 1;
  if (this.t > 1 || this.t < 0) {
    this.direction *= -1;
  }
  this.t += 0.01 * this.direction;
  this.abx = this.ax + (this.bx - this.ax) * this.t;
  this.aby = this.ay + (this.by - this.ay) * this.t;
  this.bcx = this.bx + (this.cx - this.bx) * this.t;
  this.bcy = this.by + (this.cy - this.by) * this.t;
  this.tx = this.abx + (this.bcx - this.abx) * this.t;
  this.ty = this.aby + (this.bcy - this.aby) * this.t;

}

/**
  * Initialize animation
  *
  * @api public
  */

Animation.prototype.draw = function(canvas) {
  var that = this;
  canvas.className = 'component-animate-quadratic-bezier-curve';
  var ctx = canvas.getContext('2d');
  this.canvas = canvas;
  this.backgroundStrokeStyle = ctx.strokeStyle || '#ddd';
  this.foregroundStrokeStyle = this.foregroundStrokeStyle || 'deepskyblue';
  (function animate() {
    raf(animate);
    that.update();
    ['grid', 'line', 'curve'].forEach(function(canvas){
      var canvas = that[canvas];
      canvas.parent = canvas.parent || that;
      canvas.draw();
    });
  })();
};

/**
  * Expose `Animation`.
  */

module.exports = Animation;
