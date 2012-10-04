function TimerCntl($scope, $timeout) {
  
  var start_time, timeout_promise;
  $scope.time = undefined;
  $scope.target_seconds = 100;
  $scope.state = "rest";
  
  var heartbeat = function() {
    $scope.time = Math.floor((Date.now() - start_time) / 1000);
    timeout_promise = $timeout(heartbeat, 1000);
  };
  
  $scope.start_reset = function() {
    if ($scope.state === "rest") {
      $scope.state = "counting-down";
      start_time = Date.now();
      timeout_promise = heartbeat();
    } else {
      $timeout.cancel(timeout_promise);
      $scope.state = "rest";
      $scope.time = undefined;
    }
  };
  
  $scope.start_reset_label = function() {
    if ($scope.state === "rest") {
      return "Start";
    } else {
      return "Reset";
    }
  }
}