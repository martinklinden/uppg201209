/* Includes: */
var http = require('http');
var url = require('url');
var fs = require('fs');

/* Register server: */
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    //console.log(filename);
    //console.log(q.pathname);
    //console.log(q.host);
    //console.log(q.search);
    var qdata = q.query;
    //console.log(qdata.x);
    //console.log(qdata.y);
    //console.log(qdata.op);
    var calcOrPara = "My paragraph."

    fs.readFile(filename, function (err, data) {
        if (err) {
            if (q.pathname == "/compute") {
                var answer;
                if (qdata.op == "plus") {
                    answer = +qdata.x + +qdata.y; //stackoverflow (How to add two string as if they were numbers? [duplicate])
                    //console.log(answer);
                    calcOrPara = qdata.x + " " + qdata.op + " " + qdata.y + " equals " + answer;
                }
                else if (qdata.op == "minus") {
                    answer = qdata.x - qdata.y;
                    //console.log(answer);
                    calcOrPara = qdata.x + " " + qdata.op + " " + qdata.y + " equals " + answer;
                }
                else if (qdata.op == "times") {
                    answer = qdata.x * qdata.y;
                    //console.log(answer);
                    calcOrPara = qdata.x + " " + qdata.op + " " + qdata.y + " equals " + answer;
                }
            }
            /*
            else if (q.pathname == "/test") {
                console.log("fucking test");
                console.log(2 + 2);
            }
            */
            res.writeHead(200, { 'Content-Type': 'text/html' });
           // res.write("<!DOCTYPE html >");
            res.write("<html>");
            res.write("<head>");
            res.write("<title>");
            res.write(req.url);
            res.write("</title>");
            res.write("</head>");
            res.write("<body>");
            res.write("<h1>");
            res.write(req.url);
            res.write("</h1>");
            res.write("<p>");
            res.write(calcOrPara);
            res.write("</p>");
            res.write("</body>");
            res.write("</html>");
            console.log("Serving " + req.url);
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);