const scrollText = document.getElementById('scrollDistance');
let accumulator = 0 

chrome.storage.local.get(/* String or Array */"currentScrollDistance", function(items){
    accumulator = items.currentScrollDistance;
    console.log('changed accumulator');
    scrollText.innerHTML=accumulator;
});
console.log('did something');
