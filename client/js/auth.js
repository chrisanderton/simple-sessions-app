angular.module('nibs.auth', ['nibs.config'])

    /*
     * Routes
     */
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/login.html",
                        controller: "LoginCtrl"
                    }
                }
            })

            .state('app.logout', {
                url: "/logout",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/welcome.html",
                        controller: "LogoutCtrl"
                    }
                }
            })

            .state('app.signup', {
                url: "/signup",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/signup.html",
                        controller: "SignupCtrl"
                    }
                }
            })

    })

    /*
     * REST Resources
     */
    .factory('Auth', function ($http, $window, $rootScope) {

        return {
            login: function (user) {
                return $http.post($rootScope.server.url + '/login', user)
                    .success(function (data) {
                        $rootScope.user = data.user;
                        $window.localStorage.user = JSON.stringify(data.user);
                        $window.localStorage.token = data.token;
                    });
            },
            logout: function () {
                $rootScope.user = undefined;
                var promise = $http.post($rootScope.server.url + '/logout');
                $window.localStorage.removeItem('user');
                $window.localStorage.removeItem('token');
                return promise;
            },
            signup: function (user) {
                return $http.post($rootScope.server.url + '/signup', user);
            }
        }
    })

    /*
     * Controllers
     */
    .controller('LoginCtrl', function ($scope, $rootScope, $state, $window, $location, $ionicViewService, $ionicPopup, $ionicModal, Auth) {

        $ionicModal.fromTemplateUrl('templates/server-url-setting.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openAppDialog = function() {
            $scope.modal.show();
        };

        $scope.$on('modal.hidden', function(event) {
            $window.localStorage.setItem('serverURL', $rootScope.server.url);
        });

        $window.localStorage.removeItem('user');
        $window.localStorage.removeItem('token');

        $scope.user = {};

        $scope.login = function () {

            Auth.login($scope.user)
                .success(function (data) {
                    $state.go("app.profile");
                })
                .error(function (err) {
                    $ionicPopup.alert({title: 'Oops', content: err});
                });
        };

    })

    .controller('LogoutCtrl', function ($rootScope, $window) {
        console.log("Logout");
        $rootScope.user = null;
        $window.localStorage.removeItem('user');
        $window.localStorage.removeItem('token');

    })

    .controller('SignupCtrl', function ($scope, $state, $ionicPopup, Auth) {

        $scope.user = {};

        $scope.signup = function () {
            if ($scope.user.password !== $scope.user.password2) {
                $ionicPopup.alert({title: 'Oops', content: "passwords don't match"});
                return;
            }
            Auth.signup($scope.user)
                .success(function (data) {
                    $state.go("app.login");
                });
        };

    });
