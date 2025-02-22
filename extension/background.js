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

                    const addition = message.payload/dpiY;
                    if (addition === 0) {
                        return;
                    }
                    const requestBody = {
                        email: 'jasontran2134@gmail.com',
                        distance_scrolled: message.payload/dpiY,
                        time_spent: addition > 10 ? 2 : 0,
                    };
                    fetch("http://localhost:5000/increment_user", {
                        method: 'POST',
                        headers: {
                            "Content-Type"  : "application/json"
                        },
                        body: JSON.stringify(requestBody),
                        
                    })
                });    
        });
        });
        return true;
    }
})