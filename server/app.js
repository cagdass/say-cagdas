express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

app.get('/', function (request, response) {
    // Change laters.
    let fpath = "/Users/cagdas/work/side/say-cagdas/server/assets/kv.mp3";
    var filestream = fs.createReadStream(fpath);
    filestream.on('open', function() {
        var stats = fs.statSync(fpath);
        var fileSizeInBytes = stats["size"];
        response.writeHead(200, {
            "Accept-Ranges": "bytes",
            'Content-Type': 'audio/mpeg',
            'Content-Length': fileSizeInBytes});
        filestream.pipe(response);
    });
})

app.listen(3009, function () {
  console.log('Example app listening on port 3009!')
})
