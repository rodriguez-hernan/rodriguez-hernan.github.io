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

function parseAndStore(data) {
    const info = JSON.parse(data);
    searchResults(info.items);
}

function searchResults(books) {
    const section = document.querySelector('.search-results');
    books.forEach(book => {
        const link = document.createElement("a");
        link.setAttribute("href", book.volumeInfo.previewLink);
        link.setAttribute("alt", book.volumeInfo.title);

        const node = document.createElement("div");
        node.setAttribute("class", "book-card");
        if (book.volumeInfo.imageLinks) {
            // poner imagen como background
            node.style.backgroundImage = `url(${book.volumeInfo.imageLinks.thumbnail})`;

            // poner titulo y descripcion como texto
            const title = document.createElement("h4");
            title.setAttribute('class', 'book-card__title');
            title.textContent = book.volumeInfo.title;

            const description = document.createElement("p");
            description.setAttribute('class', 'book-card__description');
            description.textContent = formatedDesc(book.volumeInfo.description);

            node.appendChild(title);
            node.appendChild(description);
            link.appendChild(node);
            section.appendChild(link);
        }
    })

    addHovers();
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

// Books Carousel for featured section
// https://medium.com/@magyarn/simple-carousel-with-vanilla-js-3dd10a143ff2