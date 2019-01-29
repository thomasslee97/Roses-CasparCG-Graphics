var app = angular.module('StarterApp', ['ngRoute', 'LocalStorageModule', 'angularify.semantic', 'socket-io']);

var data_timeout = 1000;

app.controller('AppCtrl', ['$scope', '$location', 'socket', '$http',
    function($scope, $location, socket, $http){

        $scope.menu = [];

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.menu.push({
            name: 'General',
            url: '/general',
            type: 'link',
            icon: 'settings',
            live: false,
        });

        $scope.menu.push({
            name: 'Lower Thirds',
            url: '/lowerThirds',
            type: 'link',
            icon: 'violet list layout',
            live: false,
        });

        $scope.menu.push({
            name: 'Grid',
            url: '/grid',
            type: 'link',
            icon: 'teal grid layout',
            live: false,
        });

        $scope.menu.push({
            name: 'Roses',
            url: '/roses',
            type: 'link',
            icon: 'yellow trophy',
            live: false,
        });

        $scope.menu.push({
            name: 'Boxing',
            url: '/boxing',
            type: 'link',
            icon: 'olive users',
            live: false,
        });

        $scope.menu.push({
            name: 'Football',
            url: '/football',
            type: 'link',
            icon: 'soccer',
            live: false,
        });

        $scope.menu.push({
            name: 'Rugby',
            url: '/rugby',
            type: 'link',
            icon: 'orange soccer',
        });

        $scope.menu.push({
            name: 'Darts',
            url: '/darts',
            type: 'link',
            icon: 'red bullseye',
            live: false,
        });

        $scope.menu.push({
            name: 'Swimming',
            url: '/swimming',
            type: 'link',
            icon: 'blue life ring',
            live: false,
        });

        $scope.menu.push({
            name: 'Basketball',
            url: '/basketball',
            type: 'link',
            icon: 'orange clockwise rotated loading life ring',
            live: false,
        });

        $scope.menu.push({
            name: 'Archery',
            url: '/archery',
            type: 'link',
            icon: 'bullseye',
            live: false,
        });

        $scope.menu.push({
            name: 'Badminton',
            url: '/badminton',
            type: 'link',
            icon: 'green neuter',
            live: false,
        });

        $scope.menu.push({
            name: 'Tennis',
            url: '/tennis',
            type: 'link',
            icon: 'olive circle',
            live: false,
        });

        $scope.menu.push({
            name: 'Netball',
            url: '/netball',
            type: 'link',
            icon: 'soccer',
            live: false,
        });

        $scope.menu.push({
            name: 'Waterpolo',
            url: '/waterpolo',
            type: 'link',
            icon: 'blue tint',
            live: false,
            play: true
        });

        getBrandingData();

        function getBrandingData() {
            $http.get('http://127.0.0.1:3000/images/logo')
            .then(function(response){
                if (response.status == 200) {
                    $scope.logoUrl = response.data
                }
            });
        }
    }
]);

/*
 *  Configure the app routes
 */
app.config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('la1tv');

        $routeProvider
            .when("/general", {
                templateUrl: '/admin/templates/general.tmpl.html',
                controller: 'generalCGController'
            })
            .when("/lowerThirds", {
                templateUrl: '/admin/templates/lowerThirds.tmpl.html',
                controller: 'lowerThirdsCGController'
            })
            .when("/boxing", {
                templateUrl: '/admin/templates/boxing.tmpl.html',
                controller: 'boxingCGController'
            })
            .when("/roses", {
                templateUrl: '/admin/templates/roses.tmpl.html',
                controller: 'rosesCGController'
            })
            .when("/football", {
                templateUrl: '/admin/templates/football.tmpl.html',
                controller: 'footballCGController'
            })
            .when("/rugby", {
                templateUrl: '/admin/templates/rugby.tmpl.html',
                controller: 'rugbyCGController'
            })
            .when("/darts", {
                templateUrl: '/admin/templates/darts.tmpl.html',
                controller: 'dartsCGController'
            })
            .when("/swimming", {
                templateUrl: '/admin/templates/swimming.tmpl.html',
                controller: 'swimmingCGController'
            })
            .when("/grid", {
                templateUrl: '/admin/templates/grid.tmpl.html',
                controller: 'gridCGController'
            })
            .when("/basketball", {
                templateUrl: '/admin/templates/basketball.tmpl.html',
                controller: 'basketballCGController'
            })
            .when("/archery", {
                templateUrl: '/admin/templates/archery.tmpl.html',
                controller: 'archeryCGController'
            })
            .when("/badminton", {
              templateUrl: '/admin/templates/badminton.tmpl.html',
              controller: 'badmintonCGController'
            })
            .when("/tennis", {
              templateUrl: '/admin/templates/tennis.tmpl.html',
              controller: 'tennisCGController'
            })
            .when("/netball", {
              templateUrl: '/admin/templates/netball.tmpl.html',
              controller: 'netballCGController'
            })
            .when("/waterpolo", {
              templateUrl: '/admin/templates/waterpolo.tmpl.html',
              controller: 'waterpoloCGController'
            })
            .when("/volleyball", {
                templateUrl: '/admin/templates/volleyball.tmpl.html',
                controller: 'volleyballCGController'
            })
            .otherwise({redirectTo: '/general'});
    }
]);

