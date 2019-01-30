var app = angular.module('StarterApp', ['ngRoute', 'LocalStorageModule', 'angularify.semantic', 'socket-io']);

var data_timeout = 1000;

app.controller('AppCtrl', ['$scope', '$location',
    function($scope, $location){

        $scope.menu = [];

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.menu.push({
            name: 'Riddle Me This',
            url: '/gameshow',
            type: 'link',
            icon: 'violet question',
            live: false,
        });
    }
]);

/*
 *  Configure the app routes
 */
app.config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider) {
        $routeProvider
            .when("/gameshow", {
                templateUrl: '/admin/templates/gameshow.tmpl.html',
                controller: 'gameshowCGController'
            })
            .otherwise({redirectTo: '/gameshow'});
    }
]);

/**
 * Lower Thirds.
 */
app.controller('gameshowCGController', ['$scope', '$http',
    function($scope, $http){
        // Lock changes to the scope.
        $scope.lock = false;

        /**
         * Updates the API when $scope.gameshow changes.
         */
        $scope.$watch('gameshow', function () {
            // If the bug exists and changes are allowed.
            if ($scope.gameshow && !$scope.lock) {
                // Lock changes.
                $scope.lock = true;
                
                // Send changes and unlock changes.
                $http.post('http://127.0.0.1:3000/gameshow', $scope.gameshow).then($scope.lock = false);

                // Request changes from API to confirm changes.
                getGameshow();
            } else {
                // Get data from API.
                getGameshow();
            }
        }, true);


        $scope.nextRound = function () {
            $scope.gameshow.blueTeam.showName = false;
            $scope.gameshow.greenTeam.showName = false;
            $scope.gameshow.blueTeam.showScore = false;
            $scope.gameshow.greenTeam.showScore = false;
            $scope.gameshow.showScores = false;
            $scope.gameshow.teamHasBuzzed = false;

            sendChanges();
        }

        $scope.showScores = function () {
            $scope.gameshow.greenTeam.showScore = true;
            $scope.gameshow.blueTeam.showScore = true;

            sendChanges();
        }

        $scope.hideScores = function () {
            $scope.gameshow.greenTeam.showScore = false;
            $scope.gameshow.blueTeam.showScore = false;

            sendChanges();
        }

        $scope.showScore = function (team) {
            $scope.gameshow[team].showScore = true;

            sendChanges();
        }

        $scope.hideScore = function (team) {
            $scope.gameshow[team].showScore = false;

            sendChanges();
        }

        $scope.showName = function (team) {
            $scope.gameshow[team].showName = true;

            sendChanges();
        }

        $scope.hideName = function (team) {
            $scope.gameshow[team].showName = false;

            sendChanges();
        }

        $scope.upScore = function (team) {
            $scope.gameshow[team].score += 1;

            sendChanges();
        }

        $scope.downScore = function (team) {
            $scope.gameshow[team].score -= 1;

            if ($scope.gameshow[team].score < 0) {
                $scope.gameshow[team].score = 0;
            }

            sendChanges();
        }

        function sendChanges () {
            // Lock changes.
            $scope.lock = true;

            // Send changes and unlock changes.
            $http.post('http://127.0.0.1:3000/gameshow', $scope.gameshow).then(function(response) {
                $scope.lock = false;

                getGameshow();
            });
        }

        /**
         * Gets all lower thirds from the API.
         */
        function getGameshow () {
            if (!$scope.lock) {
                $scope.lock = true;
                $http.get('http://127.0.0.1:3000/gameshow')
                .then(function(response){
                    if (response.status == 200 && response.data) {
                        $scope.gameshow = response.data
                    }
                    $scope.lock = false;

                    $scope.fuck = "HI";
                })
            }
        }

        // Calls getLowerThirds once every data_timeout.
        setInterval(getGameshow, data_timeout)
    }
]);
