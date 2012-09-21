var http = require('http'),
  qs = require('querystring'),
  fs = require('fs'),
  filed = require('filed'),
  request = require('request'),
  hogan = require('hogan.js'),
  template = hogan.compile(fs.readFileSync('./views/template.html.mu', 'utf-8')),
  index = hogan.compile(fs.readFileSync('./views/index.html.mu', 'utf-8'), { delimiters: '<% %>'});

var COUCH = process.env.COUCH || 'http://localhost:5984';

http.createServer(function(req,res){
  var pathname = req.url;
  //if (req.url === '/') { pathname = '/index.html' }
  if (pathname === '/fiddle' && req.method === 'POST') {
    req.pipe(request(COUCH + pathname)).pipe(res);
  } else if (/^\/fiddle\//.test(pathname) && req.method === 'PUT') {
    req.pipe(request.put(COUCH + pathname)).pipe(res);
  } else if (/^\/fiddle\//.test(pathname) && req.method === 'GET') {
    //req.pipe(request(COUCH + pathname)).pipe(res);
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
  } else if (/^\/\?id/.test(req.url)) {
    var id = qs.parse(req.url.split('?')[1]).id;
    request(COUCH + '/fiddle/' + id, {json: true }, function(e,r,b){
      if(e) { 
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(e.message);
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(index.render({ doc: JSON.stringify(b) }));
    });
  } else if (/^\/$/.test(req.url)) {
    var doc = JSON.stringify({
      html: "<div ng-controller=\"helloCtrl\">\r\n  <h1>Hello {{world}}</h1>\r\n  <input ng-model=\"world\" />\r\n</div>",
      css: "h1 {\r\n  color: blue;\r\n}",
      js: "function helloCtrl($scope) {\r\n  $scope.world = \"world\";\r\n};"
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index.render({ doc: doc }));    
  } else {
    filed(__dirname + '/public' + pathname).pipe(res);
  }
}).listen(3000);