app.controller('archeryCGController', ['$scope', 'socket',
  function($scope, socket) {
      socket.on("archery", function (msg) {
          $scope.archery = msg;
          $scope.menu.forEach(item => {
              if (item.name === 'Archery') {
                  item.live = $scope.archery.show
              }
          })
      });

      $scope.$watch('archery', function() {
          if ($scope.archery) {
              socket.emit("archery", $scope.archery);
          } else {
              getArcheryData();
          }
      }, true);


      function getArcheryData() {
          socket.emit("archery:get");
      }

      $scope.archeryReset1 = function() {
          $scope.archery.score1 = 0;
      };

      $scope.archeryHit1 = function(){
        if(!$scope.archery.shots1) {
            $scope.archery.shots1 = "";
        }
        if($scope.archery.shots1.length < 6) {
          $scope.archery.shots1 += "H";
          var tmp = Number($scope.archery.score1) || 0;
          var newScore = (tmp + 1);
          $scope.archery.score1 = newScore;
          debugger
        }
      }

      $scope.archeryHit2 = function(){
        if(!$scope.archery.shots2) {
            $scope.archery.shots2 = "";
        }
        if($scope.archery.shots2.length < 6) {
          $scope.archery.shots2 += "H";
          var tmp = Number($scope.archery.score2) || 0;
          var newScore = (tmp + 1);
          $scope.archery.score2 = newScore;
        }
      }

      $scope.archeryMiss1 = function(){
        if(!$scope.archery.shots1) {
            $scope.archery.shots1 = "";
        }
        if($scope.archery.shots1.length < 6) {
          $scope.archery.shots1 += "M";
        }
      }

      $scope.archeryMiss2 = function(){
        if(!$scope.archery.shots2) {
            $scope.archery.shots2 = "";
        }
        if($scope.archery.shots2.length < 6) {
          $scope.archery.shots2 += "M";
        }
      }

      $scope.archeryReset2 = function() {
          $scope.archery.score2 = 0;
          $scope.archery.shots1 = [];
          $scope.archery.shots2 = [];
      };

      $scope.archeryHitsReset1 = function() {
          $scope.archery.shots1 = "";
      };

      $scope.archeryHitsReset2 = function() {
          $scope.archery.shots2 = "";
      };
  }
]);

/**
 * General/ Bug.
 */
app.controller('generalCGController', ['$scope', '$http', 
    function($scope, $http){

        // Lock changes to the scope.
        $scope.lock = false;

        /**
         * Updates the API when $scope.bug changes.
         */
        $scope.$watch('bug', function() {
            // If the bug exists and changes are allowed.
            if ($scope.bug && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;
                
                // Send changes and unlock changes.
                $http.post('http://127.0.0.1:3000/bug', $scope.bug).then($scope.lock = false);

                // Request changes from API to confirm changes.
                getBugData();
            } else {
                // Get data from API.
                getBugData();
            }
        }, true);

        /**
         * Gets data from API for $scope.bug.
         */
        function getBugData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get('http://127.0.0.1:3000/bug')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.bug != response.data) {
                            $scope.bug = response.data;
                            
                            bugUpdated();
                        }
                    }
                });
            }
        }

        /**
         * Should be called whenever $scope.bug is modified by the controller.
         */
        function bugUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'General') {
                    // Set item live status according to current settings.
                    if ($scope.bug.showLogo === true || 
                        ($scope.bug.showGeneral === true && ($scope.bug.showLocation === true || $scope.bug.showClock === true || $scope.bug.showLive === true))) 
                    {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        }
        
        // Update data after every data timeout period.
        setInterval(getBugData, data_timeout);
    }
]);

/**
 * Lower Thirds.
 */
