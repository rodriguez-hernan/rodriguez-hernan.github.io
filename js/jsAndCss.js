function start() {
    const grid = document.querySelector('.sandbox');

    for (var i = 0; i < 9; i++) {
        let node = document.createElement("div");
        let id = `box-${i}`;
        node.setAttribute("class", "box");
        node.setAttribute("id", id);
        node.addEventListener('click', (event) => {
            console.log('clicked', event.target.id)
            selectBox(event.target.id)
        })
        grid.appendChild(node);
    }
    addButton();
}

function addButton() {
    let node = document.createElement("div");
    let buttonNode = document.createElement("button");
    buttonNode.addEventListener('click', function() {
        animate();
    })
    buttonNode.innerHTML = 'Start animations';
    node.appendChild(buttonNode);
    document.getElementById("content").appendChild(node);
}

function selectBox(id) {
    document.getElementById(id).classList.toggle('selected');
}

function animate() {
    console.log('starting animations');
}