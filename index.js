var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var jade = require('jade');
var server = http.createServer(app);
var io = require('socket.io')(server);
var T = require('twit');
var q = "twitter";
var twit = new T({
    // Add own Twitter credentials here:
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});

//console.log('io ', io);

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/page', function (req, res) {
    //res.sendFile(__dirname + '/index.html');
    res.render('index', {type:req.query.type});
});

server.listen(3002, function () {
    console.log('listening on *:3002');
});
io.on('connection', function (socket) {
    console.log('connection ', socket);
    var stream;
    start();
    stream.on('tweet', function (tweet) {
        console.log('tweet');
        io.emit('tweet', tweet);
    });

    io.emit('message', {
        for: 'everyone'
    });
    socket.on("newquery", function (newquery) {
        q = newquery;
        start();
    });

    function start() {
        console.log("start ", q);
        stream = null;
        stream = twit.stream('statuses/filter', {
            track: [q]
        });
        io.emit('query', q);
    }
});
