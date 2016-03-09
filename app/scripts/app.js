'use strict';

var app = angular.module('arcaFrontEndApp', ['ngResource', 'chart.js']);

app.config(['ChartJsProvider', function (ChartJsProvider) {

  // Define chart's options
  // Line colour and responsive to true
  ChartJsProvider.setOptions({
    colours: ['#337ab7', '#5bc0de'],
    responsive: true
  });
}]);


app.controller('batchController', function ($scope) {

  $scope.inProgress = false;
  $scope.action = "Lancer le traitement";
  $scope.state = 30;

  $scope.launchBatch = function () {
    //TODO : Request web service to start the batch

    $scope.inProgress = true;
    $scope.action = "Traitement en cours";
  };

  // TODO : Connect to web service with websocket to get batch state
});

app.controller('tabController', function ($scope, $resource) {

  // Fetch values grouped by by country
  $scope.lines = $resource("https://secure-caverns-39897.herokuapp.com/lines/lineByCountry").query();
});

app.controller("chartController", function ($scope, $resource, $filter) {

  $scope.year = 2008;
  $scope.data = [];
  loadData();

  function loadData (){
    $scope.series = [$scope.year];
    $scope.labels = [];
    $scope.data[0] = [];
    var res = $resource("https://secure-caverns-39897.herokuapp.com/lines/chart/:year", {year:$scope.year}).query().$promise.then(function (result){
      displayData(result);
    });
  }

  function displayData(result) {
    $scope.showChart = result.length != 0;
    angular.forEach(result, function (value, key){
      var day = value._id;
      var date = new Date($scope.year, 0); // initialize a date in `year-01-01`
      var formattedDate = new Date(date.setDate(day));
      $scope.labels.push($filter('date')(formattedDate, "dd/MM"));
      $scope.data[0].push(parseInt(value.sum));
    })
  }

  $scope.nextYear = function () {
    $scope.year +=1;
    loadData();
  };
  $scope.previousYear = function () {
    $scope.year -=1;
    loadData();
  };
});
