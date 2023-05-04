// initialize logout function when logout button is clicked
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

// event listener for logout
document.querySelector('#logout').addEventListener('click', logout);
