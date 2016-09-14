var express, app, http, path, jade, server, io, T, q, config, twit;

express = require('express');
app = express();
http = require('http');
path = require('path');
jade = require('jade');
server = http.createServer(app);
io = require('socket.io')(server);
T = require('twit');
config = require('./config/config.js');
q = 'twitter';

twit = new T({
    consumer_key:config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
});

io.on('connection', function (socket) {
    var stream;
    console.log('Got connection to client');
    socket.on('disconnect', function () {
        console.log('Client disconnected.');
    });
    start();
    stream.on('tweet', function (tweet) {
        //console.log('tweet');
        io.emit('tweet', tweet);
    });

    socket.on("query-updated", function (query) {
        console.log('query-updated ', query);
        q = query;
        stream.stop();
        start();
    });
    
    function start() {
        console.log("Starting twitter streaming for keyword: ", q);
        //stream = null;
        stream = twit.stream('statuses/filter', {
            track: [q]
        });
        io.emit('query', q);
    }
});

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/page', function (req, res) {
    //res.sendFile(__dirname + '/index.html');
    res.render('index', { type: req.query.type });
});

server.listen(3000, function () {
    console.log('listening on *:3000');
});

