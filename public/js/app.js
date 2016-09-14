
var socket = io();
console.log('socket ', socket);
// var container = document.getElementById("b");
function setup () {
  console.log('type ', type);
  if (type === 'sunshine') {
    sunshine();
		//rain();
	}
	if (type === 'rain') {
			rain();
	}
	if (type === '') {
		stream();
		var inp = document.getElementById('query');
		inp.addEventListener("blur", function () {
				socket.emit('query-updated', inp.value);
		});

	}
}
function stream () {
	socket.on('tweet', function (tweet) {
		//console.log('tweet ', tweet.text);

		var el = document.getElementById('stream');
		var old = el.innerHTML;
		el.innerHTML = '<div class="tweet">' + tweet.text + '</div>' + old;
	});
}
function rain() {
	console.log('draw rain');
	createCanvas(720, 400);
	stroke(16, 35, 81); // blueish
	fill(102, 14, 14)
	strokeWeight(10);
	var th = 20;
	var arr = [];
	var i = 0;
	//while (i < 5000) {
	socket.on('tweet', function (tweet) {
		console.log('draw tweet');
		//var X = tweet.user.favourites_count;
		var x = tweet.user.friends_count;
		//var y = tweet.user.followers_count;
		var y = tweet.user.favourites_count;
		var Y1 = tweet.user.statuses_count;
		//console.log(i);
		var x = Math.random(500) * 1000;
		var y = Math.random(500) * 1000;
		arr.push({ x: x, y: y });
		if (th > 0) {
			th--;
			line(x, 0, x + 30, y);
		}

		if (th == 0) {
			background(255);
			console.log('th == 0');
			arr.shift();
			var j = 0;
			while (j < arr.length) {

				line(arr[j].x, 0, arr[j].x + 30, arr[j].y);
				j++;
			}
		}
		//console.log('len ', arr.length, arr[arr.length - 1]);
		//i++;
	});
	function updateRain() {

	}
}
function sunshine() {
	console.log('draw sunshine');
	createCanvas(720, 400);
	stroke(255, 204, 0); // yellowish
	fill(255, 204, 0)
	strokeWeight(10);
	socket.on('tweet', function (tweet) {
		console.log('draw tweet');
		//var X = tweet.user.favourites_count;
		var X = tweet.user.friends_count;
		var Y = tweet.user.followers_count;
		var X1 = tweet.user.favourites_count;
		var Y1 = tweet.user.statuses_count;
		background(0);
		ellipse(X, Y, X1, Y1);
		//circle(X);
		oldcoord = [X, Y];
	});
}
