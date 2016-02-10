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

    .controller('SettingsCtrl', function ($scope, $rootScope, $window, $ionicPopup, $document, $state) {

        $scope.logout = function() {
            $rootScope.user = null;
            $window.localStorage.removeItem('user');
            $window.localStorage.removeItem('token');
            $state.go('app.welcome');
        };

    });