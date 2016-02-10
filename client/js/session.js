angular.module('nibs.session', ['nibs.status', 'nibs.schedule'])

    .config(function ($stateProvider) {

        $stateProvider

            .state('app.sessions', {
                url: "/sessions",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/session-list.html",
                        controller: "SessionListCtrl"
                    }
                }
            })

            .state('app.session-detail', {
                url: "/sessions/:sessionId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/session-detail.html",
                        controller: "SessionDetailCtrl"
                    }
                }
            })

    })

    // REST resource for access to Sessions data
    .factory('Session', function ($http, $rootScope) {
        return {
            all: function() {
                return $http.get($rootScope.server.url + '/sessions');
            },
            get: function(sessionId) {
                return $http.get($rootScope.server.url + '/sessions/' + sessionId);
            }
        };
    })

    .controller('SessionListCtrl', function ($scope, Session) {

        Session.all().success(function(sessions) {
            $scope.sessions = sessions;
        });

        $scope.doRefresh = function() {
            Session.all().success(function(sessions) {
                $scope.sessions = sessions;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

    })

    .controller('SessionDetailCtrl', function ($scope, $rootScope, $stateParams, $ionicPopup, Session, ScheduleItem, Status) {

        Session.get($stateParams.sessionId).success(function(session) {
            $scope.session = session;
        });

        $scope.saveToSchedule = function () {
            ScheduleItem.create({sessionId: $scope.session.id}).success(function(status) {
                Status.show('Added to your schedule!');
            });
        };

    });
