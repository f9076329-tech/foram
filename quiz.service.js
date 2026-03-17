app.factory('QuizService', function($q, $timeout) {
    var quizzes = [];

    // Load from local storage
    var storedQuizzes = localStorage.getItem('quizData');
    if (storedQuizzes) {
        quizzes = JSON.parse(storedQuizzes);
    }

    return {
        generateQuiz: function(fileData, userEmail) {
            var deferred = $q.defer();

            // Simulate server processing time for determining quiz content
            $timeout(function() {
                var newQuiz = {
                    id: Date.now(),
                    title: fileData.name.replace(/\.[^/.]+$/, "") + " Quiz",
                    date: new Date().toISOString(),
                    user: userEmail,
                    questions: [
                        {
                            q: "What is the main topic of the uploaded document?",
                            options: ["Option A", "Option B", "Option C", "Option D"],
                            answer: "Option C"
                        },
                        {
                            q: "Based on the content, which statement is true?",
                            options: ["Statement 1", "Statement 2", "Statement 3", "Statement 4"],
                            answer: "Statement 2"
                        }
                    ]
                };

                quizzes.push(newQuiz);
                localStorage.setItem('quizData', JSON.stringify(quizzes));
                deferred.resolve(newQuiz);
            }, 1500);

            return deferred.promise;
        },
        getUserQuizzes: function(userEmail) {
            return quizzes.filter(function(q) {
                return q.user === userEmail;
            });
        }
    };
});
