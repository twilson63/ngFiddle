<!doctype html>
<html lang="en" ng-app="fiddle">
  <head>
    <title>ngFiddle</title>
    <meta charset='utf-8'></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="&lt;ngFiddle&gt; - Play online with AngularJs">
    <meta name="keywords" content="Javascript Tools, AngularJs, NodeJs, and CouchDb">
    <!--[if lte IE 8]>
        <script>
        // The ieshiv takes care of our ui.directives and AngularJS's ng-view, ng-include and ng-pluralize.
        // However, IF you have custom directives (yours or someone else's) then
        // add the directly containing module into window.myAngularModules

        window.myAngularModules = [ 'yourModule.ThatContainsAtLeastSomeDirectives', 'somebodyElsesModule' ]; // optional
        </script>
        <script src="build/angular-ui-ieshiv.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="/css/angular-ui.min.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="/css/codemirror.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="/css/monokai.css" type="text/css" media="screen" title="no title" charset="utf-8">
    
    <style type="text/css">
      body { margin-top: 90px;}
      iframe {
        background: url(http://placehold.it/1000x300/777777/888888&text=preview) no-repeat;
      }
      textarea {
        width: 100%;
        max-width:100%;
        height:250px;
/*        font-size: 1.5em;
        line-height: 30px;
        font-family: monospace;
*/        padding-left: 10px;
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
          <a href="#" class="brand">&lt;ngFiddle&gt; 0.2</a>
          </div>
          <div class="span7">
          <form class="form-search"><input class='span6' placeholder='fiddle url' value="{{url}}"></input><button class='btn' ng-click="preview()">Run</button></form>
          </div>
          <a href="http://angularjs.org" class="brand" target="_blank">AngularJs Docs</a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="span6">
          <textarea ui-codemirror="{mode: 'htmlmixed', theme:'monokai'}" ng-model="html" class="html"></textarea>
        </div>
        <div class="span6">
          <textarea ui-codemirror="{mode: 'javascript', theme:'monokai'}" ng-model="js"></textarea>
        </div>
      </div>
      <div class="row">
        <iframe width="99%" height="100%" style="margin-top: 20px;margin-left: 20px;height: 300px;" src="{{page}}"></iframe>
      </div>
    </div>
    <div class="navbar navbar-fixed-bottom">
      <div class="navbar-inner">
        <div class="container">
          <a href="#" class="brand">All Rights Reserved.</a>
          <ul class="nav pull-right">
            <li><a href="http://twitter.com/twilson63">@twilson63</a></li>
            <li><a href="http://github.com/twilson63/ngfiddle">Github</a></li>
            <li><a href="http://jackhq.com">Jack Russell Software</a></li>
          </ul>
        </div>
      </div>
    </div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="/scripts/angular.js" type="text/javascript" charset="utf-8"></script>
    <script src="/scripts/angular-ui-ieshiv.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="/scripts/angular-ui.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="/scripts/codemirror.js" type="text/javascript" charset="utf-8"></script>
    <script src="/scripts/javascript.js" type="text/javascript" charset="utf-8"></script>
    <script src="/scripts/css.js" type="text/javascript" charset="utf-8"></script>
    <script src="/scripts/xml.js" type="text/javascript" charset="utf-8"></script>
    
    <script src="/scripts/htmlmixed.js" type="text/javascript" charset="utf-8"></script>
    
    <script type="text/javascript">
      window.foo = <%& doc %>;
    </script>
    <script src="/scripts/app.js"></script>
    <script type="text/javascript">
      var _gauges = _gauges || [];
      (function() {
        var t   = document.createElement('script');
        t.type  = 'text/javascript';
        t.async = true;
        t.id    = 'gauges-tracker';
        t.setAttribute('data-site-id', '505db9a9613f5d242c000034');
        t.src = '//secure.gaug.es/track.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(t, s);
      })();
    </script>
  </body>
</html>