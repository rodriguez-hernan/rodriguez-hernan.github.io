function changeFont(event) {
    document.getElementById("scripture").style.fontSize = event.value + 'px';
}

function changePadding(event) {
    document.getElementById("scripture").style.padding = event.value + 'px';
}

function changeWS(e) {
    document.getElementById("scripture").style.wordSpacing = e.value + 'px';
}

function changeBackColor(e) {
    document.getElementById("scripture").style.backgroundColor = e.value;
}

function changeColor(e) {
    document.getElementById("scripture").style.color = e.value;
}

function changeFontFamily(e) {
    document.getElementById("scripture").style.fontFamily = e.value;
}

function setAnimation1(e) {
    var scripture = document.getElementById("scripture");
    if (e.checked) {
        document.getElementById("animation2").checked = false;
        scripture.classList.remove("animation-2");
        document.getElementById("animation3").checked = false;
        scripture.classList.remove("animation-3");
    }
    scripture.classList.toggle("animation-1");
}

function setAnimation2(e) {
    var scripture = document.getElementById("scripture");
    if (e.checked) {
        document.getElementById("animation1").checked = false;
        scripture.classList.remove("animation-1");
        document.getElementById("animation3").checked = false;
        scripture.classList.remove("animation-3");
    }
    scripture.classList.toggle("animation-2");
}

function setAnimation3(e) {
    var scripture = document.getElementById("scripture");
    if (e.checked) {
        document.getElementById("animation1").checked = false;
        scripture.classList.remove("animation-1");
        document.getElementById("animation2").checked = false;
        scripture.classList.remove("animation-2");
    }
    scripture.classList.toggle("animation-3");
}