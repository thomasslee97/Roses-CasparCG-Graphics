var app = angular.module('cgApp', ['ngAnimate', 'socket-io']);
var data_timeout = 100;

app.controller('gameshowCtrl', ['$scope', '$http',
    function($scope, $http){
        function getGameshow() {
            $http.get('http://127.0.0.1:3000/gameshow')
            .then(function(response){
                if (response.status == 200 && response.data) {
                    $scope.gameshow = response.data;
                }
            })
        }

        setInterval(getGameshow, data_timeout);
    }
]);
