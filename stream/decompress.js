var fs = require("fs");
var zlib = require("zlib");

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream("./static/input.txt.gz")
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream("./static/input2.txt"));

console.log("文件解压完成。");
