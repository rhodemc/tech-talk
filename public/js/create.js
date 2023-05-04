const createNewPost = document.getElementsById('createNewPost');

createNewPost.addEventListener('submit', (event) => {
  event.preventDefault();

  const { title: titleInput, content: contentInput } = event.target.elements;

  const postData = {
    title: titleInput.value,
    content: contentInput.value,
  };

  fetch(`/api/blogposts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = '/dashboard';
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
