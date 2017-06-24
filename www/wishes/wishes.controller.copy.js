(function() {
  angular.module("starter").controller("WishesController", function($scope, $firebase, $firebaseObject, $firebaseArray, $ionicLoading, $timeout) {
    $scope.wish = {};
    $scope.disableSend = false;
    $scope.showStatus = false;

    function initFirebase() {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBzfXN7_0wYOsF6HR7UhPCZST1OYkpqqq0",
        authDomain: "jwedsb-cb98f.firebaseapp.com",
        databaseURL: "https://jwedsb-cb98f.firebaseio.com",
        projectId: "jwedsb-cb98f",
        storageBucket: "jwedsb-cb98f.appspot.com",
        messagingSenderId: "300354429526"
      };
      firebase.initializeApp(config);
      console.log("Init firebase success ");
      console.log(firebase);
      //alert("init db ok");
      //writeUserData();
      //readData();
      checkLocal();
      //saveUsingJS();
      addData({"sender": "test", "content": "also test"});
    };

    function checkLocal() {
      console.log(JSON.stringify(localStorage.getItem("firebase:previous_websocket_failure")));
      alert(localStorage.getItem("firebase:previous_websocket_failure"));
      if(localStorage.getItem("firebase:previous_websocket_failure")) {
        localStorage.removeItem("firebase:previous_websocket_failure");
      }
    }

    function saveUsingJS() {
      var favMovies = firebase.database().ref();
      favMovies.push({
        name: "movieName123"
      });
    }

    function addData(wish) {
      //https://www.firebase.com/docs/web/libraries/ionic/guide.html
      //https://stackoverflow.com/questions/32343417/duplicate-data-on-push-add-to-firebase-using-angularfire
      var ref = firebase.database().ref();
      var list = $firebaseArray(ref);
      $scope.disableSend = true;
      list.$add(wish).then(function(ref) {
        $scope.disableSend = false;
        console.log(ref);
        $scope.wish = {};

        //$ionicLoading.show({ template: 'Successfully sent', noBackdrop: true, duration: 2000 });
        $scope.showStatus = true;
        $timeout(function() {
          $scope.showStatus = false;
        }, 2000);
        //var id = ref.key();
        //console.log("added record with id " + id);
        //list.$indexFor(id); // returns location in the array
      });
    }

    function readData() {
      var ref = firebase.database().ref();
      // download the data into a local object
      console.log("got firebase ref " + ref);
      var data = $firebaseArray(ref);
      console.log("got firebase data " + JSON.stringify(data));
      //alert("reading data");
      data.$loaded().then(function() {
        console.log("data loaded " + JSON.stringify(data));
        //alert("read succ");
        console.log("loaded record:", data.$id, data);
       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(data, function(value, key) {
          console.log(key, value);
       });
      }).catch(function(err) {
        console.error(err);
      });
    };

    $scope.sendWish = function() {
      addData($scope.wish);
    };

    console.log(initFirebase());

  });
})();
