
// javascript objects

class Book {
  constructor(title= "unknown", author= "unknown", pages= "unknown") {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
  showObj() {
    return this;
  }
}

const bookShelf = [];


// functions
function addBook(){
  const title = document.getElementById("newBook-title").value;
  const author = document.getElementById("newBook-author").value;
  const pages = document.getElementById("newBook-pages").value;

  const newBook = new Book(title, author, pages);
  bookShelf.push(newBook);
  cleanInputs();
  addBookToShelf(newBook);
  console.log(newBook.showObj());
  console.log(bookShelf);
  
}

function cleanInputs() {
  document.getElementById("newBook-title").value = "";
  document.getElementById("newBook-author").value = "";
  document.getElementById("newBook-pages").value = "";
}

function addBookToShelf(book){  
  var node = document.createElement("LI");
  var textnode = document.createTextNode(book.title);
  console.log("Added book number:", bookShelf.length)
  node.setAttribute("id", bookShelf.length);
  node.setAttribute("onclick", `showInfo(${bookShelf.length})`);
  node.appendChild(textnode);

  document.getElementById("books").appendChild(node);
}

function showInfo(id){
  const selectedBook =  bookShelf[id - 1];
  var bookJSON = JSON.stringify(selectedBook);
  document.getElementById("book-detail").innerHTML = bookJSON;
};
