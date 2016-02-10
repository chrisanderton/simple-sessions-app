angular.module('nibs.profile', ['nibs.config', 'nibs.status'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/profile.html",
                        controller: "ProfileCtrl"
                    }
                }
            })

            .state('app.edit-profile', {
                url: "/edit-profile",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/edit-profile.html",
                        controller: "EditProfileCtrl"
                    }
                }
            })

    })

    // Services
    .factory('User', function ($http, $rootScope) {
        return {
            get: function () {
                return $http.get($rootScope.server.url + '/users/me', null)
            },

            update: function (user) {
                return $http.put($rootScope.server.url + '/users/me', user)
            }
        };

    })

    //Controllers
    .controller('ProfileCtrl', function ($rootScope, $scope, $state, User) {

        User.get().success(function(user) {
            $rootScope.user = user;
        });

        $scope.popupDialog = function() {

            if (navigator.notification) {
                navigator.notification.alert(
                    'You have a new message!',  // message
                    function() {                // callback
                        $state.go('app.messages');
                    },
                    'Nibs',                     // title
                    'Open Inbox'             // buttonName
                );
            } else {
                alert('You have a new message!');
                $state.go('app.messages');
            }

        }

    })

    .controller('EditProfileCtrl', function ($scope, $window, $ionicPopup, User) {

        User.get().success(function(user) {
            $scope.user = user;
        });

        $scope.panel = 1;

        $scope.update = function () {
            User.update($scope.user).success(function() {
                Status.show('Your profile has been saved.');
            })
        };

    });
