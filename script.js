document.addEventListener("DOMContentLoaded", function () {
  const books = document.querySelectorAll(".book");
  const bookDetails = document.getElementById("book-details");
  const bookTitle = document.getElementById("book-title");
  const bookCover = document.getElementById("book-cover");
  const bookAuthor = document.getElementById("book-author");
  const bookDescription = document.getElementById("book-description");
  const backButton = document.getElementById("back-button");
  const commentsContainer = document.getElementById("comments-container");
  const commentForm = document.getElementById("comment-form");

  let selectedBook = null;

  // Mostrar detalles del libro al hacer clic
  books.forEach((book) => {
    book.addEventListener("click", function () {
      selectedBook = this.getAttribute("data-title");

      bookTitle.textContent = this.getAttribute("data-title");
      bookCover.src = this.getAttribute("data-cover");
      bookAuthor.textContent = this.getAttribute("data-author");
      bookDescription.textContent = this.getAttribute("data-description");

      document.getElementById("books-container").classList.add("hidden");
      bookDetails.classList.remove("hidden");
      commentsContainer.innerHTML = "";
    });
  });

  // Regresar a la lista de libros
  backButton.addEventListener("click", function () {
    document.getElementById("books-container").classList.remove("hidden");
    bookDetails.classList.add("hidden");
  });

  // Agregar comentarios
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const commentText = document.getElementById("comment").value.trim();
    if (commentText === "") return;

    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    commentDiv.innerHTML = `
            <p><strong>Comentario:</strong> ${commentText}</p>
            <p><small>${formattedDate}</small></p>
            <button class="delete-btn">Eliminar</button>
        `;

    // Preguntar antes de eliminar un comentario
    commentDiv
      .querySelector(".delete-btn")
      .addEventListener("click", function () {
        if (confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
          commentsContainer.removeChild(commentDiv);
        }
      });

    commentsContainer.appendChild(commentDiv);
    document.getElementById("comment").value = "";
  });
});
