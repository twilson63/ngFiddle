function fiddleCtrl($scope, $http) {
  $scope.html = "<!doctype>\r\n<html ng-app>\r\n  <body ng-controller=\"helloCtrl\">\r\n    <h1>Hello {{world}}</h1>\r\n    <script src=\"/scripts/angular.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\r\n  </body>\r\n</html>";
  $scope.css = "h1 {\r\n  color: blue;\r\n}";
  $scope.js = "function helloCtrl($scope) {\r\n  $scope.hello = \"world\"\r\n};"
  $scope.preview = function() {
    //$scope.page = 'http://localhost:3000/';
    $http.post('/fiddle', { html: $scope.html, css: $scope.css, js: $scope.js }).success(function(data){
      //$scope.page = data.url;
      $scope.page = 'http://localhost:3000';
    });
  }
}