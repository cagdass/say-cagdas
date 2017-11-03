express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();

let getIndex = function(len) {
    let first_index = Math.floor(Math.random() * 3);
    if (first_index < 2) {
        return 0;
    }
    else {
        return 1 + Math.floor(Math.random()*(l-1));
    }
}

let base_dir = "/usr/share/nginx/html/say-cagdas/assets/";
let filenames = ["1.mp3", "2.mp3"];

app.get('/', function (request, response) {
    let fpath = base_dir + filenames[getIndex(filenames.length)];
    let filestream = fs.createReadStream(fpath);
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
