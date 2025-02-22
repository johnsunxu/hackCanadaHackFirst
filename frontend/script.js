const form = document.getElementById('signupForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    document.getElementById('usernameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username.length < 3) {
        document.getElementById('usernameError').innerText = 'Username must be at least 3 characters long';
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long';
        valid = false;
    }

    if (valid) {
        alert('Form submitted successfully!');
        form.submit();
    }
});
