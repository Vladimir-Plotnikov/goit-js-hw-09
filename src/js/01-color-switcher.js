const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const changeColor = function () {
    refs.body.style.backgroundColor = getRandomHexColor()
}

let timeFlow = null

refs.startButton.addEventListener('click', function(){
    timeFlow = setInterval(changeColor, 1000)
    refs.startButton.disabled = true;
}
)  

refs.stopButton.addEventListener('click', function() {
    clearInterval(timeFlow);
    refs.startButton.disabled = false;
})
