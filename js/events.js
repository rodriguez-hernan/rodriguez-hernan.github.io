(function() {
    document.getElementById("start-button").addEventListener('click', addStartingContent);
})();

function addStartingContent() {
    document.querySelector(".title").classList.add('title-contrast');
    addMonkeyImg();
    const monkey = document.getElementById("monkey");
    if (monkey) {
        monkey.addEventListener('mouseenter', () => {
            monkey.src = "../assets/monkey-1.png";
        })
        monkey.addEventListener('mouseleave', () => {
            monkey.src = "../assets/monkey-2.png";
        })
        monkey.addEventListener('mousedown', () => {
            monkey.src = "../assets/surprised.jpg";
        })
        console.log("you can click on the monkey to see he's reaction")
    }

    addMagicInput();
    const inputBox = document.getElementById("input-box");
    const wordArr = [];
    let bigWordTrigger = false;

    if (inputBox) {
        inputBox.addEventListener('keyup', (event) => {
            if (event.key.length < 2) {
                wordArr.push(event.key);
            }
            if (wordArr.length > 0 && wordArr.length < 4) {
                inputBox.classList.add('red-back');
            } else if (wordArr.length > 3 && wordArr.length < 7) {
                inputBox.classList.remove('red-back');
                inputBox.classList.add('yellow-back');
            } else if (wordArr.length > 6) {
                console.log('bigWordTrigger', bigWordTrigger);
                inputBox.classList.remove('yellow-back');
                inputBox.classList.add('green-back');
                bigWordTrigger = bigwords(bigWordTrigger);
                document.getElementById("congrats-img")
                    .addEventListener("dblclick", () => location = location);
                console.log('Double click on the last image to start again!')
            }
        })
    }

    document.querySelector("#content").addEventListener('mousemove', (event) => {
        var x = event.clientX; // Get the horizontal coordinate
        var y = event.clientY; // Get the vertical coordinate
        var coor = "X coords: " + x + ", Y coords: " + y;
        var hexString = (x + y).toString(16);
        document.getElementById("content").style.backgroundColor = '#' + hexString;
    })

}


function addMonkeyImg() {
    let node = document.createElement("div");
    node.setAttribute("class", "monkey-img");

    let monkeyImg = document.createElement("img");
    monkeyImg.setAttribute("id", "monkey");
    monkeyImg.setAttribute("src", "../assets/monkey-2.png");

    node.appendChild(monkeyImg);
    document.getElementById("content").appendChild(node);
}

function addMagicInput() {
    let node = document.createElement("div");
    node.setAttribute("class", "input-section");

    let input = document.createElement("input");
    input.setAttribute("id", "input-box");
    input.setAttribute("class", "input-box");
    input.setAttribute("placeholder", "misterious input field");

    // append child
    node.appendChild(input);
    document.getElementById("content").appendChild(node);
}

function bigwords(triggered) {
    let node = document.createElement("div");
    node.setAttribute("class", "congrats-img");

    let congrats = document.createElement("img");
    congrats.setAttribute("id", "congrats-img");
    congrats.setAttribute("src", "../assets/congrats.png");

    node.appendChild(congrats);
    if (!triggered) {
        document.getElementById("content").appendChild(node);
    }
    return true;
}