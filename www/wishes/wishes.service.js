(function() {
  angular.module("starter").service("wishesService", function($timeout, $http, $q) {
    var self = this;
    this.qbToken = null;

    // <uses-permission android:name="android.permission.INTERNET" />
    // <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    var APP_CONFIG = {
     endpoints: {
         api: "api.quickblox.com", // set custom API endpoint
         chat: "chat.quickblox.com" // set custom Chat endpoint
     },
     chatProtocol: {
         websocket: "wss://chat.quickblox.com:5291",
         bosh: "https://chat.quickblox.com:5281",
         active: 1 // set 1 to use BOSH, set 2 to use WebSockets (default)
     }
    //debug: {mode: 1} // set DEBUG mode
  };
  var CREDENTIALS = {
      appId: 59568,
      authKey: 'x2COSvLGyv7gvA-',
      authSecret: 'GWLFeWY2NYpkykB'
  };

  var config = {
      on: {
          //callback function for session expiration
          sessionExpired: function() {
              console.log("session expired");
              self.qbToken = null;
          }
      }
  };

  var settings = {};
  settings["APP_CONFIG"] = APP_CONFIG;
  settings["CREDENTIALS"] = CREDENTIALS;
  settings.APP_CONFIG.on = config.on;
  QB.init(settings.CREDENTIALS.appId, settings.CREDENTIALS.authKey, settings.CREDENTIALS.authSecret, settings.APP_CONFIG);

  this.createSession = function(sendMessage) {
    var deferred = $q.defer();
    var user = {
      id: 29226952,
      name: 'Madhukar',
      login: 'madhukar.b4u@gmail.com',
      pass: 'madhukar'
    };

    QB.createSession({login: user.login, password: user.pass}, function(err, res) {
      if (res) {
        console.log("session created");
        console.log(JSON.stringify(res));
        self.qbToken = res.token;
        deferred.resolve(res);
      }
      else {
        console.log(JSON.stringify(err));
        deferred.reject(err);
      }
    });
    return deferred.promise;
  };

  this.sendMessage = function(wish) {
    var deferred = $q.defer();
    $http({
      method : "POST",
      url : "https://api.quickblox.com/chat/Message.json",
      headers: {
       'Content-Type': 'application/json',
       'QB-Token': self.qbToken
     },
     data: wish
    }).then(function mySuccess(response) {
        deferred.resolve(response);
      }, function myError(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    function getService() {
      $http({
        method : "GET",
        url : "https://jsonplaceholder.typicode.com/posts/1"
      }).then(function mySuccess(response) {
        console.log(JSON.stringify(response));

      }, function myError(error) {
        console.log(JSON.stringify(error));
      });
    };
    //getService();

    this.getAllWishes = function() {
      var deferred = $q.defer();
      $http({
        method : "GET",
        url : "https://api.quickblox.com/chat/Message.json?chat_dialog_id=5953c3b0a0eb474b82c08a53&sort_desc=date_sent",
        headers: {
         'Content-Type': 'application/json',
         'QB-Token': self.qbToken
       }
      }).then(function mySuccess(response) {
          deferred.resolve(response);
        }, function myError(error) {
          deferred.reject(error);
        });
        return deferred.promise;
    };

  });
})();
