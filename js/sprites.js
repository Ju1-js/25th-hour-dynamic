/* Credit to Collin Henderson @ AstralApp.com */

(function() {
  var WIDTH, HEIGHT, canvas, con, g;
  var pxs = [];
  var rint = 50;

  $.fn.sprites = function () {
    this.append($('<canvas id="sprites"></canvas>'));
    setup(this);
  }

  function setup (container) {
    var windowSize = function() {
      WIDTH = container.innerWidth();
      HEIGHT = container.innerHeight();
      canvas = container.find('#sprites');
      canvas.attr('width', WIDTH).attr('height', HEIGHT);
    };

    windowSize();

    $(window).resize(function() {
      windowSize();
    });

    con = canvas[0].getContext('2d');

    for (var i = 0; i < 100; i++) {
      pxs[i] = new Circle();
      pxs[i].reset();
    }

    requestAnimationFrame(draw);
  }

  function draw () {
    con.clearRect(0, 0, WIDTH, HEIGHT);
    con.globalCompositeOperation = "lighter";

    for (var i = 0; i < pxs.length; i++) {
      pxs[i].fade();
      pxs[i].move();
      pxs[i].draw();
    }

    requestAnimationFrame(draw);
  }

  var date = new Date;
  var seconds = ((date.getHours() * 3600) + (offset * 3600) + (date.getMinutes() * 60) + date.getSeconds());
  $('#sky')[0].setCurrentTime(seconds);
  $('#reflection')[0].setCurrentTime(seconds);
  $('#landscape')[0].setCurrentTime(seconds);
  $('#landscape, .land, #bottom, .stags, .stag, .counter:before, #lensFlare, .sunMask, .clouds svg, .suncrane, .sun:before, .twinkles, .spriteWrap').css('animation-delay', '-' + seconds + 's');
  $('#stars, #starReflection').css('animation-delay', '-' + seconds * 2 + 's');
  //$('head').append('<style id="befores">.sun:before{animation-delay:' + seconds + 's;} .counter:before{animation-delay:' + seconds + 's;}</style>');
  setInterval(function() {
	  seconds = ((date.getHours() * 3600) + (offset * 3600) + (date.getMinutes() * 60) + date.getSeconds());
	  //$('#befores').remove();
	  //$('body').append('<style id="befores">.sun:before{animation-delay:' + seconds + 's;} .counter:before{animation-delay:' + seconds + 's;}</style>');
	  $('#sky')[0].setCurrentTime(seconds);
	  $('#reflection')[0].setCurrentTime(seconds);
	  $('#landscape')[0].setCurrentTime(seconds);
	  $('#landscape, .land, #bottom, .stags, .stag, .counter:before, #lensFlare, .sunMask, .clouds svg, .suncrane, .sun:before, .twinkles, .spriteWrap').css('animation-delay', '-' + seconds + 's');
	  $('#stars, #starReflection').css('animation-delay', '-' + seconds * 2 + 's');
  }, 1000);

  function Circle() {
    this.s = {
      ttl: 15000,
      xmax: 5,
      ymax: 2,
      rmax: 7,
      rt: 1,
      xdef: 960,
      ydef: 540,
      xdrift: 4,
      ydrift: 4,
      random: false,
      blink: true
    };

    this.reset = function() {
      this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
      this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
      this.r = ((this.s.rmax - 1) * Math.random()) + 1;

      this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
      this.dy = (Math.random() * this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);

      this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
      this.rt = Math.random() * this.hl;

      this.stop = Math.random() * 0.2 + 0.4;

      this.s.rt = Math.random() + 1;
      this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
      this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    };

    this.fade = function() {
      this.rt += this.s.rt;
    };

    this.draw = function() {
      var newo, cr;

      if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) {
        this.s.rt = this.s.rt * -1;
      }
      else if (this.rt >= this.hl) {
        this.reset();
      }

      newo = 1 - (this.rt / this.hl);

      con.beginPath();
      con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      con.closePath();

      cr = this.r * newo;

      g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
      g.addColorStop(0.0, 'rgba(193,254,254,' + newo + ')');
      g.addColorStop(this.stop, 'rgba(193,254,254,' + (newo * 0.2) + ')');
      g.addColorStop(1.0, 'rgba(193,254,254,0)');

      con.fillStyle = g;
      con.fill();
    };

    this.move = function() {
      this.x += (this.rt / this.hl) * this.dx;
      this.y += (this.rt / this.hl) * this.dy;
      if (this.x > WIDTH || this.x < 0) this.dx *= -1;
      if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    };

    this.getX = function() {
      return this.x;
    };

    this.getY = function() {
      return this.y;
    };
  };
  })();

$('.spriteWrap').sprites();
