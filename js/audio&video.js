var audioPlayer = document.getElementById('myAudio');

function playMusic() {
    setTimeout(function() {
        audioPlayer.play();
    }, 3000);
}

var modal = document.getElementById("myModal");

const doors = document.querySelectorAll(".door");
doors.forEach(door => {
    door.addEventListener('click', function(event) {
        console.log('event', event.target.id)
        modal.style.display = "block";
        audioPlayer.pause();
        vacationVideo(event.target.id);
    });
    door.addEventListener('mouseover', function() {
        const computedStyle = window.getComputedStyle(door, null);
        const bgColor = computedStyle.getPropertyValue('background-color');
        document.querySelector('.cta-header').style.color = bgColor;
    })
})


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function vacationVideo(color) {
    const video = document.getElementsByTagName('video')[0];
    const sources = video.getElementsByTagName('source');
    const description = document.getElementById('vacations-description');
    switch (color) {
        case 'blue':
            description.innerHTML = "Enjoy the waves and the sand on a cool beach";
            sources[0].src = '../assets/video/beach.mp4';
            video.load()
            break;
        case 'green':
            description.innerHTML = "Read a book and relax on the shores of a beautiful lake";
            sources[0].src = '../assets/video/lake.mp4';
            video.load()
            break;
        case 'red':
            description.innerHTML = "Create experiences by visiting amazing mountains";
            sources[0].src = '../assets/video/mountains.mp4';
            video.load()
            break;
        case 'violet':
            description.innerHTML = "...or you can go to the woods";
            sources[0].src = '../assets/video/woods.mp4';
            video.load()
            break;
        default:
            sources[0].src = '../assets/video/cruise.mp4';
            video.load()
    }
}