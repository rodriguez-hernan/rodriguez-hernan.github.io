
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
// for requests codes and status description, check link below
// https://www.w3schools.com/js/js_ajax_http.asp
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
      processLotrData(this.responseText);
    }
  };
  // set the URL
  const url = '../assets/lotr.json';
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

function processLotrData(data) {
  const obj = JSON.parse(data);
  const characters = obj.characters !== undefined ? obj.characters : [{name: 'no name'}];
  // process data
  characters.forEach( character => {
    document.getElementById("local-content").innerHTML += character.name + '<br />';
  })
};

function clearData(){
  document.getElementById("local-content").innerHTML = "";
  document.getElementById("external-content").innerHTML = "";
}

// JSON page

let jsonCharacter = null;

function fetchCharacter() {
  const id = document.getElementById("peopleID").value;
  console.log('fetching character ', id);
  if (!id){
    return;
  }
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    document.getElementById("character-info").innerHTML = "Searching";
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let str = this.responseText.replace(/",/g, "\",<br>");
      document.getElementById("character-info").innerHTML = str;
      jsonCharacter = JSON.parse(this.responseText);
      showButtons();
    } else if (this.status == 404) {
      document.getElementById("character-info").innerHTML = "Character not found. Try another";
    }
  };
  const url = `https://swapi.co/api/people/${id}`;
  xhttp.open("GET", url, true);
  xhttp.send();
};

function showButtons(){
  document.querySelectorAll("button.hidden").forEach( el => el.classList.remove("hidden"));
}

function fetchHomeWorld(){ 
  fetchData("character-home", jsonCharacter.homeworld);
}

function fetchSpecie(){ 
  fetchData("character-specie", jsonCharacter.species[0]);
}

function fetchData(field, url) {
  console.log('params', field, url)
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let str = this.responseText.replace(/",/g, "\",<br>");
      document.getElementById(field).innerHTML = str;
    } else if (this.status == 404) {
      document.getElementById(field).innerHTML = "Data requested not found.";
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function clearJSONData(){
  document.getElementById("character-info").innerHTML = "";
  document.getElementById("character-home").innerHTML = "";
  document.getElementById("character-specie").innerHTML = "";
}

