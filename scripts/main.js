'use strict';
var myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller('DetailsCtrl', function ($scope) {
    var count = 0;

    $scope.submit = function () {
        count++;

        $scope.data.subTotal = $scope.data.baseMeal * (1 + $scope.data.taxRate / 100);
        $scope.data.tipCalc = $scope.data.subTotal * ($scope.data.tipPerc / 100);
        $scope.data.totalCalc = $scope.data.subTotal + $scope.data.tipCalc;

        $scope.data.tipTotal += $scope.data.tipCalc;
        $scope.data.mealTotal = count;
        $scope.data.avgTip = $scope.data.tipTotal / $scope.data.mealTotal;
    }

    $scope.reset = function () {
        $scope.data = 0;
        count = 0;
    }
});
