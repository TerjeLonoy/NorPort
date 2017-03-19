var fs = require('fs')
var archiver = require('archiver');
var archive = archiver('zip');

var fileName = 'archive.zip'
var fileOutput = fs.createWriteStream(fileName);

fileOutput.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.pipe(fileOutput);
archive.glob("../node_modules/**/*");
archive.glob("./index.js");

archive.on('error', function(err){
  throw err;
});
archive.finalize();