'use strict';

//var cipherControllers = angular.module('cipherControllers', []);
var cipherApp = angular.module('cipherApp', []);


cipherApp.controller('Controller',
    function ($scope) {
        $scope.algorithms = [
            new Caesar(),
            new Playfair(),
            new RailFence(),
            new Vigenere()
        ]
        $scope.algorithm = $scope.algorithms[0];
        $scope.key = "";
        $scope.direction = "encipher";
        $scope.input = "the input";
        $scope.output = function() {
            if ($scope.direction === 'encipher') {
                return $scope.algorithm.encipher($scope.input, $scope.key);
            }
            return $scope.algorithm.decipher($scope.input, $scope.key);
        };
    }
);