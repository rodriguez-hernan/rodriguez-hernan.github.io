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
    let query = document.getElementById("author-input").value;
    query = query.split(' ').join('+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    if (query.length > 0) {
        ajaxCall(url, parseAndStore);
    }
}

function parseAndStore(data) {
    const info = JSON.parse(data);
    console.log('info', info);
}