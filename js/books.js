// global variables
let booksResultSet;
const modal = document.getElementById("myModal");
const searchBtn = document.querySelector('.search-box__btn');

document.querySelector('#query').addEventListener('keyup', event => {
    if (event.target.value.length > 3) {
        searchBtn.classList.add('btn-animated');
    }
})

function ajaxCall(url, callback) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
};

function queryBook() {
    let query = document.getElementById("query").value;
    query = query.split(' ').join('+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    if (query.length > 0) {
        const resultsSection = document.querySelector('.search-results');
        resultsSection.style.display = "flex";
        resultsSection.scrollIntoView({ block: 'start', behavior: 'smooth' });
        searchBtn.classList.remove('btn-animated');
        ajaxCall(url, parseAndStore);
    }
}

function parseAndStore(data) {
    booksResultSet = JSON.parse(data);
    searchResults(booksResultSet.items);
}

function searchResults(books) {
    const section = document.querySelector('.search-results');
    section.innerHTML = "";
    books.forEach(book => {
        const node = document.createElement("div");
        node.setAttribute("class", "book-card");
        node.setAttribute("id", book.id);
        if (book.volumeInfo.imageLinks) {
            node.style.backgroundImage = `url(${book.volumeInfo.imageLinks.thumbnail})`;

            const title = document.createElement("h4");
            title.setAttribute('class', 'book-card__title');
            title.textContent = book.volumeInfo.title;

            const description = document.createElement("p");
            description.setAttribute('class', 'book-card__description');
            description.textContent = formatedDesc(book.volumeInfo.description);

            node.appendChild(title);
            node.appendChild(description);
            section.appendChild(node);
        }
    })

    addHovers();
    addModalEvent();
}

function formatedDesc(text) {
    if (text && text.length > 300) {
        return `${text.substring(0, 300)}...`;
    }
    return text;
}

function addHovers() {
    document.querySelectorAll('.book-card').forEach(book => {
        const image = book.style.backgroundImage;
        book.addEventListener('mouseover', function() {
            book.style.backgroundImage = '';
            book.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        })
        book.addEventListener('mouseout', function() {
            book.style.backgroundImage = image;
            book.style.backgroundColor = "rgba(0, 0, 0, 0)";
        })
    })
}


function addModalEvent() {
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        book.addEventListener('click', function() {
            modal.classList.add('open-modal');
            populateModal(book.id);
        })
    })
}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.classList.remove('open-modal');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('open-modal');
    }
}

let selected;

function populateModal(id) {
    selected = booksResultSet.items.filter(book => book.id == id)[0];
    document.querySelector('#book-modal_img').src = selected.volumeInfo.imageLinks.thumbnail;
    document.querySelector('.book-modal_header').innerHTML = selected.volumeInfo.title;
    document.querySelector('.book-modal_desc').innerHTML = selected.volumeInfo.description;
    document.querySelector('.book-modal_author').innerHTML = selected.volumeInfo.authors[0];
    // verify if the book is in the list
    const goToButton = document.querySelector('.book-modal_add');
    if (verifyBook(selected.id)) {
        goToButton.disabled = true;
        goToButton.innerHTML = "Already saved";
        goToButton.classList.add('disabled-btn');
    } else {
        goToButton.disabled = false;
        goToButton.innerHTML = "Save Book";
        goToButton.classList.remove('disabled-btn');
        goToButton.addEventListener('click', saveBook);
    }
    document.querySelector('.book-modal_goTo').href = selected.volumeInfo.infoLink;
    document.querySelector('.book-modal_goTo').setAttribute("target", "_blank");
}

function verifyBook(id) {
    const boockCollection = fetchInLocalStorage('bookCollection');
    const book = boockCollection.find(el => el.id === id);
    return book ? true : false;
}


function saveBook() {
    modal.classList.remove('open-modal');
    const bookCollection = fetchInLocalStorage('bookCollection');
    const isListed = bookCollection.find(book => book.id === selected.id);
    if (isListed) {
        return;
    }
    bookCollection.push(selected);
    saveInLocalStorage(bookCollection, 'bookCollection');
    renderSavedBooks();
}


// Local Storage Utilities

function fetchInLocalStorage(item) {
    const ls = localStorage.getItem(item);
    return JSON.parse(ls);
}

function saveInLocalStorage(obj, lsItem) {
    const objString = JSON.stringify(obj);
    localStorage.setItem(lsItem, objString);
}

function verifyLS() {
    const bookCollection = localStorage.getItem('bookCollection');
    if (bookCollection === null || bookCollection === undefined) {
        localStorage.setItem('bookCollection', '[]');
    }
}

function renderSavedBooks() {
    verifyLS();
    const bookCollection = fetchInLocalStorage('bookCollection');

    // get divs
    const searchSection = document.querySelector('.saved-section');

    let section = document.querySelector('.saved-books-container');
    if (section === null) {
        console.log('section already created')
        section = document.createElement("div");
    } else {
        section.innerHTML = "";
        section.innerText = "";
    }

    section.setAttribute("class", 'saved-books-container');

    if (bookCollection.length) {
        for (let item of bookCollection) {
            const node = document.createElement("div");
            node.setAttribute("class", "saved-container");

            const nodeImg = document.createElement("img");
            nodeImg.setAttribute("src", item.volumeInfo.imageLinks.thumbnail);
            nodeImg.setAttribute("alt", item.volumeInfo.title);
            nodeImg.setAttribute("class", "saved-img");

            const nodeh2 = document.createElement("h2");
            nodeh2.innerText = item.volumeInfo.title;
            const nodeh3 = document.createElement("h3");
            nodeh3.innerText = item.volumeInfo.authors[0];
            const nodeButton = document.createElement("a");
            nodeButton.setAttribute("href", item.volumeInfo.infoLink)
            nodeButton.setAttribute("target", "_blank");

            nodeButton.innerHTML = 'Go to book';

            node.appendChild(nodeImg);
            node.appendChild(nodeh2);
            node.appendChild(nodeh3);
            node.appendChild(nodeButton);
            section.appendChild(node)
        }
        let button = null;
        searchSection.appendChild(section);
        if (!document.getElementById('clearBtn')) {
            button = createBtn()
            searchSection.appendChild(button);
        }
    } else {
        section.innerText = "No saved books yet... Perform a search and click on a book to see it's information and save it for later";
        searchSection.appendChild(section);
    }
}

function createBtn() {
    const button = document.createElement("button");
    button.setAttribute("class", "clear-btn");
    button.setAttribute("id", "clearBtn");

    button.addEventListener('click', () => {
        localStorage.clear();
        location = location;
    });
    button.innerHTML = "Clear List";
    return button;
}