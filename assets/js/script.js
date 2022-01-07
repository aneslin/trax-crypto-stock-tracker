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
      
  
    } else {
      console.log("Please enter a crypto Symbol")
    }
  };

let cryptoData = function(crypto){
    // Api URl 
    let apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=" + crypto + "&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true";
  
    // make api request
    fetch(apiUrl).then(function (response) {
      // if successful
      if (response.ok) {
          response.json().then(function (data) {
              // pass lat and long to new api call
              console.log(data); 
          });
      }
      else {
          console.log("Error: Crypto Not Found.")
      };
  })
      // if server error
      .catch(function (error) {
          console.log(error);
      });

     
  }

  cryptoBtn.addEventListener("click", formSubmitHandler)

    
