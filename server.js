var http = require('http'),
  fs = require('fs'),
  filed = require('filed'),
  request = require('request'),
  hogan = require('hogan.js'),
  template = hogan.compile(fs.readFileSync('./template.html.mu', 'utf-8'));

http.createServer(function(req,res){
  var pathname = req.url;
  if (req.url === '/') { pathname = '/index.html' }
  if (pathname === '/fiddle' && req.method === 'POST') {
    req.pipe(request('http://localhost:5984/fiddle')).pipe(res);
  } else if (/^\/fiddle\//.test(pathname) && req.method === 'PUT') {
    req.pipe(request.put('http://localhost:5984' + pathname)).pipe(res);
  } else if (/^\/fiddle\//.test(pathname) && req.method === 'GET') {
    // merge html css and js into doc and return.
    request('http://localhost:5984' + pathname, {json: true}, function(e,r,b){
      if(e) { 
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(e.message);
        return;
      }
      var foo = template.render(b);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(foo);
    });
  } else {
    filed(__dirname + pathname).pipe(res);
  }
}).listen(3000);