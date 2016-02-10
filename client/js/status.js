angular.module('nibs.status', [])

    .factory('Status', function ($rootScope, $ionicPopup) {

        function show(message) {
            var el = angular.element('<div class="notification">' + message + '</div>');
            angular.element(document.body).append(el);
            setTimeout(function() {
                el.remove();
            }, 1500);
        }

        return {
            show: show
        }

    });
