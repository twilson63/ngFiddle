<!doctype html>
<html lang="en" ng-app>
  <head>
    <title>&lt;ngFiddle&gt;</title>
    <meta charset='utf-8'></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="&lt;ngFiddle&gt; - Play online with AngularJs">
    <meta name="keywords" content="Javascript Tools, AngularJs, NodeJs, and CouchDb">
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <style type="text/css">
      body { margin-top: 90px;}
      iframe {
        background: url(http://placehold.it/1000x300/777777/888888&text=preview) no-repeat;
      }
      textarea {
        width: 100%;
        max-width:100%;
        height:250px;
        font-size: 1.5em;
        line-height: 30px;
        font-family: monospace;
        padding-left: 10px;
      }
      textarea.html {
        color: orange;
        background: url(http://placehold.it/470x300/333333/555555&text=html) no-repeat;
      }

      textarea.js {
        color: yellow;
        background: url(http://placehold.it/470x300/333333/555555&text=js) no-repeat;
      }

    </style>
  </head>
  <body ng-controller="fiddleCtrl">
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <div class="span2">
          <a href="#" class="brand">&lt;ngFiddle&gt;</a>
          </div>
          <div class="span8">
          <form class="form-search"><input class='span6' placeholder='fiddle url' value="{{url}}"></input><button class='btn' ng-click="preview()">Run</button></form>
          </div>
          <ul class="nav">
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="span6">
          <textarea class="html" ng-model="html"></textarea>
        </div>
        <div class="span6">
          <textarea class="js" ng-model="js"></textarea>
        </div>
      </div>
      <div class="row">
        <iframe width="99%" height="100%" style="margin-left: 20px;height: 300px;" src="{{page}}"></iframe>
      </div>
    </div>
    <div class="navbar">
      <div class="navbar-inner">
        <div class="container">
          <a href="#" class="brand">All Rights Reserved.</a>
          <ul class="nav pull-right">
            <li><a href="http://twitter.com/twilson63">@twilson63</a></li>
            <li><a href="http://github.com/twilson63/ngfiddle">Source</a></li>
            <li><a href="http://jackhq.com">Jack Russell Software</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <script src="/scripts/angular.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
      window.foo = <%& doc %>;
    </script>
    <script src="/scripts/app.js"></script>
  </body>
</html>