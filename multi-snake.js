var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(8080, function(){
	console.log('listening on *:8080');
});

//start app
var host = false;

io.on('connection', function(socket){
    if(!host){
        host = true;
        socket.emit('host');
    }
    console.log('a user connected');
    socket.on('key', function(e){
        console.log(e);
    });
});