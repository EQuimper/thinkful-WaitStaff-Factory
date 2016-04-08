'use strict';
var myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller('DetailsCtrl', function ($scope) {
    $scope.getSubTotal = function (a, b) {
        return (a + ((a * b) / 100));
    };

    $scope.getTip = function (a, b) {
        return ((a * b) / 100);
    };

    $scope.getTotal = function (a, b) {
        return (a + b);
    };
});
