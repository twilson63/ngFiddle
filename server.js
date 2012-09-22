var http = require('http'),
  qs = require('querystring'),
  fs = require('fs'),
  filed = require('filed'),
  es = require('event-stream'),
  request = require('request'),
  hogan = require('hogan.js'),
  template = hogan.compile(fs.readFileSync('./views/template.html.mu', 'utf-8')),
  index = hogan.compile(fs.readFileSync('./views/index.html.mu', 'utf-8'), { delimiters: '<% %>'});

var COUCH = process.env.COUCH || 'http://localhost:5984';
var DEMO = JSON.stringify({
  html: "<div ng-controller=\"helloCtrl\">\r\n  <h1>Hello {{world}}</h1>\r\n  <input ng-model=\"world\" />\r\n</div>",
  css: "h1 {\r\n  color: #eee;\r\n}",
  js: "function helloCtrl($scope) {\r\n  $scope.world = \"world\";\r\n};"
});

http.createServer(function(req,res){
  var pathname = req.url,
    fiddle = /^\/fiddle/.test(pathname),
    hasParams = /^\/\?id/.test(req.url),
    root = /^\/$/.test(req.url);
    
  if (fiddle){
    if (req.method === 'POST'){ es.pipeline(req, request(COUCH + pathname), res); }
    else if (req.method === 'PUT') { es.pipeline(req, request.put(COUCH + pathname), res); }
    else { es.pipeline(req, request(COUCH + pathname), es.map(renderTemplate), res); }
  } else if (hasParams) {
    var id = qs.parse(req.url.split('?')[1]).id;
    es.pipeline(req, request(COUCH + '/fiddle/' + id), es.map(renderIndex), res);
  } else if (root) {
    res.end(index.render({ doc: DEMO }));    
  } else {
    filed(__dirname + '/public' + pathname).pipe(res);
  }
}).listen(3000);

function renderTemplate(data, cb) { cb(null, template.render(JSON.parse(data))); }
function renderIndex(data, cb) { cb(null, index.render({ doc: data })); }