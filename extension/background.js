// let ppiY = -1; 
// chrome.system.display.getInfo(undefined, (info) => {
//     ppiY = info.dpiY;
//     console.log(ppiY);
// })

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message === 'getAccumulator'){
        let accumulator = 0;
        chrome.storage.local.get("currentScrollDistance", (items) => {
            accumulator = items.currentScrollDistance;
            sendResponse(accumulator);
        });
        return true;
    }
    else if (message === 'getDpi'){
        console.log('getting dpi');
        chrome.system.display.getInfo((items) => {
            console.log(items); // probably find the one with active state 
            sendResponse(items[0].dpiY);
        })
        return true;
    }
    else if (message.name === 'addAccumulator'){
        chrome.system.display.getInfo((dpi) => {
            const dpiY = dpi[0].dpiY;
            chrome.storage.local.get("currentScrollDistance", (items) => {
                const temp = items.currentScrollDistance;
                chrome.storage.local.set({ "currentScrollDistance": temp + message.payload/dpiY}, (response) => {
                    console.log('set distance to ', temp + message.payload/dpiY);
                });    
        });
        });
        return true;
    }
})