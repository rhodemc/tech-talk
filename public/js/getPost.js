const getPost = document.getElementsByClassName('getPost');

// GET blog post when button is clicked
getPost.addEventListener('click', async (event) => {
  window.location.href = '/createblogpost';
});
