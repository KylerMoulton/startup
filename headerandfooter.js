document.addEventListener("DOMContentLoaded", function() {
    const dialogButton = document.getElementById("show-diolog");
    const loginRegisterDialog = document.getElementById("Login-RegisterButton");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    let loggedIn = false;

    // Hide the login form by default
    loginRegisterDialog.style.display = "none";

    // Check if user is already logged in (persist login state)
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
        const storedUsername = localStorage.getItem("loggedInUsername");
        dialogButton.textContent = "Logout of " + storedUsername;
        loggedIn = true;
    }

    // Function to toggle login/register dialog visibility
    function toggleDialogVisibility() {
        if (loginRegisterDialog.style.display === "none") {
            loginRegisterDialog.style.display = "block";
            document.getElementById("main-content").classList.add("blur");
        } else {
            loginRegisterDialog.style.display = "none";
            document.getElementById("main-content").classList.remove("blur");
        }
    }

    // Function to handle login
    function handleLogin() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Check if user exists in local storage and if password matches
        const userData = JSON.parse(localStorage.getItem(username));
        if (userData && userData.password === password) {
            // User logged in successfully
            dialogButton.textContent = ("Logout of " + username);
            loggedIn = true;
            // Store login state and username in local storage
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loggedInUsername", username);
            toggleDialogVisibility();
        } else {
            alert("Incorrect username or password.");
        }
    }

    // Function to handle logout
    function handleLogout() {
        dialogButton.textContent = "Login/Register";
        loggedIn = false;
        // Clear login state and username from local storage
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("loggedInUsername");
    }

    // Function to handle registration
    function handleRegister() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Check if username already exists in local storage
        if (localStorage.getItem(username)) {
            alert("Username already exists. Please choose another one.");
        } else {
            // Store new user data in local storage
            localStorage.setItem(username, JSON.stringify({ password: password }));
            alert("Registration successful. You can now log in.");
        }
    }

    // Toggle the display of the dialog or handle logout/login on button click
    dialogButton.addEventListener("click", function() {
        if (loggedIn) {
            // User is logged in, so logout
            handleLogout();
        } else {
            // User is not logged in, so toggle login/register dialog
            toggleDialogVisibility();
        }
    });

    // Handle login button click
    document.getElementById("login-button").addEventListener("click", handleLogin);

    // Handle register button click
    document.getElementById("register-button").addEventListener("click", handleRegister);
});
