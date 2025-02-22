let accumulator = 0; 

function wheelEvent(event) {
    var verticalScrollDistance = Math.max(event.deltaY, 0);
    accumulator += verticalScrollDistance;
}

async function saveAccumulator() {
    chrome.storage.local.get("currentScrollDistance", function (items) {
        const temp = items.currentScrollDistance;
        chrome.storage.local.set({ "currentScrollDistance": accumulator+temp }, function(){
            accumulator = 0;
        });   
    })
}

const body = document.querySelector('body');

body.addEventListener('wheel', wheelEvent); 

setInterval(saveAccumulator, 2000);