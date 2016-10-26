var request = require('request'),
    unzip = require('unzip'),
    fs = require('fs'),
    lib  = require('./index.js');

console.log(lib);

try {
  var stats = fs.lstatsSync(lib.path);
  if (stats.isDirectory()) {
    return;
  }
} catch (e) {
  console.log('installing..')
}

// Fetch http://example.com/foo.gz, gunzip it and store the results in 'out'
request('http://download.slimerjs.org/releases/'+ lib.version +'/slimerjs-'+ lib.version +'.zip').pipe(
  unzip.Extract({
    path: '.',
  })
).on('finish', function() {
  fs.chmodSync('slimerjs-' + lib.version, '755');
});
