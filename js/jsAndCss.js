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
    document.querySelectorAll('.hidden').forEach(div => div.classList.remove('hidden'));
    document.getElementById("start-btn").setAttribute("disabled", true);
}

function addButton() {
    let node = document.createElement("div");
    let buttonNode = document.createElement("button");
    buttonNode.addEventListener('click', function() {
        location = location;
    })
    buttonNode.innerHTML = 'Reset';
    node.appendChild(buttonNode);
    document.getElementById("content").appendChild(node);
}

function selectBox(id) {
    document.getElementById(id).classList.toggle('selected');
}

function check(e) {
    const { value, checked, id } = e.target;

    console.log('rest', uncheckRest(id))
    if (checked) {
        const boxes = document.querySelectorAll('.selected');
        boxes.forEach(box => {
            removeClasses(box);
            box.classList.toggle(value);
        })
    }
}

function removeClasses(node) {
    node.classList.remove('bigger', 'smaller', 'skewed', 'rotator', 'glower', 'fader');
}

function uncheckRest(id) {
    const checks = document.querySelectorAll('input');
    checks.forEach(check => {
        if (check.id !== id) {
            check.checked = false;
        }
    })
}