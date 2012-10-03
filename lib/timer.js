function TimerCntl($scope, $timeout) {
  
  var start_time = Date.now();
  $scope.time = 100;
  
  var heartbeat = function() {
    $scope.time = Math.floor((Date.now() - start_time) / 1000);
    $timeout(heartbeat, 1000);
  };
  heartbeat();
}