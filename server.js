var http = require('http'),
  filed = require('filed');

http.createServer(function(req,res){
  var pathname = req.url;
  if (req.url === '/') { pathname = '/index.html' }
  if (pathname === '/fiddle' && req.method === 'POST') {
    req.pipe(process.stdout)
    res.end('foobar!');
  } else {
    filed(__dirname + pathname).pipe(res);
  }
}).listen(3000);