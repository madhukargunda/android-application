(function() {
  angular.module("starter").controller("HomeController", function($scope) {
    $scope.goBack = function() {
      window.history.back();
    };
    $scope.navigateToMap = function(type) {
      //https://github.com/dpa99c/phonegap-launch-navigator
      var location = [];
      if(type === "groom") {
        location = [9.5395581,78.592895];
      }
      else if(type === "bride") {
        location = [9.543527,78.596746];
      }
      if(location.length === 2) {
        launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function(isAvailable){
            var app;
            if(isAvailable){
                app = launchnavigator.APP.GOOGLE_MAPS;
            }else{
                console.warn("Google Maps not available - falling back to user selection");
                app = launchnavigator.APP.USER_SELECT;
            }
            launchnavigator.navigate(location, {
                app: app
            });
        });
      }
    };
  });
})();
