var app = angular.module('cgApp', ['ngAnimate', 'socket-io']);
var data_timeout = 1000;

app.controller('lowerThirdsCtrl', ['$scope', 'socket', '$http',
    function($scope, socket, $http){
        function getLowerThirds() {
            $http.get('http://127.0.0.1:3000/lower-third')
            .then(function(response){
                if (response.status == 200 && response.data) {
                    $scope.lowerThirds = response.data;
                }
            })
        }

        setInterval(getLowerThirds, data_timeout);
    }
]);

app.controller('archeryCtrl', ['$scope', '$http',
    function ($scope, $http) {
        function getArchery() {
            $http.get('http://127.0.0.1:3000/sport/archery')
            .then(function(response){
                if (response.status == 200 && response.data) {
                    $scope.archery = response.data;
                }
            })
        }

        setInterval(getArchery, data_timeout);
    }
]);


/**
 * Bug controller.
 */
app.controller('boxingCtrl', ['$scope', '$http',
    function ($scope, $http) {

        /**
         * Gets the state of boxing from the API.
         */
        function getBoxingData() {
            $http.get("http://127.0.0.1:3000/sport/boxing")
                .then(function (response) {
                    if (response.status == 200) {
                        // Only update if the new data is different.
                        if ($scope.boxing != response.data) {
                            $scope.boxing = response.data
                        }
                    }
                })
        };

        // Get bug data once every timeout period.
        setInterval(getBoxingData, data_timeout);
    }
]);

/**
 * Bug controller.
 */
app.controller('bugCtrl', ['$scope', '$timeout', '$http',
    function($scope, $timeout, $http){
        $scope.tickInterval = 1000; //ms

        /**
         * Gets the state of the bug from the API.
         */
        function getBugData() {
            $http.get("http://127.0.0.1:3000/bug")
            .then(function(response){
                if (response.status == 200) {
                    // Only update if the new data is different.
                    if ($scope.bug != response.data) {
                        $scope.bug = response.data
                    }
                }
            })
        };

        /**
         * Updates the clock.
         */
        var tick = function () {
            $scope.clock = Date.now(); // Get the current time.
            $timeout(tick, $scope.tickInterval); // Reset the timer.
        };

        // Start the timer.
        $timeout(tick, $scope.tickInterval);

        // Get bug data once every timeout period.
        setInterval(getBugData, data_timeout);
    }
]);

/**
 * Roses score.
 */
app.controller('scoringCtrl', ['$scope', '$http',
    function($scope, $http){
        $scope.roses = {}

        /**
         * Gets the score from API.
         */
        function getRoses() {
            $http.get('http://127.0.0.1:3000/roses')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.roses = response.data;
                }
            })
        }

        // Get Roses data once every timeout period.
        setInterval(getRoses, data_timeout);
    }
]);

app.controller('footballCtrl', ['$scope', '$http',
    function($scope, $http){

        function getFootball() {
            $http.get('http://127.0.0.1:3000/sport/football')
            .then(function(response){
                if (response.status == 200 && response.data) {
                    $scope.football = response.data;
                }
            })
        }

        setInterval(getFootball, data_timeout);
    }
]);

app.controller('rugbyCtrl', ['$scope', '$http',
    function ($scope, $http) {

        function getRugby() {
            $http.get('http://127.0.0.1:3000/sport/rugby')
                .then(function (response) {
                    if (response.status == 200 && response.data) {
                        $scope.rugby = response.data;
                    }
                })
        }

        setInterval(getRugby, data_timeout);
    }
]);

app.controller('dartsCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("darts", function (msg) {
            $scope.darts = msg;
        });

        $scope.$watch('darts', function() {
            if (!$scope.darts) {
                getDartData();
            }
        }, true);

        function getDartData() {
            socket.emit("darts:get");
        }
    }
]);

/**
 * Grid
 */
