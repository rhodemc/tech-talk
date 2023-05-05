const createPostHandler = async (event) => {
  event.preventDefault();

  document.location.replace('/createpost');
};

document
  .querySelector('.getNewTemplate')
  .addEventListener('click', createPostHandler);
