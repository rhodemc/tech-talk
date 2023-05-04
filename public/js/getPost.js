const getPost = document.getElementsByClassName('getPost');

// GET new blog post template when button is clicked
getPost.addEventListener('click', (event) => {
  window.location.href = '/createpost';
});