app.controller('gridCtrl', ['$scope', 'socket', '$http',
    function($scope, socket, $http){
        $scope.grid = {}

        // Lock changes to the scope so that the grid is not update multiple times, causing ng-repeat issues.
        $scope.lock = false;

        /**
         * Gets the state of the grid.
         */
        function getGrid() {
            if (!$scope.lock) {
                // Lock changes.
                $scope.lock = true;

                $http.get('http://127.0.0.1:3000/grid')
                .then(function(response) {
                    // Check for a valid response.
                    if (response.status == 200 && response.data) {

                        // Set 'easy' properties.
                        $scope.grid.headingcolor = response.data.headingcolor;
                        $scope.grid.leftcolor = response.data.leftcolor;
                        $scope.grid.rightcolor = response.data.rightcolor;
                        $scope.grid.header = response.data.header;
                        $scope.grid.position = response.data.position;
                        $scope.grid.split = response.data.split;
                        $scope.grid.show = response.data.show;

                        // If the rows have not changed, no changes are needed.
                        if (!rowsEquivalent(response.data.rows)) {
                            // If the grid is currently shown, we need to hide it to update it.
                            if ($scope.grid.show === true) {
                                $scope.grid.show = false;
                                $scope.grid.rows = [];

                                // Wait until the grid is hidden. ng-repeat causes issues if we update while the grid is shown.
                                setTimeout(function() {
                                    $scope.grid.rows = response.data.rows;
                                    $scope.grid.show = true;

                                    $scope.lock = false;
                                }, 2000)
                            } else {
                                // If the grid is currently hidden, we can just update it.
                                $scope.grid.rows = response.data.rows;

                                $scope.lock = false;
                            }
                        } else {
                            $scope.lock = false;
                        }
                    } else {
                        $scope.lock = false;
                    }
                })
            }
        }

        /**
         * Returns true if the rows are equivalent to the currently displayed rows.
         * @param {} rows
         */
        function rowsEquivalent(rows) {
            if (!$scope.grid.rows) {
                return false
            }

            if (rows.length != $scope.grid.rows.length) {
                return false
            }

            for (var i = 0; i < $scope.grid.rows.length; i++) {
                if (rows[i].right != $scope.grid.rows[i].right) {
                    return false;
                }

                if (rows[i].left != $scope.grid.rows[i].left) {
                    return false;
                }
            }

            return true;
        }

        // Call getGrid once every data timeout period.
        setInterval(getGrid, data_timeout);
    }
]);

app.controller('swimmingCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("swimming", function (msg) {
            $scope.swimming = msg;
        });

        $scope.clockMin = "0";
        $scope.clockSec = "00";
        $scope.clockDec = "0";

        socket.on("clock:tick", function (msg) {
            $scope.clockMin = msg.slice(0,msg.indexOf(":")).replace(/^0/, '');
            $scope.clockSec = msg.slice(msg.indexOf(":")+1,msg.indexOf("."));
            $scope.clockDec = msg.slice(msg.indexOf(".")+1);
        });

        $scope.$watch('swimming', function() {
            if (!$scope.swimming) {
                getSwimmingData();
            }
        }, true);

        function getSwimmingData() {
            socket.emit("swimming:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('basketballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("basketball", function (msg) {
            $scope.basketball = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('basketball', function() {
            if (!$scope.basketball) {
                getBasketballData();
            }
        }, true);

        function getBasketballData() {
            socket.emit("basketball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('badmintonCtrl', ['$scope', '$http',
    function ($scope, $http) {
        function getBadminton() {
            $http.get('http://127.0.0.1:3000/sport/badminton')
                .then(function (response) {
                    if (response.status == 200 && response.data) {
                        $scope.badminton = response.data;
                    }
                })
        }

        setInterval(getBadminton, data_timeout);
    }
]);

app.controller('tennisCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("tennisOptions", function (msg) {
            $scope.tennisOptions = msg;
        });

        socket.on("tennisScore", function (msg) {
            $scope.tennisScore = msg;
        });

        $scope.$watch('tennisOptions', function() {
            if (!$scope.tennisScore) {
                getTennisData();
            }
        }, true);

        $scope.$watch('tennisScore', function() {
            if (!$scope.tennisScore) {
                getTennisData();
            }
        }, true);

        function getTennisData() {
            socket.emit("tennis:get");
        }
    }
]);

app.controller('netballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("netball", function (msg) {
            $scope.netball = msg;

            if ($scope.netball.firstpasshome == true) {
            	$scope.netball.homeoffset = 1;
            }

            if ($scope.netball.firstpasshome == true & $scope.netball.firstpassaway == true) {
            	$scope.netball.homeoffset = 0;
            }

            $scope.TotalScore = $scope.netball.awayScore + $scope.netball.homeScore + $scope.netball.homeoffset;
			if (($scope.TotalScore % 2) == 1) {
						$scope.showcurrenthome = true;
						$scope.showcurrentaway = false;
				} else {
						$scope.showcurrenthome = false;
						$scope.showcurrentaway = true;
					}
			});

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('netball', function() {
            if (!$scope.netball) {
                getNetballData();
            }
        }, true);

        function getNetballData() {
            socket.emit("netball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('waterpoloCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("waterpolo", function (msg) {
            $scope.waterpolo = msg;
			});

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('waterpolo', function() {
            if (!$scope.waterpolo) {
                getWaterpoloData();
            }
        }, true);

        function getWaterpoloData() {
            socket.emit("waterpolo:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('volleyballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("volleyball", function (msg) {
            $scope.volleyball = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('volleyball', function() {
            if (!$scope.volleyball) {
                getVolleyballData();
            }
        }, true);

        function getVolleyballData() {
            socket.emit("volleyball:get");
            socket.emit("clock:get");
        }
    }
]);


