var cryptoInput= document.getElementById("cryptoInput");
var cryptoBtn = document.getElementById("cryptoBtn");


var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var symbols = cryptoInput.value.trim();

  console.log(cryptoInput);
    if (symbols) {
      cryptoData(symbols);

          // clear old content
    cryptoInput.textContent = "";

  
    } else {
      console.log("Please enter a crypto Symbol")
    }
  };



  // Event Listener for when crypto Button is clicked 
  cryptoBtn.addEventListener("click", formSubmitHandler)



    
