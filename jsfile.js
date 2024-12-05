const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show");
const closeButton = document.querySelector("dialog button");
const submitButton = document.querySelector("#submit");
const libraryGrid = document.querySelector(".grid")

Book.prototype.read = false;

function Book(title, author) {
    this.title = title;
    this.author = author;
}

function addBookToLibrary(title, author) {

    const book = new Book(title, author);
    myLibrary.push(book);
    // do stuff here
}

function readLibrary() {
    for (var book of myLibrary) {
        console.log("title: " + book.title + " " + "author: " + book.author + "book number: " + book.index);
    }
}

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

submitButton.addEventListener("click", submitButtonClick, false);

function submitButtonClick(event) {
    event.preventDefault();
    var title = document.querySelector("#title").value;
    var author = document.querySelector("#author").value;
    addBookToLibrary(title, author)
    addNewBook()
}

function addBookToDisplay(index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-attribute", index);

    const titleNode = document.createTextNode("title: " + myLibrary[index].title);
    const authorNode = document.createTextNode("author: " + myLibrary[index].author);
    const indexNode = document.createTextNode("index: " + index);

    card.appendChild(titleNode);
    card.appendChild(document.createElement("br"));
    card.appendChild(authorNode);
    card.appendChild(document.createElement("br"));
    card.appendChild(indexNode);
    card.appendChild(document.createElement("br"));

    const deleteButton = document.createElement("button");
    const readStatusButton = document.createElement("button");

    deleteButton.appendChild(document.createTextNode("delete card"))
    readStatusButton.appendChild(document.createTextNode("change read status"))
    card.appendChild(deleteButton);
    card.appendChild(document.createElement("br"));
    card.appendChild(document.createElement("br"));
    card.appendChild(readStatusButton);
    card.appendChild(document.createElement("br"));
    card.appendChild(document.createTextNode("has not read"));
    deleteButton.addEventListener("click", () => removeBook(index), false);
    readStatusButton.addEventListener("click", () => changeReadStatus(myLibrary[index], card), false)
    libraryGrid.appendChild(card);
}
function addNewBook() {
    const lastBookIndex = myLibrary.length - 1;
    addBookToDisplay(lastBookIndex)
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    updateLibraryDisplay();
}

function updateLibraryDisplay() {
    libraryGrid.innerHTML = "";

    for (var i = 0; i < myLibrary.length; i++) {

        addBookToDisplay(i)

    }

}

function changeReadStatus(book, card) {
    if (!(book instanceof Book)) {
        console.log("this is not a book")
        return
    }


    book.read = !book.read;

    var readStatus = book.read ? document.createTextNode("read") : document.createTextNode("has not read");

    card.removeChild(card.lastChild);
    card.appendChild(readStatus);

}