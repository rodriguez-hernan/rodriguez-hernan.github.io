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
        ajaxCall(url, parseAndStore);
    }
}

let booksResultSet;

function parseAndStore(data) {
    booksResultSet = JSON.parse(data);
    console.log(typeof booksResultSet)
    console.log('books **', booksResultSet)
    searchResults(booksResultSet.items);
}

function searchResults(books) {
    const section = document.querySelector('.search-results');
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

// global modal variable
const modal = document.getElementById("myModal");

function addModalEvent() {
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        book.addEventListener('click', function() {
            modal.classList.add('open-modal');
            console.log('book id', book.id)
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
    // Books Carousel for featured section
    // https://medium.com/@magyarn/simple-carousel-with-vanilla-js-3dd10a143ff2

function populateModal(id) {
    const selected = booksResultSet.items.filter(book => book.id == id)[0];
    console.log('selected', selected);
    document.querySelector('#book-modal_img').src = selected.volumeInfo.imageLinks.thumbnail;
    document.querySelector('.book-modal_header').innerHTML = selected.volumeInfo.title;
    document.querySelector('.book-modal_desc').innerHTML = selected.volumeInfo.description;
    document.querySelector('.book-modal_author').innerHTML = selected.volumeInfo.authors[0];
    document.querySelector('.book-modal_add').addEventListener('click', () => { saveBook(selected) });
    document.querySelector('.book-modal_goTo').href = selected.volumeInfo.infoLink;

}

function saveBook(book) {
    modal.classList.remove('open-modal');
    const bookCollection = fetchInLocalStorage('bookCollection');
    // convert to array and push
    const bookArray = Array.from(bookCollection);
    bookArray.push(book, book.id);
    // convert to set and save
    const bookSet = new Set(bookArray);
    saveInLocalStorage(bookSet, 'bookCollection');
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
    const postList = localStorage.getItem('bookCollection');
    if (postList === null) {
        localStorage.setItem('bookCollection', '[]');
    }
}

function renderSavedBooks() {
    verifyLS();
    const bookCollection = fetchInLocalStorage('bookCollection');
    const bookArray = Array.from(bookCollection);
    console.log('bookCollection', typeof bookCollection);
    bookArray.forEach(book => {
        // add each book to section  
    })
}