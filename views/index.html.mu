<!doctype html>
<html lang="en">
  <head>
    <title>ngFiddle</title>
    <meta charset='utf-8'></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ngFiddle - Play online with AngularJs">
    <meta name="keywords" content="Javascript Tools, AngularJs, NodeJs, and CouchDb">
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <style type="text/css">body { margin-top: 60px;}</style>
  </head>
  <body ng-app>
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a href="#" class="brand">ngFiddle</a>
        </div>
      </div>
    </div>
    <div class="container" ng-controller="fiddleCtrl">
      <div class="span2">
      <button class="btn btn-primary" ng-click="preview()">Run</button>
      </div>
      <div class="span8">
      <div ng-show="page">
        URL
        <input type="url" value="{{url}}" class='span8'></input>
      </div>
      </div>
    <hr />
    <table width="100%" height="100%">
      <tr style="height: 250px;">
        <td class="html">
          <textarea style="width: 90%;height:100%" ng-model="html"></textarea>
        </td>
        <td class="css">
          <textarea style="width: 90%;height:100%" ng-model="css"></textarea>
        </td>
      </tr>
      <tr style="height: 250px;">
        <td class="js">
          <textarea style="width: 90%;height:100%" ng-model="js"></textarea>
        </td>
        <td class="preview">
          <iframe width="90%" height="100%" src="{{page}}"></iframe>
        </td>
      </tr>
    </table>
    </div>
    <script src="scripts/angular.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
      window.foo = <%& doc %>;
    </script>
    <script src="scripts/app.js"></script>
  </body>
</html>