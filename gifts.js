window.onload = function () {
	class Balls {
		constructor(context, buffer) {
			this.context = context;
			this.buffer = buffer;
		}
		setup() {
			this.gainNode = this.context.createGain();
			this.source = this.context.createBufferSource();
			this.source.buffer = this.buffer;
			this.source.connect(this.gainNode);
			this.gainNode.connect(this.context.destination);
			this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
		}
		play() {
			this.setup();
			this.source.start(this.context.currentTime);
		}
		stop() {
			var ct = this.context.currentTime + 1;
			this.gainNode.gain.exponentialRampToValueAtTime(.1, ct);
			this.source.stop(ct);
		}
	}

	class Buffer {
		constructor(context, urls) {
			this.context = context;
			this.urls = urls;
			this.buffer = [];
			this.getBuffer();
		}
		loadSound(url, index) {
			let request = new XMLHttpRequest();
			request.open('get', url, true);
			request.responseType = 'arraybuffer';
			let thisBuffer = this;
			request.onload = function () {
				thisBuffer.context
					.decodeAudioData(request.response, function (buffer) {
						thisBuffer.buffer[index] = buffer;
						if (index === thisBuffer.urls.length - 1) {
							thisBuffer.loaded();
						}
					});
			};
			request.send();
		};
		getBuffer() {
			this.urls.forEach((url, index) => {
				this.loadSound(url, index);
			})
		}
		loaded() {
			loaded = true;
		}
		getSound(index) {
			return this.buffer[index];
		}
	}

	let balls = null,
		preset = 0,
		loaded = false;
	let sounds = []
	for (let i = 1; i<=36; i++) {
		sounds.push('./assets/sounds/sound1.mp3')
	}
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	let context = new AudioContext();

	function playBalls() {
		let index = parseInt(this.dataset.note) + preset;
		balls = new Balls(context, buffer.getSound(index));
		balls.play();
	}

	function stopBalls() {
		balls.stop();
	}

	let buffer = new Buffer(context, sounds);
	let buttons = document.querySelectorAll('.b-ball_bounce');
	buttons.forEach(button => {
		button.addEventListener('mouseenter', playBalls.bind(button));
		button.addEventListener('mouseleave', stopBalls);
	})

	function ballBounce(e) {
		var i = e;
		if (e.className.indexOf(" bounce") > -1) {
			return;
		}
		toggleBounce(i);
	}

	function toggleBounce(i) {
		i.classList.add("bounce");

		function n() {
			i.classList.remove("bounce")
			i.classList.add("bounce1");

			function o() {
				i.classList.remove("bounce1")
				i.classList.add("bounce2");

				function p() {
					i.classList.remove("bounce2")
					i.classList.add("bounce3");

					function q() {
						i.classList.remove("bounce3");
					}
					setTimeout(q, 200)
				}
				setTimeout(p, 200)
			}
			setTimeout(o, 200)
		}
		setTimeout(n, 200)
	}

	var array1 = document.querySelectorAll('.b-ball_bounce')
	var array2 = document.querySelectorAll('.b-ball_bounce .b-ball__right')

	for (var i = 0; i < array1.length; i++) {
		array1[i].addEventListener('mouseenter', function () {
			ballBounce(this)
		})
	}

	for (var i = 0; i < array2.length; i++) {
		array2[i].addEventListener('mouseenter', function () {
			ballBounce(this)
		})
	}

	let l = ["49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187", "81", "87", "69", "82", "84", "89", "85", "73", "79", "80", "219", "221", "65", "83", "68", "70", "71", "72", "74", "75", "76", "186", "222", "220"];
	let k = ["90", "88", "67", "86", "66", "78", "77", "188", "190", "191"];
	let a = {};
	for (let e = 0, c = l.length; e < c; e++) {
		a[l[e]] = e
	}
	for (let e = 0, c = k.length; e < c; e++) {
		a[k[e]] = e
	}

	document.addEventListener('keydown', function (j) {
		let i = j.target;
		if (j.which in a) {
			let index = parseInt(a[j.which]);
			balls = new Balls(context, buffer.getSound(index));
			balls.play();
			let ball = document.querySelector('[data-note="' + index + '"]');
			toggleBounce(ball);
		}
	});

}