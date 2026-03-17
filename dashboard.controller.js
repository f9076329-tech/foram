app.controller('DashboardController', ['$scope', 'AuthService', 'QuizService', function($scope, AuthService, QuizService) {
    $scope.currentUser = AuthService.getCurrentUser();
    $scope.quizzes = [];
    $scope.isDragOver = false;
    $scope.isGenerating = false;

    // Load initial quizzes
    if ($scope.currentUser) {
        $scope.quizzes = QuizService.getUserQuizzes($scope.currentUser.email);
    }

    $scope.triggerFileInput = function() {
        if (!$scope.isGenerating) {
            document.getElementById('fileInput').click();
        }
    };

    $scope.onFileSelect = function(files) {
        if (files && files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    // Drag and Drop simulated handlers
    $scope.onDragOver = function(e) {
        e.preventDefault();
        e.stopPropagation();
        $scope.$apply(function() {
            $scope.isDragOver = true;
        });
    };

    $scope.onDragLeave = function(e) {
        e.preventDefault();
        e.stopPropagation();
        $scope.$apply(function() {
            $scope.isDragOver = false;
        });
    };

    $scope.onDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        $scope.$apply(function() {
            $scope.isDragOver = false;
            var dt = e.dataTransfer;
            var files = dt.files;
            
            if (files && files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    };

    function handleFileUpload(file) {
        if ($scope.isGenerating) return;
        
        $scope.isGenerating = true;
        
        // Pass file metadata to service (simulating upload)
        QuizService.generateQuiz(file, $scope.currentUser.email)
            .then(function(newQuiz) {
                $scope.quizzes.unshift(newQuiz);
                $scope.isGenerating = false;
                
                // Clear the input
                document.getElementById('fileInput').value = '';
                
                alert('Quiz generated successfully!');
            })
            .catch(function(error) {
                $scope.isGenerating = false;
                alert('Error generating quiz.');
            });
    }

    $scope.viewQuiz = function(quiz) {
        // Just an alert for this simulation instead of full player view
        alert('Starting quiz: ' + quiz.title + '\n\nQuestions:\n' + 
            quiz.questions.map(function(q, i) { 
                return (i+1) + '. ' + q.q; 
            }).join('\n'));
    };
}]);
