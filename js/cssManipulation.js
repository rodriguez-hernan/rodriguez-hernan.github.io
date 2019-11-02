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
    document.getElementById("scripture").classList.toggle("animation-1");
}

function setAnimation2(e) {
    document.getElementById("scripture").classList.toggle("animation-2");
}

function setAnimation3(e) {
    document.getElementById("scripture").classList.toggle("animation-3");
}