app.controller('lowerThirdsCGController', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http){
        $scope.queuedThirds = [];
        
        // Load lower thirds from local storage.
        var stored = localStorageService.get('lower_thirds');

        // If any lower thirds have been stored, set the queue.
        if(stored !== null) {
            $scope.queuedThirds = stored;
        }

        /**
         * Adds a lower third to the queue.
         */
        $scope.add = function(item) {
            if (item.heading) {
                $scope.queuedThirds.push(item);

                $scope.lowerThirdsForm.$setPristine();
                $scope.lowerThird = {};
            }
        };
        
        /**
         * Removes a lower third from the queue.
         */
        $scope.remove = function(index){
            $scope.queuedThirds.splice(index, 1);
        };
        
        /**
         * Edits a lower third.
         */
        $scope.edit = function(index) {
            if (!$scope.queuedThirds[index].edit) {
                $scope.queuedThirds[index].edit = true;
            } else if ($scope.queuedThirds[index].heading) {
                $scope.queuedThirds[index].edit = !$scope.queuedThirds[index].edit
            }
        }

        /**
         * Shows a lower third.
         */
        $scope.show = function(side, item) {
            $http.post('http://127.0.0.1:3000/lower-third/show/' + side, item);
        };

        /**
         * Hides all lower thirds.
         */
        $scope.hideall = function() {
            $http.post('http://127.0.0.1:3000/lower-third/hide/all')
        };

        /**
         * Hides the full lower third.
         */
        $scope.hidefull = function() {
            $http.post('http://127.0.0.1:3000/lower-third/hide/full')
        };

        /**
         * Hides the left lower third.
         */
		$scope.hideleft = function() {
            $http.post('http://127.0.0.1:3000/lower-third/hide/left')
        };

        /**
         * Hide the right lower third.
         */
		$scope.hideright = function() {
            $http.post('http://127.0.0.1:3000/lower-third/hide/right')
        };

        /**
         * Gets all lower thirds from the API.
         */
        function getLowerThirds() {
            $http.get('http://127.0.0.1:3000/lower-third')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.lowerThirds = response.data;

                    lowerThirdUpdated();
                }
            })
        }

        /**
         * Called after the lower thirds have been updated by getLowerThirds.
         */
        function lowerThirdUpdated() {
            var shown = $scope.lowerThirds.left.show || $scope.lowerThirds.right.show || $scope.lowerThirds.full.show

            $scope.menu.forEach(item => {
                if (item.name === 'Lower Thirds') {
                    item.live = shown
                }
            })
        }

        // Calls getLowerThirds once every data_timeout.
        setInterval(getLowerThirds, data_timeout)
    }
]);

/**
 * Grid.
 */
app.controller('gridCGController', ['$scope', 'localStorageService', 'socket', '$http',
    function($scope, localStorageService, socket, $http){
        // Initialise grid.
        $scope.grid = {};
        $scope.grid.rows = [];

        // Get stored grid.
        var stored = localStorageService.get('grid');
        if(stored !== null) {
            $scope.grid = stored;
        }

        /**
         * Adds a row to the grid.
         */
        $scope.add = function() {
            $scope.grid.rows.push({left:'', right:''});
        };

        /**
         * Removes a row from the grid.
         */
        $scope.remove = function(index){
            $scope.grid.rows.splice(index, 1);
        };

        /**
         * Shows the grid.
         */
        $scope.show = function() {
            $scope.grid.show = true;

            $http.post('http://127.0.0.1:3000/grid', $scope.grid);
        };

        /**
         * Hides the grid.
         */
        $scope.hide = function() {
            $scope.grid.show = false;
            
            $http.post('http://127.0.0.1:3000/grid', $scope.grid);
        };

        /**
         * Store the grid when destroyed.
         */
        $scope.$on("$destroy", function() {
            localStorageService.set('grid', $scope.grid);
        });

        /**
         * Shows the color options.
         */
        $scope.showColorOptions = function() {
          $scope.grid.colorShow = true
        }

        /**
         * Hides the color options.
         */
        $scope.hideColorOptions = function() {
          $scope.grid.colorShow = false
        }
}]);

app.controller('boxingCGController', ['$scope', 'socket',
    function($scope, socket){
        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.updateScore = function() {
            console.log("Score");
        };

        $scope.roundChanged = function() {
            console.log("Round");
        };

        socket.on("boxing", function (msg) {
            $scope.boxing = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Boxing') {
                    item.live = $scope.boxing.showScore
                }
            })
        });

        $scope.$watch('boxing', function() {
            if ($scope.boxing) {
                socket.emit("boxing", $scope.boxing);
            } else {
                getBoxingData();
            }
        }, true);

        function getBoxingData() {
            socket.emit("boxing:get");
            socket.emit("clock:get");
        }
    }
]);

/**
 * Roses/ overall score.
 */
