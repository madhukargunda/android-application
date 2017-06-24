(function() {
  angular.module("starter").controller("WishesController", function($scope, $ionicLoading, $timeout, $http, wishesService, $ionicPlatform, $state) {
    $scope.wish = {};
    $scope.disableSend = false;
    $scope.showStatus = false;
    $scope.statusMessage = "Successfully Sent";
    $scope.isLoading = false;
    $scope.wishes = [];

    $scope.goBack = function() {
      window.history.back();
    };

    function showStatus(time) {
      if(!time) {
        time = 2000;
      }
      $scope.showStatus = true;
      $timeout(function() {
        $scope.showStatus = false;
      }, time);
    };

    function saveMessageId(id) {
      var messageIds = JSON.parse(localStorage.getItem("messageIds"));
      if(messageIds) {
        messageIds.push(id);
      }
      else {
        messageIds = [];
        messageIds.push(id);
      }
      localStorage.setItem("messageIds", JSON.stringify(messageIds));
    };

    $scope.sendWish = function() {
      var wish = {
        "chat_dialog_id": "5953c3b0a0eb474b82c08a53",
        "message": $scope.wish.content,
        "senderName": $scope.wish.sender,
        "wish": $scope.wish.content
      };
      if(wishesService.qbToken) {
        $scope.isLoading = true;
        $scope.disableSend = true;
        wishesService.sendMessage(wish).then(function(success) {
          checkTokenAndGetWishes();
          console.log(success);
          saveMessageId(success.data._id);
          $scope.isLoading = false;
          $scope.statusMessage = "Successfully Sent";
          $scope.wish = {};
          $scope.disableSend = false;
          showStatus(2000);
        }, function(error) {
          $scope.isLoading = false;
          $scope.disableSend = false;
          $scope.statusMessage = "Something went wrong. Please try again later. Make sure you have internet connection.";
          showStatus(5000);
        })
      }
      else {
        $scope.isLoading = true;
        $scope.disableSend = true;
        wishesService.createSession().then(function(success) {
          wishesService.sendMessage(wish).then(function(succ) {
            checkTokenAndGetWishes();
            console.log(succ.data._id);
            saveMessageId(succ.data._id);
            $scope.isLoading = false;
            $scope.statusMessage = "Successfully Sent";
            $scope.wish = {};
            $scope.disableSend = false;
            showStatus(2000);
          }, function(error) {
            $scope.isLoading = false;
            $scope.disableSend = false;
            console.error(error);
            $scope.statusMessage = "Something went wrong. Please try again later. Make sure you have internet connection.";
            showStatus(5000);
          });
        }, function(error) {
          $scope.isLoading = false;
          $scope.disableSend = false;
          console.error(error);
          $scope.statusMessage = "Something went wrong. Please try again later. Make sure you have internet connection.";
          showStatus(5000);
        });
      }
    };

    function getAllWishes() {
      wishesService.getAllWishes().then(function(success) {
        console.log(success.data.items);
        $scope.wishes = success.data.items;
      }, function(error) {
        console.log(error);
      });
    };

    function checkTokenAndGetWishes() {
      if(wishesService.qbToken) {
        getAllWishes();
      }
      else {
        wishesService.createSession().then(function(success) {
          getAllWishes();
        }, function(error) {
          $scope.disableSend = false;
          console.error(error);
          $scope.statusMessage = "Something went wrong. Please try again later. Make sure you have internet connection.";
          showStatus(2000);
        });
      }
    };
    checkTokenAndGetWishes();
    $ionicPlatform.ready(function() {
      var element = document.getElementsByClassName('bg-gradient-content1')[0];
      console.log(element.offsetHeight);

      var title = document.getElementById('titlejb');
      console.log(title.offsetHeight);

      var form = document.getElementsByClassName('wish-form')[0];
      console.log(form.offsetHeight);

      var others = title.offsetHeight + form.offsetHeight;

      var wishes = document.getElementsByClassName("wishes")[0];
      wishes.style.height = element.offsetHeight - others - 20 + "px";
      //console.log();
      //alert(fullHeight);
    });

    $scope.wishDetail = function(wish) {
      wishesService.current = wish;
      $state.go("wishdetail");
    };


  });
})();
