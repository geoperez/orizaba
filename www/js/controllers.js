angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $cordovaGeolocation, $rootScope, $cordovaPush) {
    document.addEventListener("deviceready", function () {
            $cordovaPush.register({ "senderID": "dev-firmament-94618", }).then(function(result) {
                alert("OKSending");
            }, function(err) {
                alert("ErrorSending");
            });

            $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
                switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        $scope.notificationResult = 'registration ID = ' + notification.regid;
                    }
                    break;

                case 'message':
                    alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                    break;

                case 'error':
                    alert('GCM error = ' + notification.msg);
                    break;

                default:
                    alert('An unknown GCM event has occurred');
                    break;
                }
            });
        });

    $cordovaGeolocation.watchPosition({
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
    }).then(
        null,
        function(err) {
            $scope.gpsError = err;
        },
        function(position) {
            $scope.lat = position.coords.latitude;
            $scope.long = position.coords.longitude;
        });
})
    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
          { title: 'Reggae', id: 1 },
          { title: 'Chill', id: 2 },
          { title: 'Dubstep', id: 3 },
          { title: 'Indie', id: 4 },
          { title: 'Rap', id: 5 },
          { title: 'Cowbell', id: 6 }
        ];
    })

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});