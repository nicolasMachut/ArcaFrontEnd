'use strict';

var app = angular.module('arcaFrontEndApp', ['ngResource']);

app.factory("Post", function($resource) {
  return $resource("http://localhost:8080/entry-point/test");
});

app.controller('batchController', ['$scope', 'Post', function ($scope, Post) {
  $scope.test = Post.query();
  console.log($scope.test);
}]);

app.controller('tabController', ['$scope', function ($scope) {
  $scope.lines = [{country: "Belgique", value: 190}, {country: "France", value: 180}];
}]);



