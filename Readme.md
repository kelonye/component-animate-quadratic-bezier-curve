Install
---

    $ component install kelonye/component-animate-quadratic-bezier-curve

Usage
---

```javascript

  var canvas = document.createElement('canvas');
  canvas.width = 300.5;
  canvas.height = 300.5;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#aaa';
  ctx.moveTo(20.5, 200.5);
  ctx.quadraticCurveTo(140.5, 20.5, 280.5, 280.5);
  ctx.stroke();

  var animation = require('component-animate-quadratic-bezier-curve');
  animation(20.5, 200.5, 140.5, 20.5, 280.5, 280.5)
    .ease(function(t, b, c, d) {
      t /= d;
      return c*t*t*t*t*t + b;
    })
    .color('deepskyblue')
    .draw(canvas);


```

So,

```javascript

  var canvas = document.createElement('canvas');
  canvas.width = 300.5;
  canvas.height = 300.5;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  ctx.moveTo(20.5, 200.5);
  ctx.quadraticCurveTo(140.5, 20.5, 280.5, 280.5);
  ctx.stroke();

```

yields ...

![](https://dl.dropbox.com/u/30162278/component-animate-quadratic-bezier-curve-a.png)

then,

```javascript

  var animation = require('component-animate-quadratic-bezier-curve');
  animation(20.5, 200.5, 140.5, 20.5, 280.5, 280.5)
    .ease(function(t, b, c, d) {
      t /= d;
      return c*t*t*t*t*t + b;
    })
    .color('deepskyblue')
    .draw(canvas);

```

yields ...

![](https://dl.dropbox.com/u/30162278/component-animate-quadratic-bezier-curve-b.png)


Example
---

See [demo](http://component.herokuapp.com/#/5415b98b0d29961900b7fdcb)

    $ make example

## Api

### animation(ax, ay, bx, by, cx, cy)

  Initialize a new Animation with `ax`, `ay`, `bx`, `by`, `cx` and`cy` as

  ```javascript
  ctx.moveTo(ax, ay);
  ctx.quadraticCurveTo(bx, by, cx, cy);
  ```

### Animation#ease(function)

  Apply easing `function`. For example,

  ```javascript
    var animation = require('component-animate-quadratic-bezier-curve');
    animation(20.5, 200.5, 140.5, 20.5, 280.5, 280.5)
      .ease(function(t, b, c, d) {
        t /= d;
        return c*t*t*t*t*t + b;
      })
      .color('deepskyblue')
      .draw(canvas);
  ```

### Animation#color(string)

  Set the stroke style, which the animation will use

### Animation#draw(canvas)

  Initialize animation using `canvas` properties

License
---

MIT