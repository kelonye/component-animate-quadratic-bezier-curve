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
  ctx.moveTo(20.5, 200.5);
  ctx.quadraticCurveTo(140.5, 20.5, 280.5, 280.5);
  ctx.stroke();
  
  var animation = require('component-animate-quadratic-bezier-curve');
  animation(20.5, 200.5, 140.5, 20.5, 280.5, 280.5)
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
    .color('deepskyblue')
    .draw(canvas);

```

yields ...

![](https://dl.dropbox.com/u/30162278/component-animate-quadratic-bezier-curve-b.png)


Example
---

See [demo](http://component-kelonye.rhcloud.com/#/523b52ff8acdd27159000005)

    $ make example

## Api

### animation([number,...])

  Initialize a new Animation with `ax`, `ay`, `bx`, `by`, `cx` and`cy` as

  ```javascript
  ctx.moveTo(ax, ay);
  ctx.quadraticCurveTo(bx, by, cx, cy);
  ```

### Animation#color(string)

  Set the stroke style, which the animation will use

### Animation#draw(canvas)

  Initialize animation using `canvas` properties

License
---

MIT