var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var jade = require('jade');
var server = http.createServer(app);
var io = require('socket.io')(server);
var T = require('twit');
var q = "rain";
var twit = new T({
    consumer_key: 'O3cpdFftDrcS8ziaOdybnuqvd',
    consumer_secret: 'BDGOiX8b5DdEAxYHmdvJa8hCjUS5obhQ6qZuvAeloyOygLNSsF',
    access_token: '2990098401-LQJLJbVUWDjA2wgBn2vMriXx2QkN7lIVO3wrjTg',
    access_token_secret: '5B6mcL4cL5KMSANgzGiLUhWudnIDWCqX6Wq9n6rYxC0ki'
});


app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/page', function (req, res) {
    //res.sendFile(__dirname + '/index.html');
    res.render('index', {type:req.query.type});
});

server.listen(3001, function () {
    console.log('listening on *:3001');
});
io.on('connection', function (socket) {
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
