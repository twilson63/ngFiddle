function fiddleCtrl($scope, $http) {
  $scope.html = "<div ng-controller=\"helloCtrl\">\r\n  <h1>Hello {{world}}</h1>\r\n</div>";
  $scope.css = "h1 {\r\n  color: blue;\r\n}";
  $scope.js = "function helloCtrl($scope) {\r\n  $scope.world = \"world\";\r\n};"
  $scope.preview = function() {
    $scope.page = 'http://localhost:3000/loading.html';
    //$scope.page = 'http://localhost:3000/';
    if ($scope._id) {
      $http.put('/fiddle/' + $scope._id, { html: $scope.html, css: $scope.css, js: $scope.js, _rev: $scope._rev }).success(function(data){
        $scope.page = 'http://localhost:3000/fiddle/' + data.id;
        $scope._id = data.id;
        $scope._rev = data.rev;
      });
    } else {
      $http.post('/fiddle', { html: $scope.html, css: $scope.css, js: $scope.js }).success(function(data){
        $scope.page = 'http://localhost:3000/fiddle/' + data.id;
        $scope._id = data.id;
        $scope._rev = data.rev;
      });
    }
  }
}