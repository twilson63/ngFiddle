var http = require('http'),
  fs = require('fs'),
  filed = require('filed'),
  request = require('request'),
  hogan = require('hogan.js'),
  template = hogan.compile(fs.readFileSync('./views/template.html.mu', 'utf-8'));

var COUCH = process.env.COUCH || 'http://localhost:5984';

http.createServer(function(req,res){
  var pathname = req.url;
  if (req.url === '/') { pathname = '/index.html' }
  if (pathname === '/fiddle' && req.method === 'POST') {
    req.pipe(request(COUCH + pathname)).pipe(res);
  } else if (/^\/fiddle\//.test(pathname) && req.method === 'PUT') {
    req.pipe(request.put(COUCH + pathname)).pipe(res);
  } else if (/^\/fiddle\//.test(pathname) && req.method === 'GET') {
    // merge html css and js into doc and return.
    request(COUCH + pathname, {json: true}, function(e,r,b){
      if(e) { 
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(e.message);
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(template.render(b));
    });
  } else {
    filed(__dirname + '/public' + pathname).pipe(res);
  }
}).listen(3000);