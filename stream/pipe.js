var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream("./static/美女1.png");

// 创建一个可写流
var writerStream = fs.createWriteStream("./static/美女2.png");

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
