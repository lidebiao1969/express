var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable");
var picname;
function start(response) {
  console.log("Request handler 'start' was called.");

  var body =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    "</form>" +
    "</body>" +
    "</html>";

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("upload called");
  var form = new formidable.IncomingForm();
  console.log(form);
  console.log("about to parse");
  form.parse(request, function (error, fields, files) {
    console.log("parsing done");
    picname = files.upload.name;
    // fs.renameSync(files.upload.path, "./tmp/test.jpg");
    var readStream = fs.createReadStream(files.upload.path);
    var writeStream = fs.createWriteStream("./tmp/" + files.upload.name);
    readStream.pipe(writeStream);
    readStream.on("end", function () {
      fs.unlinkSync(files.upload.path);
    });

    response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    response.write("received image:<br/>" + picname + "<br/>");
    response.write("<img src='/showpic' />");
    response.end();
  });
}
function listUsers(response) {
  fs.readFile(__dirname + "/" + "hotmovie.json", "utf8", function (err, data) {
    console.log(data);
    response.end(data);
  });
}
function showpic(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, { "Content-Type": "image/jpg" });
  //response.setHeader("Content-Type", contentType);
  //格式必须为 binary 否则会出错
  var url = "./tmp/" + picname;
  var content = fs.readFileSync(url, "binary");
  //response.writeHead(200, "Ok");
  response.write(content, "binary"); //格式必须为 binary，否则会出错
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.showpic = showpic;
exports.listUsers = listUsers;
