
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
};

const bookShelf = [];

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
  
};

function cleanInputs() {
  document.getElementById("newBook-title").value = "";
  document.getElementById("newBook-author").value = "";
  document.getElementById("newBook-pages").value = "";
};

function addBookToShelf(book){  
  var node = document.createElement("LI");
  var textnode = document.createTextNode(book.title);
  console.log("Added book number:", bookShelf.length)
  node.setAttribute("id", bookShelf.length);
  node.setAttribute("onclick", `showInfo(${bookShelf.length})`);
  node.appendChild(textnode);

  document.getElementById("books").appendChild(node);
};

function showInfo(id){
  const selectedBook =  bookShelf[id - 1];
  var bookJSON = JSON.stringify(selectedBook);
  document.getElementById("book-detail").innerHTML = bookJSON;
};


// AJAX page

function externalAJAX() {
  // create instance of XMLHttpRequest
  const xhttp = new XMLHttpRequest();

  // create a callback function
  xhttp.onreadystatechange = function() {
    // readyState property holds the status of the XMLHttpRequest.
    if (this.readyState == 4 && this.status == 200) {
      // do something with the data
      console.log('data: ', this.responseText);
      processCharactersData(this.responseText);
    }
  };
  // set the URL
  const url = 'https://swapi.co/api/people/';
  // execute the ajax call
  xhttp.open("GET", url, true);
  xhttp.send();
};

function localAJAX() {
  // create instance of XMLHttpRequest
  const xhttp = new XMLHttpRequest();

  // create a callback function
  xhttp.onreadystatechange = function() {
    // readyState property holds the status of the XMLHttpRequest.
    if (this.readyState == 4 && this.status == 200) {
      // do something with the data
      console.log('data: ', this.responseText);
      processStudentsData(this.responseText);
    }
  };
  // set the URL
  const url = '../assets/students.json';
  // execute the ajax call
  xhttp.open("GET", url, true);
  xhttp.send();
};

function processCharactersData(data) {
  const obj = JSON.parse(data);
  const characters = obj.results !== undefined ? obj.results : [{name: 'no name'}];
  // process data
  characters.forEach( character => {
    document.getElementById("external-content").innerHTML += character.name + '<br />';
  })
};

function processStudentsData(data) {
  const obj = JSON.parse(data);
  const students = obj.students !== undefined ? obj.students : [{name: 'no name'}];
  // process data
  students.forEach( student => {
    document.getElementById("local-content").innerHTML += student.name + '<br />';
  })
};

