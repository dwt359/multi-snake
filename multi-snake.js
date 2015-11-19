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
var players = 0;
var playerList = [];

io.on('connection', function(socket){
    if(!host){
        host = true;
        socket.emit('host');
    }
    socket.emit('player', players);
    if(players < 4) {
        playerList.push({
            num: players,
            pos: {
                x: 10 * (players + 1),
                y: 0
            },
            dir: 'down',
            len: 3,
            color: randomColor()
        });
    }
    players++;
    io.emit('playerList', playerList);
    console.log('a user connected');
    socket.on('key', function(e){
        console.log(e);
    });
});

//functions
function randomColor(){
    var colors = ['red', 'green', 'blue', 'orange', 'purple'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    for(var i in playerList){
        if(playerList[i].color == color){
            color = randomColor();
        }
    }
    return color;
}