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
      //return $resource("https://secure-caverns-39897.herokuapp.com/lines/chart/:year", {year:year}).query()
      return [   [65, 59]      ];
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

app.controller("chartController", function ($scope, getChartsData, $resource) {

  $scope.year = 2008;

  $scope.nextYear = function () {
    $scope.year +=1;
    //$scope.data = getChartsData.statsOfTheYear($scope.year);
    var res = $resource("https://secure-caverns-39897.herokuapp.com/lines/chart/:year", {year:$scope.year}).query().$promise.then(function (result){
      $scope.data[0] = [];
      angular.forEach(result, function (value, key){
        $scope.labels.push(value._id);
        $scope.data[0].push(parseInt(value.sum));
      })
    });
  };
  $scope.previousYear = function () {
    $scope.year -=1;
    //$scope.data = getChartsData.statsOfTheYear($scope.year);
    var res = $resource("https://secure-caverns-39897.herokuapp.com/lines/chart/:year", {year:$scope.year}).query().$promise.then(function (result){
      $scope.data[0] = [];
      angular.forEach(result, function (value, key){
        $scope.labels.push(value._id);
        $scope.data[0].push(parseInt(value.sum));
      })
    });
  };

  $scope.data = getChartsData.statsOfTheYear($scope.year);
  $scope.labels = [];
  $scope.series = ['Series A'];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  var res = $resource("https://secure-caverns-39897.herokuapp.com/lines/chart/:year", {year:2008}).query().$promise.then(function (result){
    $scope.data[0] = [];
    angular.forEach(result, function (value, key){
      $scope.labels.push(value._id);
      $scope.data[0].push(parseInt(value.sum));
    })
  });
});
