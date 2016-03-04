'use strict';

var app = angular.module('arcaFrontEndApp', ['ngResource', 'chart.js']);

app.config(['ChartJsProvider', function (ChartJsProvider) {
  ChartJsProvider.setOptions({
    colours: ['#FF5252', '#FF8A80'],
    responsive: true
  });
  // Configure all line charts
  ChartJsProvider.setOptions('Line', {
    datasetFill: false
  });
}]);

app.factory("Post", function($resource) {
  return $resource("http://localhost:8080/entry-point/test");
});

app.controller('batchController', ['$scope', 'Post', function ($scope, Post) {
  $scope.test = Post.query();
  $scope.onClick = function () {
    // Effectuer requete vers web service
    console.log("demarrage");
  };
}]);

app.controller('tabController', ['$scope', function ($scope) {
  $scope.lines = [{country: "Belgique", value: 190}, {country: "France", value: 180}];
}]);

app.controller("chartController", function ($scope, $timeout) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $timeout(function () {
    $scope.data = [
      [28, 48, 40, 19, 86, 27, 90],
      [65, 59, 80, 81, 56, 55, 40]
    ];
  }, 3000);
});