app.controller('rosesCGController', ['$scope', 'socket', '$http', 
    function($scope, socket, $http) {
        $scope.roses = {}

        /**
         * Send changes to API.
         */
        $scope.$watch('roses', function() {
            if($scope.roses) {
                $http.post('http://127.0.0.1:3000/roses', $scope.roses);
            }
        })

        /**
         * Gets the Roses score.
         */
        function getRoses() {
            // If we're using the roses live scores.
            if (!$scope.roses.manualScore) {
                // Set HTTP headers.
                var config = {
                    headers:  {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
                
                // Get score.
                $http.get('https://roseslive.co.uk/score.json', config)
                .success(function(data) {
                    // Check roses live is being sensible.
                    if(isNaN(data.york) || isNaN(data.lancs)){
                        console.log("Roses live is giving us nonsense");
                        return;
                    };
                    
                    // Set scores.
                    $scope.roses.yorkScore = data.york;
                    $scope.roses.lancScore = data.lancs;

                    // Work out each team's progress towards a win.
                    calculateProgress();

                    // Send scores to API.
                    $http.post('http://127.0.0.1:3000/roses', $scope.roses);
                })
            } else {
                // Work out progress based on manual scores.
                calculateProgress();

                // Send scores to API.
                $http.post('http://127.0.0.1:3000/roses', $scope.roses).then(function (response) {
                    getRosesData();
                });
            }
        }

        /**
         * Works out each team's progress towards a win.
         */
        function calculateProgress() {
            if($scope.roses.totalPoints){
                $scope.roses.pointsToWin = (($scope.roses.totalPoints / 2 ) + 0.5)
            } else {
                $scope.roses.pointsToWin = 177.5;
            }

            // Work out progress and format values.
			$scope.roses.yorkProgress = (($scope.roses.yorkScore / $scope.roses.pointsToWin)*100).toFixed(2);
			$scope.roses.lancProgress = (($scope.roses.lancScore / $scope.roses.pointsToWin)*100).toFixed(2);
            $scope.roses.pointsToWin = $scope.roses.pointsToWin.toFixed(1);
        }

        /**
         * Gets scores/ graphics settings from API.
         */
        function getRosesData() {
            $http.get('http://127.0.0.1:3000/roses')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.roses = response.data;
                }
            })
        }
        
        // Get roses from API.
        getRosesData();

        // Get scores once every timeout period.
        setInterval(getRoses, data_timeout)
    }
]);

app.controller('footballCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedHome = localStorageService.get('home_football');
        var storedAway = localStorageService.get('away_football');

        if(storedHome === null) {
            $scope.homePlayers = [];
        } else {
            $scope.homePlayers = storedHome;
        }

        if(storedAway === null) {
            $scope.awayPlayers = [];
        } else {
            $scope.awayPlayers = storedAway;
        }

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.addHomePlayer = function() {
            $scope.homePlayers.push($scope.home);
            $scope.home = {};
        };

        $scope.addAwayPlayer = function() {
            $scope.awayPlayers.push($scope.away);
            $scope.away = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'away') {
                $scope.awayPlayers.splice(index, 1);
            } else if (team === 'home') {
                $scope.homePlayers.splice(index, 1);
            }
        };

        socket.on("football", function (msg) {
            $scope.football = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Football') {
                    if ($scope.football.show === true || $scope.football.showpre === true || $scope.football.showpost === true ) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        });

        $scope.$watch('football', function() {
            if ($scope.football) {
                socket.emit("football", $scope.football);
            } else {
                getFootballData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('away_football', $scope.awayPlayers);
            localStorageService.set('home_football', $scope.homePlayers);
        });

        function getFootballData() {
            socket.emit("football:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('rugbyCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedHome = localStorageService.get('home_rugby');
        var storedAway = localStorageService.get('away_rugby');

        if(storedHome === null) {
            $scope.homePlayers = [];
        } else {
            $scope.homePlayers = storedHome;
        }

        if(storedAway === null) {
            $scope.awayPlayers = [];
        } else {
            $scope.awayPlayers = storedAway;
        }

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.addHomePlayer = function() {
            $scope.homePlayers.push($scope.home);
            $scope.home = {};
        };

        $scope.addAwayPlayer = function() {
            $scope.awayPlayers.push($scope.away);
            $scope.away = {};
        };

        $scope.delete = function(team, index) {
            if(team === 'away') {
                $scope.awayPlayers.splice(index, 1);
            } else if (team === 'home') {
                $scope.homePlayers.splice(index, 1);
            }
        };

        socket.on("rugby", function (msg) {
            $scope.rugby = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'rugby') {
                    item.live = $scope.rugby.show
                }
            })
        });

        $scope.$watch('rugby', function() {
            if ($scope.rugby) {
                socket.emit("rugby", $scope.rugby);
            } else {
                getRugbyData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('away_rugby', $scope.awayPlayers);
            localStorageService.set('home_rugby', $scope.homePlayers);
        });

        function getRugbyData() {
            socket.emit("rugby:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('dartsCGController', ['$scope', 'socket',
    function($scope, socket) {
        socket.on("darts", function (msg) {
            $scope.darts = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Darts') {
                    item.live = $scope.darts.show
                }
            })
        });

        $scope.$watch('darts', function() {
            if ($scope.darts) {
                socket.emit("darts", $scope.darts);
            } else {
                getDartData();
            }
        }, true);

        function getDartData() {
            socket.emit("darts:get");
        }

        $scope.reset1 = function() {
            $scope.darts.score1 = 501;
        };

        $scope.reset2 = function() {
            $scope.darts.score2 = 501;
        };

        $scope.take1 = function(val) {
            if( val > 180) {
                $scope.last1 = "";
                return;
            }

            var tmp = $scope.darts.score1;
            var newScore = (tmp - val);

            if(newScore >= 0) {
                $scope.darts.score1 = newScore;
                $scope.last1 = "";
            }
        };

        $scope.take2 = function(val) {
            if( val > 180) {
                $scope.last2 = "";
                return;
            }

            var tmp = $scope.darts.score2;
            var newScore = (tmp - val);

            if(newScore >= 0) {
                $scope.darts.score2 = newScore;
                $scope.last2 = "";
            }
        };
    }
]);

