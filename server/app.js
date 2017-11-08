express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');

const config = require("./config.js");
const base_dir = config.tracks_dir;
const port = config.port;

let ips = [];

let getIndex = function(len) {
  let first_index = Math.floor(Math.random() * 5);
  if (first_index < 2) {
    return 0;
  }
  else {
    return 1 + Math.floor(Math.random()*(len-1));
  }
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/', function (request, response) {
  let { uid } = request.body;
  if (uid != undefined) {
    let ind = ips.indexOf(uid);
    if (ind == -1) {
      ips.push(uid);
      let ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
      fs.readdir(base_dir, (err, filenames) => {
        let fpath = base_dir + filenames[getIndex(filenames.length)];
        let filestream = fs.createReadStream(fpath);
        var d = new Date();
        d.setTime(d.getTime() + d.getTimezoneOffset()*60*1000 );
        console.log(`Serving file: ${fpath}. Request from ${ip} Time ${d}`);
        filestream.on('open', function() {
          fs.stat(fpath, (err, stats) => {
            let fileSizeInBytes = stats["size"];
            response.writeHead(200, {
              "Accept-Ranges": "bytes",
              'Content-Type': 'audio/mpeg',
              'Content-Length': fileSizeInBytes});
            filestream.pipe(response);
            setTimeout(function(){
              ind = ips.indexOf(uid);
              ips.splice(ind, 1);
            }, 2000)

          });
        });
      })
    }
    else {
      response.status(418).send("Sorry but I am a teapot");
    }
  }
})

app.listen(port, function () {
  console.log(`Audio file provider listening on port ${port}`);
})
