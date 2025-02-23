const guiltText = document.getElementById('insultText');
const curText = guiltText.innerHTML;

// Using fetch to call the GET endpoint
async function fetchInsult(email) {
    try {
      const response = await fetch(`http://localhost:3000/generate_insult?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      console.log("Insult:", data.insult);
    } catch (error) {
      console.error("Error fetching insult:", error);
    }
  }
  
guiltText.textContent += await fetchInsult("jasontran2134@gmail.com");     

// chrome.storage.local.get(/* String or Array */"currentScrollDistance", function(items){
//     accumulator = items.currentScrollDistance;
//     // console.log('changed accumulator');
//     scrollText.innerHTML=accumulator;
// });
