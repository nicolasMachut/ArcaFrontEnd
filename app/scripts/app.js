'use strict';

var app = angular.module('arcaFrontEndApp', ['ngResource', 'chart.js']);

app.config(['ChartJsProvider', function (ChartJsProvider) {
  ChartJsProvider.setOptions({
    colours: ['#337ab7', '#5bc0de'],
    responsive: true
  });
  // Configure all line charts
  ChartJsProvider.setOptions('Line', {
    datasetFill: false

  });
}]);

app.factory("getChartsData", function($resource) {
  return {
    statsOfTheYear: function (year){
      return [
        [28, 48, 40, 19, 86, 27, 90],
        [65, 59, 80, 81, 56, 55, 40]
      ];
    },

    valuesByCountry: function () {
      return $resource("localhost:8080/entry-point/test").get();
    }
  }
});

app.factory("batchManager", function($resource) {
  return {
    launchBatch: function (){
      return "ok";
    }
  }
});

app.controller('batchController', function ($scope, batchManager) {

  $scope.inProgress = false;
  $scope.action = "Lancer le traitement";

  $scope.state = 30;
  //$scope.test = Post.query();
  $scope.launchBatch = function () {
    batchManager.launchBatch();
    $scope.inProgress = true;
    $scope.action = "Traitement en cours";
  };
});

app.controller('tabController', function ($scope, getChartsData, $resource) {
  $scope.lines = $resource("https://secure-caverns-39897.herokuapp.com/lines/lineByCountry").query();
});

app.controller("chartController", function ($scope, getChartsData) {

  $scope.year = 2016;

  $scope.nextYear = function () {
    $scope.year +=1;
    $scope.data = getChartsData.statsOfTheYear($scope.year);
  };
  $scope.previousYear = function () {
    $scope.year -=1;
    $scope.data = getChartsData.statsOfTheYear($scope.year);
  };

  $scope.data = getChartsData.statsOfTheYear($scope.year);

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});
