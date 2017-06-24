(function() {
  angular.module("starter").controller("WishdetailController", function($scope, wishesService) {
    $scope.wishdetail = wishesService.current;

  
  });
})();
