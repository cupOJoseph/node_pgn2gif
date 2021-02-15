// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const {spawn} = require('child_process');
const cors = require('cors')
const bodyParser = require('body-parser');
const gifResize = require('@gumlet/gif-resize');
const fs = require('fs');

app.use(bodyParser.json());



// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors())

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/game.gif");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get('/thing', (req, res) => {
 
   var dataToSend;
   // spawn new child process to call the python script
   const python = spawn('python3', ["-u", './pgn2gif_py/script.py', req.body["pgn"], req.body["movesHash"]]);
   // collect data from script
   python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
   });
  
  python.stderr.on('data', (data) => {
   console.log(`error:${data}`);
  });
   // in close event we are sure that stream from child process is closed
   python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send(dataToSend)
   });
});

app.post('/thing', (req, res) => {
  console.log("Pat asked for a gif!")
  
  console.log(req.body);
  
  
   var dataToSend;
   // spawn new child process to call the python script
   const python = spawn('python3', ["-u", './pgn2gif_py/script.py', req.body["pgn"], req.body["movesHash"]]);
   // collect data from script
   python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
     console.log(dataToSend)
   });
  
  python.stderr.on('data', (data) => {
   console.log(`error:${data}`);
  });
   // in close event we are sure that stream from child process is closed
   python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     var gifUrl = __dirname + "/views/game_" + req.body["movesHash"].substring(0,10) + ".gif";
     res.sendFile(__dirname + "/views/game_" + req.body["movesHash"].substring(0,10) + ".gif");
     console.log("sent game: " + req.body["movesHash"].substring(0,10) + ".gif")
     
     
     //check number of files in views/game_...
       //if its more than 50, delete oldest ones
   });
     
});

app.post('/tiny', (req, res) => {
  console.log("===== Called Tiny =====")
  
  var gifUrl = __dirname + "/views/game_" + req.body["movesHash"].substring(0,10) + ".gif";
  
  var dataToSend;
   // spawn new child process to call the python script
   const python = spawn('python3', ["-u", './pgn2gif_py/script.py', req.body["pgn"], req.body["movesHash"]]);
   // collect data from script
   python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
     console.log(dataToSend)
   });
  
  python.stderr.on('data', (data) => {
   console.log(`error:${data}`);
  });
   // in close event we are sure that stream from child process is closed
   python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     var gifUrl = __dirname + "/views/game_" + req.body["movesHash"].substring(0,10) + ".gif";
     //res.sendFile(__dirname + "/views/game_" + req.body["movesHash"].substring(0,10) + ".gif");
     console.log("saved game: " + req.body["movesHash"].substring(0,10) + ".gif")
     
     const buf = fs.readFileSync(gifUrl);
    gifResize({
          width: 240
        })(buf).then(data => {
          console.log("'data' contains processed GIF.");
          
          res.writeHead(200, {'content-type':'image/gif'})
          res.end(data);
        console.log("")
        });
     //check number of files in views/game_...
       //if its more than 50, delete oldest ones
   });
  
  
  
   });
