app.controller('RegisterController', ['$scope', '$location', '$timeout', 'AuthService', function($scope, $location, $timeout, AuthService) {
    // Redirect if already logged in
    if (AuthService.isLoggedIn()) {
        $location.path('/dashboard');
        return;
    }

    $scope.user = {};
    $scope.errorMessage = '';
    $scope.successMessage = '';

    $scope.register = function() {
        if ($scope.registerForm.$valid) {
            $scope.errorMessage = '';
            
            var result = AuthService.register($scope.user);
            
            if (result.success) {
                $scope.successMessage = 'Registration successful! Redirecting to login...';
                // Reset form
                $scope.user = {};
                $scope.registerForm.$setPristine();
                $scope.registerForm.$setUntouched();
                
                $timeout(function() {
                    $location.path('/login');
                }, 2000);
            } else {
                $scope.errorMessage = result.message;
            }
        }
    };
}]);
