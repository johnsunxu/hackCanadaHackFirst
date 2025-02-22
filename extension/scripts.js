let accumulator = 0; 
let dpiY = -1;

chrome.runtime.sendMessage('getDpi', (response) => {
    dpiY = response;
    console.log(`dpi is ${dpiY}`);
});

function wheelEvent(event) {
    var verticalScrollDistance = Math.max(event.deltaY, 0);
    accumulator += verticalScrollDistance;
    // console.log(ppiY);
}

async function saveAccumulator() {
    chrome.runtime.sendMessage({name: 'addAccumulator', payload: accumulator}, (response) => {
        accumulator = 0;
    });
    accumulator=0;
}

const body = document.querySelector('body');

body.addEventListener('wheel', wheelEvent); 

setInterval(saveAccumulator, 2000);