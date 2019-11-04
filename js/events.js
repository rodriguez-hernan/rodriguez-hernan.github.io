(function() {
    console.log('starting')
    document.getElementById("start-button").addEventListener('click', addStartingContent);
})();

function addStartingContent() {
    console.log('clicked')
    addMonkeyImg();
    // add event
    const monkey = document.getElementById("monkey");
    if (monkey) {
        monkey.addEventListener('mouseenter', () => {
            monkey.src = "../assets/monkey-1.png";
        })
        monkey.addEventListener('mouseleave', () => {
            monkey.src = "../assets/monkey-2.png";
        })
    }

    addMagicInput();
}


function addMonkeyImg() {
    console.log('adding monkey')
        // creo el div con clase
    let node = document.createElement("div");
    node.setAttribute("class", "monkey-img");

    // creo la img con los attr necesarios
    let monkeyImg = document.createElement("img");
    monkeyImg.setAttribute("id", "monkey");
    monkeyImg.setAttribute("src", "../assets/monkey-2.png");

    // append child
    node.appendChild(monkeyImg);
    document.getElementById("content").appendChild(node);
}

function addMagicInput() {
    console.log('adding input box')
    let node = document.createElement("div");
    node.setAttribute("class", "input-section");

    let input = document.createElement("input");
    input.setAttribute("id", "input-box");

    // append child
    node.appendChild(input);
    document.getElementById("content").appendChild(node);
}