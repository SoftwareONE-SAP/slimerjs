var request = require('request'),
    unzip = require('unzip'),
    fs    = require('fs'),
    lib   = require('./index.js'),
    loc   = 'http://download.slimerjs.org/releases/'+ lib.version +'/slimerjs-'+ lib.version +'.zip';

console.log(lib);

try {
  var stats = fs.lstatsSync(lib.path);
  if (stats.isDirectory()) {
    return;
  }
} catch (e) {}

/**
 * Download, Pipe and extract.
 */
request(loc).pipe(unzip.Extract({path: "."})).on('response', function(response) {
  console.log("Response Code %s", response.statusCode);
}).on('finish', function() {
  //fs.chmodSync(lib.bin, '755');
}).on('error', function(err) {
  console.error(err)
})