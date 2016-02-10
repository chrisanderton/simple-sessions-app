angular.module('nibs.settings', [])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/settings.html",
                        controller: "SettingsCtrl"
                    }
                }
            })

    })

    .controller('SettingsCtrl', function ($scope, $rootScope, $window, $ionicPopup, $document, $state, Activity, Picture) {

        $scope.deleteActivities = function() {
            Activity.deleteAll().success(function() {
                $rootScope.user.status = 1;
                $ionicPopup.alert({title: 'Nibs', content: 'Activities deleted'});
            });
        };

        $scope.deletePictures = function() {
            Picture.deleteAll().success(function() {
                $ionicPopup.alert({title: 'Nibs', content: 'Pictures deleted'});
            });
        };

        $scope.logout = function() {
            $rootScope.user = null;
            $window.localStorage.removeItem('user');
            $window.localStorage.removeItem('token');
            $state.go('app.welcome');
        };

    });