angular.module('fiddle', ['ui']);

function fiddleCtrl($scope, $http, $window) {
  $scope.html = $window.foo.html;
  $scope.css = $window.foo.css;
  $scope.js = $window.foo.js;
  if ($window.foo._id) { 
    $scope._id = $window.foo._id; 
    $scope.page = '/fiddle/' + $scope._id;
    $scope.url = 'http://' + $window.location.host + '/?id=' + $scope._id;
  }
  if ($window.foo._rev) { $scope._rev = $window.foo._rev; }

  $scope.load = function() {
    $http.get('/fiddle/' + $scope._id).success(function(data){
      $scope.html = data.html;
      $scope.css = data.css;
      $scope.js = data.js;
    });
  }
  $scope.preview = function() {
    $scope.page = '/loading.html';
    var data = { html: $scope.html, css: $scope.css, js: $scope.js };
    if ($scope._rev) {  data._rev = $scope._rev }
    if ($scope._id) {
      $http.put('/fiddle/' + $scope._id, data).success(function(data){
        updateScope(data);
      });
    } else {
      $http.post('/fiddle', data).success(function(data){
        updateScope(data);
      });
    }
  }

  var updateScope = function(data) {
    $scope.page = '/fiddle/' + data.id;
    $scope._id = data.id;
    $scope._rev = data.rev;
    $scope.url = 'http://' + $window.location.host + '/?id=' + data.id;    
  }
}