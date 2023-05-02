const updateBlogPost = document.getElementsByClassName('updateBlogPost');

updateBlogPost.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { title: titleInput, content: contentInput } = event.target.elements;

  const postData = {
    title: titleInput.value,
    content: contentInput.value,
  };

  const blogpostid = event.target.dataset.blogpostid;

  if (event.submitter.innerhtml === 'Update Blog Post') {
    fetch(`/api/blogpost/${event.target.dataset.blogpostid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = `/dashboard`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (event.submitter.innerhtml === 'Delete Blog Post') {
    fetch(`/api/blogpost/${blogpostid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = `/dashboard`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