app.controller('swimmingCGController', ['$scope', 'socket',
    function($scope, socket) {
        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.replace(/^0/, '');
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.resetLanes = function() {
            for (var i = 0; i < 8; i++){
                $scope.swimming.lanes[i] = {
                    id: i,
                    name: "",
                    team: ""
                };
            }
        };

        $scope.resetOrder = function() {
            $scope.swimming.laneOrder = [];
            $scope.swimming.order = "";
            $scope.swimming.prevOrderLength = 0;
        };

        socket.on("swimming", function (msg) {
            $scope.swimming = msg;
        });

        $scope.$watch('swimming', function() {
            if ($scope.swimming) {
                if($scope.swimming.prevOrderLength < $scope.swimming.order.length){                    
                    for (var i = $scope.swimming.prevOrderLength; i < Math.min($scope.swimming.order.length, 8); i++){
                        $scope.swimming.laneOrder[i] = {
                            lane: $scope.swimming.lanes[$scope.swimming.order[i] - 1],
                            time: $scope.clock
                        };
                    }

                    $scope.swimming.prevOrderLength = $scope.swimming.order.length;
                }

                if($scope.swimming.order.length > 0){

                }

                socket.emit("swimming", $scope.swimming);
            } else {
                getSwimmingData();
            }
        }, true);

        function getSwimmingData() {
            socket.emit("swimming:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('basketballCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedHome = localStorageService.get('home_basketball');
        var storedAway = localStorageService.get('away_basketball');

        if(storedHome === null) {
            $scope.homePlayers = [];
        } else {
            $scope.homePlayers = storedHome;
        }

        if(storedAway === null) {
            $scope.awayPlayers = [];
        } else {
            $scope.awayPlayers = storedAway;
        }

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.addHomePlayer = function() {
            $scope.homePlayers.push($scope.home);
            $scope.home = {};
        };

        $scope.addAwayPlayer = function() {
            $scope.awayPlayers.push($scope.away);
            $scope.away = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'away') {
                $scope.awayPlayers.splice(index, 1);
            } else if (team === 'home') {
                $scope.homePlayers.splice(index, 1);
            }
        };

        socket.on("basketball", function (msg) {
            $scope.basketball = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'basketball') {
                    item.live = $scope.basketball.show
                }
            })
        });

        $scope.$watch('basketball', function() {
            if ($scope.basketball) {
                socket.emit("basketball", $scope.basketball);
            } else {
                getBasketballData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('away_basketball', $scope.awayPlayers);
            localStorageService.set('home_basketball', $scope.homePlayers);
        });

        function getBasketballData() {
            socket.emit("basketball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('badmintonCGController', ['$scope', 'socket',
    function($scope, socket) {
        socket.on("badminton", function (msg) {
            $scope.badminton = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Badminton') {
                    item.live = $scope.badminton.show
                }
            })
        });

        $scope.resetGame1 = function() {
          $scope.badminton.game1 = 0;
        };

        $scope.resetGame2 = function() {
          $scope.badminton.game2 = 0;
        };

        $scope.resetPoint1 = function() {
          $scope.badminton.point1 = 0;
        };

        $scope.resetPoint2 = function() {
          $scope.badminton.point2 = 0;
        };

        $scope.$watch('badminton', function() {
            if ($scope.badminton) {
                socket.emit("badminton", $scope.badminton);
            } else {
                getBadmintonData();
            }
        }, true);

        function getBadmintonData() {
            socket.emit("badminton:get");
        }
    }
]);

