async function submitCommentHandler(event) {
    event.preventDefault();
    //get info we need
    const project_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const comments_text = document.querySelector("#comment-text").value.trim();
    //const user_id = "1"; //TODO set to session auth
    if (comments_text) {
      //make sure we have comment text
      const response = await fetch("/api/Comments", {
        method: "POST",
        body: JSON.stringify({
          comments_text, //removed user id
          project_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
     
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText); 
      }
    }
  }
  
  //post a commment
  document
    .querySelector("#post-comment-btn")
    .addEventListener("click", submitCommentHandler);