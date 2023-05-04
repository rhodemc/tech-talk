// login and signup functions
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(email, password);

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
      // If successful, redirect the browser to main
      window.location.href = '/';
    } else {
      alert(response.statusText);
    }
  }
};

// event listeners for login
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

//signup in different file