app.controller('tennisCGController', ['$scope', 'socket',
    function($scope, socket) {
        // to make maths easier, we'll calculate points linearly and then map them to this array of tennis scores. Arrays start at 0!
        var pointNames = ['0', '15', '30', '40', 'AD']

        // usual functions to recieve/send data to the server
        socket.on("tennisOptions", function (msg) {
            $scope.tennisOptions = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Tennis') {
                    if ($scope.tennisOptions.showScore === true || $scope.tennisOptions.showSets === true || $scope.tennisOptions.showStats === true) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        });

        socket.on("tennisScore", function (msg) {
            $scope.tennisScore = msg;
        });

        $scope.$watch('tennisOptions', function() {
            if ($scope.tennisOptions) {
				if (($scope.tennisOptions.matchName).includes("Mixed")) {
					$scope.tennisOptions.player1 = socket.emit("teamName:home");
					$scope.tennisOptions.player2 = socket.emit("teamName:away");
				}else{
                    socket.emit("tennisOptions", $scope.tennisOptions);
                }
            } else {
                getTennisData();
            }
        }, true);

        socket.on("teamName:home", function(msg){
            $scope.tennisOptions.homeTeam = msg;
            socket.emit("tennisOptions", $scope.tennisOptions);
        });

        socket.on("teamName:away", function(msg){
            $scope.tennisOptions.awayTeam = msg;
            socket.emit("tennisOptions", $scope.tennisOptions);
        });

        $scope.$watch('tennisScore', function() {
            if ($scope.tennisScore) {
                socket.emit("tennisScore", $scope.tennisScore);
            } else {
                getTennisData();
            }
        }, true);

        // point scoring function - does all the complicated math for the user
        $scope.scorePoint = function(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            // increment number of serves for server by 1
            $scope.tennisScore['pointsServed' + $scope.tennisScore.server] ++;

            // if player was server, update serves won
            if (player == $scope.tennisScore.server) {
                if ($scope.tennisScore.firstFault) {
                    $scope.tennisScore['secondServeWon' + player] ++;
                } else {
                    $scope.tennisScore['firstServeWon' + player] ++;
                }
            }

            // clear any faults
            $scope.tennisScore.firstFault = false;

            if ($scope.tennisScore.tiebreak == true) {
                // tiebreak
                if ($scope.tennisScore['point' + player] >= 6 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                    // player already won at least 6 points, and now has 2 point advantage, so wins game
                    winGame(player);
                } else {
                    $scope.tennisScore['point' + player] ++;
                    $scope.tennisScore.pointName1 = $scope.tennisScore.point1;
                    $scope.tennisScore.pointName2 = $scope.tennisScore.point2;

                    // change server after every odd-numbered point played
                    if ((($scope.tennisScore['point' + player] + $scope.tennisScore['point' + opponent]) % 2) == 1) {
                        $scope.toggleServer();
                    }
                }
            } else {
                // normal game
                if ($scope.tennisScore['point' + player] >= 3 && $scope.tennisScore['point' + opponent] >= 3) {
                    // duece or advantage
                    if ($scope.tennisScore['point' + opponent] == 4) {
                        // opponent had advantage, so score now duece
                        $scope.tennisScore['point' + opponent] = 3;
                    } else if ($scope.tennisScore['point' + player] == 4) {
                        // player had advantage, so wins game
                        winGame(player);
                    } else {
                        // was duece, so player now has advantage
                        $scope.tennisScore['point' + player] = 4;
                    }
                } else if ($scope.tennisScore['point' + player] == 3) {
                    // player had 40, opponent 30 or less, so player wins game
                    winGame(player);
                } else {
                    // player had 30 or less, so add a point
                    $scope.tennisScore['point' + player] ++;
                }
                $scope.tennisScore.pointName1 = pointNames[$scope.tennisScore.point1];
                $scope.tennisScore.pointName2 = pointNames[$scope.tennisScore.point2];
            }

            $scope.tennisScore.pointsPlayed ++;
            $scope.tennisScore['pointsWon' + player] ++;

            checkTiebreak();
            checkGamePoint(player);
        };

        // ace point
        $scope.acePoint = function() {
            $scope.tennisScore['ace' + $scope.tennisScore.server] ++;
            $scope.scorePoint($scope.tennisScore.server);
        };

        // fault
        $scope.faultPoint = function() {
            if ($scope.tennisScore.firstFault) {
                // double fault
                $scope.tennisScore['singleFault' + $scope.tennisScore.server] --;
                $scope.tennisScore['doubleFault' + $scope.tennisScore.server] ++;

                // opponent scores a point
                var opponent = ($scope.tennisScore.server == 1 ? 2 : 1);
                $scope.scorePoint(opponent);
            } else {
                // first fault - set it to true
                $scope.tennisScore.firstFault = true;
                $scope.tennisScore['singleFault' + $scope.tennisScore.server] ++;
            }
        };

        function winGame(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            if ($scope.tennisScore.tiebreak == false) {
                if (player == $scope.tennisScore.server) {
					          // player was serving, and not in a tiebreak, count this as service game win
					          $scope.tennisScore['servicesWon' + player] ++;
				        } else {
					          // opponent was serving, and not in a tiebreak, count this as break point win
					          $scope.tennisScore['breaksWon' + player] ++;
                }

                // increment service games for server
                $scope.tennisScore['serviceGame' + $scope.tennisScore.server] ++;
            }

            // update the sets array
            $scope.tennisScore['sets' + player].splice(-1,1,($scope.tennisScore['game' + player] + 1));

            if ($scope.tennisScore.tiebreak == true) {
                // player won tiebreak game, so wins set
                winSet(player);
            } else if ($scope.tennisScore['game' + player] >= 5 && ($scope.tennisScore['game' + player] - $scope.tennisScore['game' + opponent]) >= 1) {
                // player already won at least 5 games, and now has 2 game advantage, so wins set
                winSet(player);
            } else {
                // player can't win set yet, so add a game and reset points
                $scope.tennisScore['game' + player] ++;
                resetPoints();
                $scope.toggleServer();
            }
        }

        function winSet(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            $scope.tennisScore['set' + player] ++;
            resetGames();

            if ($scope.tennisScore['set' + player] > ($scope.tennisOptions.maxSets - 1)/2) {
                // player already won (max - 1) sets, so wins match
                $scope.tennisOptions.disableInput = true;
            } else {
                // player can't win match yet, so add a set and reset games
                $scope.tennisScore['sets' + player].push(0);
                $scope.tennisScore['sets' + opponent].push(0);

                $scope.toggleServer();
            }
        }

        function resetPoints() {
            $scope.tennisScore.point1 = $scope.tennisScore.point2 = $scope.tennisScore.pointName1 = $scope.tennisScore.pointName2 = 0;
        }

        function resetGames() {
            $scope.tennisScore.game1 = $scope.tennisScore.game2 = 0;
            resetPoints();
        }

        $scope.toggleServer = function toggleServer() {
            $scope.tennisScore.server = ($scope.tennisScore.server == 1 ? 2 : 1);
        };

        function checkTiebreak() {
            if (($scope.tennisScore.set1 + $scope.tennisScore.set2) == ($scope.tennisOptions.maxSets - 1)) {
                // this is the last set, so tiebreak is not possible
                $scope.tennisScore.tiebreak = false;
            } else if ($scope.tennisScore.game1 == 6 && $scope.tennisScore.game2 == 6 ) {
                // not the last set, players tied on 6 games each, so tiebreak
                $scope.tennisScore.tiebreak = true;
            } else {
                // not a tiebreak
                $scope.tennisScore.tiebreak = false;
            }
        }

        function checkGamePoint(player) {
            var opponent = (player == 1 ? 2 : 1);

            // horrific (but nessesary) if/else function
            if ($scope.tennisScore.tiebreak == true) {

                if ($scope.tennisScore['point' + player] >= 6 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                    // tiebreak, so scoring player needs to have at least 6 points, with a 1 point advantage

                    if ($scope.tennisScore['set' + player] == ($scope.tennisOptions.maxSets - 1)/2) {
                        $scope.tennisScore.gamePoint = "Match Point";
                    } else {
                        $scope.tennisScore.gamePoint = "Set Point";
                    }

                } else if ($scope.tennisScore['point' + opponent] >= 6 && ($scope.tennisScore['point' + opponent] - $scope.tennisScore['point' + player]) >= 1) {
                    // tiebreak, not scoring player set/match point, so opponent needs to have at least 6 points, with a 1 point advantage

                    if ($scope.tennisScore['set' + opponent] == ($scope.tennisOptions.maxSets - 1)/2) {
                        $scope.tennisScore.gamePoint = "Match Point";
                    } else {
                        $scope.tennisScore.gamePoint = "Set Point";
                    }

                } else {
                    // tiebreak, point isn't special, so no message needed

                    $scope.tennisScore.gamePoint = "";

                }

            } else if ($scope.tennisScore['game' + player] >= 5 && ($scope.tennisScore['game' + player] - $scope.tennisScore['game' + opponent]) >= 1 && $scope.tennisScore['point' + player] >= 3 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                // normal game, so scoring player needs to have at least 5 games, with a 1 game advantage; and at least 40, with a 1 point advantage

                if ($scope.tennisScore['set' + player] == ($scope.tennisOptions.maxSets - 1)/2) {
                    $scope.tennisScore.gamePoint = "Match Point";
                } else {
                    $scope.tennisScore.gamePoint = "Set Point";
                }

                // check if this is also break point and increment
                if ($scope.tennisScore.server != player) {
                    $scope.tennisScore['breakPoint' + player] ++;
                }

            } else if ($scope.tennisScore['game' + opponent] >= 5 && ($scope.tennisScore['game' + opponent] - $scope.tennisScore['game' + player]) >= 1 && $scope.tennisScore['point' + opponent] >= 3 && ($scope.tennisScore['point' + opponent] - $scope.tennisScore['point' + player]) >= 1) {
                // normal game, not scoring player set/match point, so opponent needs to have at least 5 games, with a 1 game advantage; and at least 40, with a 1 point advantage

                if ($scope.tennisScore['set' + opponent] == ($scope.tennisOptions.maxSets - 1)/2) {
                    $scope.tennisScore.gamePoint = "Match Point";
                } else {
                    $scope.tennisScore.gamePoint = "Set Point";
                }

                // check if this is also break point and increment
                if ($scope.tennisScore.server != opponent) {
                    $scope.tennisScore['breakPoint' + opponent] ++;
                }

            } else if ($scope.tennisScore.server != player && $scope.tennisScore['point' + player] >= 3 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                // normal game, not a set/match point, so player needs be against the serve, have at least 40, with a 1 point advantage

                $scope.tennisScore.gamePoint = "Break Point";
                $scope.tennisScore['breakPoint' + player] ++;

            } else if ($scope.tennisScore.server != opponent && $scope.tennisScore['point' + opponent] >= 3 && ($scope.tennisScore['point' + opponent] - $scope.tennisScore['point' + player]) >= 1) {
                // normal game, not scoring player set/match point, so opponent needs be against the serve, have at least 40, with a 1 point advantage

                $scope.tennisScore.gamePoint = "Break Point";
                $scope.tennisScore['breakPoint' + opponent] ++;

            } else {
                // normal game, point isn't special, so no message needed

                $scope.tennisScore.gamePoint = "";

            }
        }

        $scope.undoPoint = function() {
            socket.emit("tennis:undo");
            $scope.tennisOptions.disableInput = false;
        }

        function getTennisData() {
            socket.emit("tennis:get");
        }

        $scope.resetAll = function() {
            socket.emit("tennis:reset");
            $("input[type='checkbox']").attr("checked", false);
        }

    }
]);

