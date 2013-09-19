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

    $ make example

License
---

MIT