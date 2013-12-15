'use strict';

//var cipherControllers = angular.module('cipherControllers', []);
var cipherApp = angular.module('cipherApp', []);


cipherApp.controller('AlgorithmListCtrl',
    function ($scope) {
        $scope.hello = 'Hello';
        $scope.algorithms = [
            new Caesar(),
            new Playfair(),
            new RailFence(),
            new Vigenere()
        ]
    }
);