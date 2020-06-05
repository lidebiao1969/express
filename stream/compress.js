var fs = require("fs");
var zlib = require("zlib");

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream("./static/input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("./static/input.txt.gz"));

console.log("文件压缩完成。");
