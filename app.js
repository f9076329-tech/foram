var app = angular.module('quizApp', ['ngRoute']);

// Routing Configuration
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'components/login/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'components/register/register.html',
            controller: 'RegisterController'
        })
        .when('/dashboard', {
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashboardController',
            resolve: {
                auth: ['$location', 'AuthService', function($location, AuthService) {
                    if (!AuthService.isLoggedIn()) {
                        $location.path('/login');
                    }
                }]
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

// Navbar Controller for managing Auth state in the header
app.controller('NavController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    $scope.isLoggedIn = function() {
        return AuthService.isLoggedIn();
    };

    $scope.logout = function() {
        AuthService.logout();
        $location.path('/login');
    };
}]);
