'use strict';

var app = angular.module('arcaFrontEndApp', ['ngResource']);

app.factory("Post", function($resource) {
  return $resource("http://localhost:8080/entry-point/test");
});

app.controller('batchController', ['$scope', 'Post', function ($scope, Post) {
  $scope.test = Post.query();
}]);



