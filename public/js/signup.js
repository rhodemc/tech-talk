// signup function
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document
    .querySelector('#confirm-password-signup')
    .value.trim();
  console.log(name, email, password, confirmPassword);

  // Send a POST request to the API endpoint to create a new user
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
      document.location.href('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
