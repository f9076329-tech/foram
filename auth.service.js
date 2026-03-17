app.factory('AuthService', function() {
    // Simulated mock user database
    var users = [];
    var currentUser = null;

    // Load from local storage if available
    var storedUsers = localStorage.getItem('quizUsers');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
    
    var storedSession = localStorage.getItem('quizSession');
    if (storedSession) {
        currentUser = JSON.parse(storedSession);
    }

    return {
        login: function(email, password) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].password === password) {
                    currentUser = users[i];
                    localStorage.setItem('quizSession', JSON.stringify(currentUser));
                    return { success: true, user: currentUser };
                }
            }
            return { success: false, message: 'Invalid credentials' };
        },
        register: function(user) {
            // Check if user exists
            var exists = users.some(function(u) { return u.email === user.email; });
            if (exists) {
                return { success: false, message: 'Email already registered' };
            }
            users.push(user);
            localStorage.setItem('quizUsers', JSON.stringify(users));
            return { success: true };
        },
        logout: function() {
            currentUser = null;
            localStorage.removeItem('quizSession');
        },
        isLoggedIn: function() {
            return currentUser !== null;
        },
        getCurrentUser: function() {
            return currentUser;
        }
    };
});