/* Very WIP, please refactor this! */
app.controller('clockCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.stopwatch = []

        function getStopwatch() {
            $http.get('http://127.0.0.1:3000/stopwatch')
                .then(function (response) {
                    if (response.status == 200 && response.data) {
                        $scope.stopwatchState = response.data;
                        updateState();
                    }
                })
        }

        setInterval(getStopwatch, 1000);

        var stopwatch = Stopwatch();

        function updateState() {
            switch ($scope.stopwatchState.direction) {
                case "up":
                    stopwatch.countUp();
                    break;
                case "down":
                    stopwatch.countDown();
                    break;
            }
            if ($scope.stopwatchState.isRunning) {
                stopwatch.start()
            } else {
                stopwatch.stop()
            }
            stopwatch.setValue($scope.stopwatchState.time)
        }

        function formatTime(time) {
            var remainder = time,
                numHours,
                numMinutes,
                numSeconds,
                numDeciseconds,
                output = "";

            //numHours = String(parseInt(remainder / this.hour, 10));
            //remainder -= this.hour * numHours;

            numMinutes = String(parseInt(remainder / this.minute, 10));
            remainder -= this.minute * numMinutes;

            numSeconds = String(parseInt(remainder / this.second, 10));
            remainder -= this.second * numSeconds;

            numDeciseconds = String(parseInt(remainder / this.decisecond, 10));

            output = [numMinutes, numSeconds].map(function (str) {
                if (str.length === 1) {
                    str = "0" + str;
                }
                return str;
            }).join(":");
            output = [output, numDeciseconds].join(".");

            return output;
        };

        function onTick() {
            if (this.setCountMode === "down") {
                this.time = this.time - this.decisecond;
            } else {
                this.time += this.decisecond;
            }

            if (this.time <= 0) {
                this.stop();
            }
            this.updateScope();
        };


        function Stopwatch() {
            if(false === (this instanceof Stopwatch)) {
                return new Stopwatch();
            }

            this.hour = 3600000;
            this.minute = 60000;
            this.second = 1000;
            this.decisecond = 100;
            this.time = 0;
            this.interval = undefined;
            this.setCountMode = "up";
            this.isTicking = false;
            this.formatTime = formatTime.bind(this)
            this.onTick = onTick.bind(this)

        };



        Stopwatch.prototype.setValue = function(val) {
            var pattern = /^(?:(?:(?:(\d+):)?(\d+):)?(\d+)(?:\.(\d))?)$/;
            var match = pattern.exec(val);
            if (!match) {
                // ignore invalid value
                return;
            }

            this.time = (this.hour * parseInt(match[1])||0) + (this.minute * parseInt(match[2])||0) + (this.second * parseInt(match[3])||0) + (this.decisecond * parseInt(match[4])||0);
            if (!this.isTicking) {
                // Only correct for drift against the master clock if we've stopped.
                this.updateScope()
            }
        }

        Stopwatch.prototype.start = function() {
            if (this.interval) {
                return;
            }

            // note the use of _.bindAll in the constructor
            // with bindAll we can pass one of our methods to
            // setInterval and have it called with the proper 'this' value
            this.interval = setInterval(this.onTick, this.decisecond);

            this.isTicking = true;
        };

        Stopwatch.prototype.stop = function() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = undefined;
            }
            this.isTicking = false;
        };

        Stopwatch.prototype.pause = function() {
            console.log('Pause Stopwatch!');
            if (this.interval) {
                this.stop();
            } else {
                this.start();
            }
        };

        Stopwatch.prototype.countUp = function() {
            this.setCountMode = "up";
        }

        Stopwatch.prototype.countDown = function() {
            this.setCountMode = "down";
        }


        Stopwatch.prototype.getTime = function () {
            return this.formatTime(this.time);
        };

        Stopwatch.prototype.updateScope = function () {
            time = this.getTime()
            $scope.stopwatch.time = time
            $scope.stopwatch.short = time.slice(0, time.indexOf("."));
            $scope.stopwatch.secs = this.time;
            try {
                $scope.$digest()
            } catch {
                //ignore
            }

        };

        Stopwatch.prototype.getMins = function () {
            time = this.getTime()
            return time.slice(0, time.indexOf(":"));
        };

        Stopwatch.prototype.getDirection = function () {
            return this.setCountMode;
        };

        Stopwatch.prototype.isRunning = function () {
            return this.isTicking;
        }
    }
]);
