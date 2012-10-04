function TimerCntl($scope, $timeout) {
  
  var start_time, timeout_promise;
  $scope.time = undefined;
  $scope.target_seconds = 100;
  $scope.state = "rest";
  
  function heartbeat() {
    $scope.time = Math.floor($scope.target_seconds - (Date.now() - start_time) / 1000);
    if ($scope.time > 0) {
      timeout_promise = $timeout(heartbeat, 100);
    } else {
      alarm();
    }
  }
  
  function reset() {
    $timeout.cancel(timeout_promise);
    $scope.state = "rest";
    $scope.time = undefined;
  }
  
  function start() {
    $scope.state = "counting-down";
    start_time = Date.now();
    timeout_promise = heartbeat();
  }
  
  function alarm() {
    $scope.state = "complete";
    alert("LIFT OFF!");
  }
  
  $scope.start_reset = function() {
    if ($scope.state === "rest") {
      start();
    } else {
      reset();
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