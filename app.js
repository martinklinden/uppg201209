/* Includes: */
var http = require('http');
var url = require('url');
var fs = require('fs');

function computePage(adr, qdata, res) {
    var answer = "", computation = "";
    if (qdata.op == "plus") {
        answer = +qdata.x + +qdata.y; //stackoverflow (How to add two string as if they were numbers? [duplicate])
        console.log(answer);
        computation = qdata.x + " + " + qdata.y + " = " + answer;
    }
    else if (qdata.op == "minus") {
        answer = qdata.x - qdata.y;
        console.log(answer);
        computation = qdata.x + " - " + qdata.y + " = " + answer;
    }
    else if (qdata.op == "times") {
        answer = qdata.x * qdata.y;
        console.log(answer);
        computation = qdata.x + " * " + qdata.y + " = " + answer;
    }
    else if (qdata.op == "div") {
        answer = qdata.x / qdata.y;
        console.log(answer);
        computation = qdata.x + " / " + qdata.y + " = " + answer;
    }
    else {
        computation = "ERROR";
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write(" <head>\n");
    res.write("     <title>" + adr + "</title>\n");
    res.write(" </head>\n");
    res.write(" <body>\n");
    res.write("     <h1>" + computation + "</h1>\n");
    res.write(" </body>\n");
    res.write("</html>");
    res.end();
}
/* Register server: */
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var qdata = q.query;

    if (q.pathname == "/compute") {
        computePage(req.url, qdata, res);
    }
    else if (q.pathname == "/calc") {
        fs.readFile("calc.html", function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else {
        fs.readFile("count.html", function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
}).listen(8080);

