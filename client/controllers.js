var cipherApp = angular.module('cipherApp', []);

cipherApp.controller('Controller',
    function ($scope) {
        'use strict';
        $scope.algorithms = [
            new Caesar(),
            new Playfair(),
            new RailFence(),
            new Vigenere()
        ];
        $scope.algorithm = $scope.algorithms[0];
        $scope.key = "";
        $scope.direction = "encipher";
        $scope.input = "";
        $scope.output = "";

        var getOutput = function () {
            if ($scope.direction === 'encipher') {
                return $scope.algorithm.encipher($scope.input, $scope.key);
            }
            return $scope.algorithm.decipher($scope.input, $scope.key);
        };

        var updateOutput = function () {
            $scope.output = getOutput();
        };

        $scope.$watch('algorithm', updateOutput);
        $scope.$watch('key',       updateOutput);
        $scope.$watch('direction', updateOutput);
        $scope.$watch('input',     updateOutput);
    });