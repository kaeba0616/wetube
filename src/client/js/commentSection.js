const { async } = require("regenerator-runtime");

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");

const deleteBtns = document.querySelectorAll(".comment-delete");

const handleDeleteClick = async (event) => {
  const li = event.srcElement.parentNode;
  const {
    dataset: { id: commentId },
  } = li;

  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });

  li.remove();
};

const addComment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.addEventListener("click", handleDeleteClick);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault(); //새로고침 방지
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDeleteClick);
  });
}
