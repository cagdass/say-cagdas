express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const config = require("./config.js");

const app = express();

let getIndex = function(len) {
    let first_index = Math.floor(Math.random() * 3);
    if (first_index < 2) {
        return 0;
    }
    else {
        return 1 + Math.floor(Math.random()*(len-1));
    }
}

let base_dir = config.tracks_dir;
let filenames = config.tracks;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (request, response) {
    let fpath = base_dir + filenames[getIndex(filenames.length)];
    let filestream = fs.createReadStream(fpath);
    console.log(`Serving file: ${fpath}`);
    filestream.on('open', function() {
        let stats = fs.statSync(fpath);
        let fileSizeInBytes = stats["size"];
        response.writeHead(200, {
            "Accept-Ranges": "bytes",
            'Content-Type': 'audio/mpeg',
            'Content-Length': fileSizeInBytes});
        filestream.pipe(response);
    });
})

app.listen(3009, function () {
  console.log('Audio file provider listening on port 3009');
})
