angular.module('nibs.schedule', [])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.schedule', {
                url: "/schedule",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/schedule.html",
                        controller: "ScheduleCtrl"
                    }
                }
            })

    })

    // Services
    .factory('ScheduleItem', function ($http, $rootScope) {
        return {
            all: function() {
                return $http.get($rootScope.server.url + '/schedule');
            },
            create: function(scheduleItem) {
                return $http.post($rootScope.server.url + '/schedule', scheduleItem);
            },
            del: function(sessionId) {
                return $http.delete($rootScope.server.url + '/schedule/' + sessionId);
            }
        };
    })

    // Controllers
    .controller('ScheduleCtrl', function ($scope, ScheduleItem) {

        function all() {
            ScheduleItem.all().success(function(sessions) {
                $scope.sessions = sessions;
            });
        }

        $scope.deleteItem = function(session) {
            ScheduleItem.del(session.id).success(function() {
                all();
            });
        };

        all();

    });