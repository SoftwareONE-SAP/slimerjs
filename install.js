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
request(loc).pipe(unzip.Extract({path: "."})).on('finish', function() {
  // Chmod
  fs.chmodSync(lib.bin, '755');
});
