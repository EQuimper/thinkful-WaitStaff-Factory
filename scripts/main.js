'use strict';
var myApp = angular.module('myApp', ['ngMaterial', 'ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'home.html',
		controller: 'HomeCtrl'
	}).when('/New Meal', {
		templateUrl: 'newMeal.html',
		controller: 'DetailsCtrl'
	}).when('/My Earning', {
		templateUrl: 'myEarning.html',
		controller: 'EarningCtrl'
	}).when('/error', {
		template: '<p>Error - Page not found</p>'
	}).otherwise('/error');
}]);

myApp.controller('DetailsCtrl', ['$scope', 'customerFactory', function ($scope, customerFactory) {
	var count = 0;

	$scope.data = customerFactory;

	$scope.submit = function () {
		$scope.data.calcAll();
	};

}]);

myApp.controller('EarningCtrl', ['$scope', 'customerFactory', function ($scope, customerFactory) {
	var count = 0;
	$scope.data = customerFactory;
	console.log($scope.data);

	$scope.reset = function () {
		$scope.data.resetAll();
	};
}]);


myApp.factory('customerFactory', function () {
	var self = this;
	self.count = 0;
	self.baseMeal = '';
	self.taxRate = '';
	self.tipPerc = '';
	self.subTotal = 0;
	self.tipCalc = 0;
	self.totalCalc = 0;
	self.tipTotal = 0;
	self.mealTotal = 0;
	self.avgTip = 0;

	function subTotal() {
		self.subTotal = self.baseMeal * (1 + self.taxRate / 100);
		return self.subTotal;
	}


	function tipCalc() {
		self.tipCalc = self.subTotal * (self.tipPerc / 100);
		return self.tipCalc;
	}

	function totalCalc() {
		self.totalCalc = self.subTotal + self.tipCalc;
		return self.totalCalc;
	}

	function tipTotal() {
		self.tipTotal += self.tipCalc;
		return self.tipTotal;
	}

	function mealTotal() {
		self.mealTotal = self.count;
		return self.mealTotal;
	}

	function avgTip() {
		self.avgTip = self.tipTotal / self.mealTotal;
		return self.avgTip;
	}

	function customerCharges() {
		subTotal();
		tipCalc();
		totalCalc();
	}

	function myEarnings() {
		tipTotal();
		mealTotal();
		avgTip();
	}

	function calcAll() {
		self.count++;
		customerCharges();
		myEarnings();
	}

	self.calcAll = calcAll;


	function resetAll() {
		self.count = 0;
		self.baseMeal = '';
		self.taxRate = '';
		self.tipPerc = '';
		self.subTotal = 0;
		self.tipCalc = 0;
		self.totalCalc = 0;
		self.tipTotal = 0;
		self.mealTotal = 0;
		self.avgTip = 0;
	}

	self.resetAll = resetAll;

	return self;
});
