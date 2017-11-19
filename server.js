// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

const puppeteer = require('puppeteer');

//keep track of how times clients have clicked the button
var clickCount = 0;

app.use(express.static(__dirname + '/')); 
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/src/client/index.html');
});

io.on('connection', function(client) { 
	console.log('Client connected...'); 
	//when the server receives clicked message, do this
    client.on('clicked', function(data) {
          clickCount++;
		  //send a message to ALL connected clients
          io.emit('buttonUpdate', clickCount);
    });

    client.on('changeHtml', function(data) {
        //send a message to ALL connected clients
        io.emit('changeTitle');
    });

    client.on('test', function(data) {
    //send a message to ALL connected clients
        io.emit('runTest');
        puppeterTest();
    });

    client.on('commanTest', function(data) {
        //send a message to ALL connected clients
            io.emit('shellTest');
            commandTest();
        });
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 

function puppeterTest() {
    (async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://example.com');
        await page.waitFor(5000);
        
        await page.screenshot({path: 'test/screenshot/example.png'});
      
        await browser.close();
      })();
}

function commandTest() {
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
    // executes `pwd`
    child = exec("ls -la", function (error, stdout, stderr) {
        console.log(`${stdout}`);
        console.log(`${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
  }