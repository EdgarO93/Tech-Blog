const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ name,description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/project/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
    
    async function submitCommentHandler(event) {
      event.preventDefault();
      //get info we need
      const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
      const comment_text = document.querySelector("#comment-text").value.trim();
      //const user_id = "1"; //TODO set to session auth
      if (comment_text) {
        //make sure we have comment text
        const response = await fetch("/api/Comments", {
          method: "POST",
          body: JSON.stringify({
            comment_text, //removed user id
            post_id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        //check if all good
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText); // find better way to do this
        }
      }
    }
    
    //post a commment
    document
      .querySelector("#post-comment-btn")
      .addEventListener("click", submitCommentHandler);