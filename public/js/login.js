// login and signup functions
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('.emailLogin').value.trim();
  const password = document.querySelector('.passwordLogin').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// signup function
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector('.nameSignup').value.trim();
  const email = document.querySelector('.emailSignup').value.trim();
  const password = document.querySelector('.passwordSignup').value.trim();

  // Send a POST request to the API endpoint to create a new user
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// event listeners for login and signup
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
