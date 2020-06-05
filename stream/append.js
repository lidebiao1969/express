let fs = require("fs");
let data = "";
let data2 = "你的小青蛙是真的可爱";
//1.读取流
//创建可读流
let readStream = fs.createReadStream("./static/input.txt");
//设置utf-8编码
readStream.setEncoding("UTF8");
//处理流事件
readStream.on("data", (chunk) => (data += chunk));
readStream.on("end", () => writeS(data));
readStream.on("error", (err) => console.log(err.strck));
console.log("程序1执行完毕");
//2.写入流
//创建可写流
let writeS = (dataS) => {
  let writeStream = fs.createWriteStream("./static/outInput.txt");
  //使用utf-8写入流
  writeStream.write(data2 + dataS, "UTF8");
  //标记文件末尾
  writeStream.end();
  //处理事件流
  writeStream.on("finish", () => console.log("写入完成"));
  writeStream.on("error", (err) => console.log(err.stack));
  console.log("程序2执行完毕");
};