app.controller('netballCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedHome = localStorageService.get('home_netball');
        var storedAway = localStorageService.get('aways_netball');

        if(storedHome === null) {
            $scope.homePlayers = [];
        } else {
            $scope.homePlayers = storedHome;
        }

        if(storedAway === null) {
            $scope.awayPlayers = [];
        } else {
            $scope.awayPlayers = storedAway;
        }

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.addHomePlayer = function() {
            $scope.homePlayers.push($scope.home);
            $scope.home = {};
        };

        $scope.addAwayPlayer = function() {
            $scope.awayPlayers.push($scope.away);
            $scope.away = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'away') {
                $scope.awayPlayers.splice(index, 1);
            } else if (team === 'home') {
                $scope.homePlayers.splice(index, 1);
            }
        };

        socket.on("netball", function (msg) {
            $scope.netball = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Netball') {
                    item.live = $scope.netball.show
                }
            })
        });

        $scope.quarterChanged = function() {
            console.log("Quarter");
        };

        $scope.$watch('netball', function() {
            if ($scope.netball) {
                socket.emit("netball", $scope.netball);
            } else {
                getNetballData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('away_netball', $scope.awayPlayers);
            localStorageService.set('home_netball', $scope.homePlayers);
        });

        function getNetballData() {
            socket.emit("netball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('waterpoloCGController', ['$scope', 'localStorageService', 'socket',
  function($scope, localStorageService, socket){
    var storedHome = localStorageService.get('home_waterpolo');
    var storedAway = localStorageService.get('away_waterpolo');
    var clockIcon = 'pause icon'

    if(storedHome === null) {
        $scope.homePlayers = [];
    } else {
        $scope.homePlayers = storedHome;
    }

    if(storedAway === null) {
        $scope.awayPlayers = [];
    } else {
        $scope.awayPlayers = storedAway;
    }

    socket.on("clock:tick", function (msg) {
        $scope.clock = msg.slice(0, msg.indexOf("."));
    });

    $scope.pauseClock = function() {
        socket.emit("clock:pause");
    };

    $scope.resetClock = function() {
        socket.emit("clock:reset");
    };

    $scope.setClock = function(val) {
        socket.emit("clock:set", val);
    };

    $scope.downClock = function() {
        socket.emit("clock:down");
    };

    $scope.upClock = function() {
        socket.emit("clock:up");
    };

    $scope.addHomePlayer = function() {
        $scope.homePlayers.push($scope.home);
        $scope.home = {};
    };

    $scope.addAwayPlayer = function() {
        $scope.awayPlayers.push($scope.away);
        $scope.away = {};
    };

    $scope.delete = function(team, index) {
        console.log('delete');
        if(team === 'away') {
            $scope.awayPlayers.splice(index, 1);
        } else if (team === 'home') {
            $scope.homePlayers.splice(index, 1);
        }
    };

    socket.on("waterpolo", function (msg) {
        $scope.waterpolo = msg;
        $scope.menu.forEach(item => {
            if (item.name === 'Waterpolo') {
                item.live = $scope.waterpolo.show
            }
        })
    });

    $scope.$watch('waterpolo', function() {
        if ($scope.waterpolo) {
            socket.emit("waterpolo", $scope.waterpolo);
        } else {
            getWaterpoloData();
        }
    }, true);

    $scope.$on("$destroy", function() {
        localStorageService.set('away_waterpolo', $scope.awayPlayers);
        localStorageService.set('home_waterpolo', $scope.homePlayers);
    });

    function getWaterpoloData() {
        socket.emit("waterpolo:get");
        socket.emit("clock:get");
    }
  }
]);

app.controller('volleyballCGController', ['$scope', 'socket',
    function($scope, socket){
        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.updateScore = function() {
            console.log("Score");
        };

        $scope.roundChanged = function() {
            console.log("Round");
        };

        socket.on("volleyball", function (msg) {
            $scope.volleyball = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Volleyball') {
                    item.live = $scope.volleyball.showScore
                }
            })
        });

        $scope.$watch('volleyball', function() {
            if ($scope.volleyball) {
                socket.emit("volleyball", $scope.volleyball);
            } else {
                getVolleyballData();
            }
        }, true);

        function getVolleyballData() {
            socket.emit("volleyball:get");
            socket.emit("clock:get");
        }
    }
]);
