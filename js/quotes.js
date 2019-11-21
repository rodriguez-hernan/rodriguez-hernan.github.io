
function ajaxCall(url, callback) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log('data: ', this.responseText);
      callback(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
};
