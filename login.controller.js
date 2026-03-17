app.controller('LoginController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    // Redirect if already logged in
    if (AuthService.isLoggedIn()) {
        $location.path('/dashboard');
        return;
    }

    $scope.user = {};
    $scope.errorMessage = '';

    $scope.login = function() {
        if ($scope.loginForm.$valid) {
            var result = AuthService.login($scope.user.email, $scope.user.password);
            
            if (result.success) {
                $location.path('/dashboard');
            } else {
                $scope.errorMessage = result.message;
            }
        }
    };
}]);
