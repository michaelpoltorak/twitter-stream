
var socket = io(),
    oldcoord = [100, 100];
//var container = document.getElementById("b");


function setup() {
    if(type === 'sunshine') {
        sunshine();
        //rain();
    }
    if(type === 'rain') {
        rain();
    }
}
/*socket.on('query', function (q) {
    var queryEl = document.getElementById("q");
    queryEl.value = q;
    queryEl.onblur = function() {
        console.log("blur");
        socket.emit("newquery", document.getElementById("q").value);
    }

});*/
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
