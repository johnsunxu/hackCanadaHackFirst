let sessionAccumulator = 0; 
let accumulator = 0; 
let dpiY = -1;

chrome.runtime.sendMessage('getDpi', (response) => {
    dpiY = response;
    console.log(`dpi is ${dpiY}`);
});

function wheelEvent(event) {
    var verticalScrollDistance = Math.max(event.deltaY, 0);
    accumulator += verticalScrollDistance;
    sessionAccumulator += verticalScrollDistance;
    // console.log(ppiY);
}

async function saveAccumulator() {
    // send message to open a tab to alert if the user has been scrolling too long in the session 
    if (sessionAccumulator > 10000) {
        chrome.runtime.sendMessage("openTab", () => {
            console.log('opening tab');
        });
    }
    chrome.runtime.sendMessage({name: 'addAccumulator', payload: accumulator}, (response) => {
        accumulator = 0;
    });
    accumulator=0;
}

const body = document.querySelector('body');

body.addEventListener('wheel', wheelEvent); 

setInterval(saveAccumulator, 2000);