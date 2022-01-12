var cryptoInput= document.getElementById("cryptoInput");
var cryptoBtn = document.getElementById("cryptoBtn");
var cryptoCardEl = document.querySelector("#cryptoCard");
const cryptoButtonsEl = document.querySelector("#cryptoButtons")

const stockHook = document.querySelector("#stockCard")
const form2 = document.querySelector('#form2')
const stockButtonsEl = document.querySelector("#stockButtons")
//key for stockdata.org. 
const stockDataKey = 'cLpuGFilZPWRk7OLK4tniIxMab5iHAJfifiHTK5m'
// const stockDataKey = '1JxNvMd8wu3e6Riyg84ySMucudktF0nxWVE5eEV0'

const testData = [{
    "ticker": "TSLA",
    "name": "Tesla Inc",
    "exchange_short": "NASDAQ",
    "exchange_long": "NASDAQ Stock Exchange",
    "mic_code": "XNAS",
    "currency": "USD",
    "price": 1087.61,
    "day_high": 1170.11,
    "day_low": 1081.36,
    "day_open": 1146.49,
    "52_week_high": null,
    "52_week_low": null,
    "market_cap": null,
    "previous_close_price": 1149.71,
    "previous_close_price_time": "2022-01-04T15:59:58.000000",
    "day_change": -5.71,
    "volume": 637333,
    "is_extended_hours_price": false,
    "last_trade_time": "2022-01-05T15:59:58.000000"
}];

let stockSearches = [];
let cryptoSearches = [];

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var symbols = cryptoInput.value.trim();

    if (symbols) {
      cryptoData(symbols);
      
    } else {
        cryptoCardEl.textContent='';
        let cryptoErrorDiv = document.createElement("div")
        cryptoErrorDiv.classList =" card red cardFormat "
        cryptoCardEl.appendChild(cryptoErrorDiv)
        let cryptoErrorEl = document.createElement("p")
        cryptoErrorEl.textContent = "Please Enter A Crypto Name!"
        cryptoErrorEl.classList = "white-text"
        cryptoErrorDiv.appendChild(cryptoErrorEl)
        
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

              if (Object.keys(data).length !== 0) {
              // pass lat and long to new api call
              cryptoCurrency(data)
              saveCrypto(cryptoInput.value)

            } // else goes here
            else {
                cryptoCardEl.textContent='';
                let cryptoErrorDiv = document.createElement("div")
                cryptoErrorDiv.classList =" card red cardFormat "
                cryptoCardEl.appendChild(cryptoErrorDiv)
                let cryptoErrorEl = document.createElement("p")
                cryptoErrorEl.textContent = "Please Enter A Crypto Name!"
                cryptoErrorEl.classList = "white-text"
                cryptoErrorDiv.appendChild(cryptoErrorEl)
                
            }
            
        });
      }
      //else {
          //console.log("Error: Crypto Not Found.")
     // };
  })
      // if server error
      .catch(function (error) {
          console.log(error);
      });

     
  }

  cryptoBtn.addEventListener("click", formSubmitHandler)

  function form2Handler(event){
    event.preventDefault()
    //get value of form input field
    textInput = document.getElementById('stockInput')
    //remove space
    let ticker = textInput.value.trim()
    console.log(ticker)
    //pass ticker value into fetchStock
    fetchStock(ticker);
    if (ticker) {
        fetchStock(ticker);
        // saveStocks(ticker);
    
          }
          else {
            let cryptoErrorDiv = document.createElement("div")
            cryptoErrorDiv.classList =" card red cardFormat "
            stockHook.appendChild(cryptoErrorDiv)
            let cryptoErrorEl = document.createElement("p")
            cryptoErrorEl.textContent = "Please Enter A Stock Ticker!"
            cryptoErrorEl.classList = "white-text"
            cryptoErrorDiv.appendChild(cryptoErrorEl)
            
        }

}

let fetchStock = function(ticker){
    //url to call stockData
    let stockUrl = `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${stockDataKey}`;
    fetch(stockUrl)
    .then(function(response){
        //check if response is good
        if (response.ok){
            //if response is good, pull response
                response.json()
                //parse response to json
                .then(function(stock){
                    stockMaker(stock.data[0])
                    saveStocks(stock.data[0].ticker)
                    console.log(stock.data[0])
                    })
                }  else {
                    stockHook.textContent=''
                    let cryptoErrorDiv = document.createElement("div")
                    cryptoErrorDiv.classList =" card red cardFormat "
                    stockHook.appendChild(cryptoErrorDiv)
                    let cryptoErrorEl = document.createElement("p")
                    cryptoErrorEl.textContent = "Please Enter A Stock Ticker!"
                    cryptoErrorEl.classList = "white-text"
                    cryptoErrorDiv.appendChild(cryptoErrorEl)
                    
                    
                }
                    
    }//else error modal 
    ) 
};

let stockMaker = function(data){
    stockHook.innerHTML=''
    //create card div
    let CardEl = document.createElement("div");
        CardEl.classList.add("card", "blue-grey","cardFormat", "white-text");
        CardEl.setAttribute("id","stockBlock")
    //create card title from stock title
   let nameEl = document.createElement("h3");
       nameEl.classList.add("card-title");
       nameEl.textContent = data.name;
       CardEl.appendChild(nameEl);
    
       //list wrapper for stock attributes
   let wrapperEl = document.createElement("ul");
   
       CardEl.appendChild(wrapperEl)

    //attributes
   let tickerEl = document.createElement("li");
       tickerEl.textContent = ` Symbol: ${data.ticker}`;
       wrapperEl.appendChild(tickerEl);

   let priceEl = document.createElement("li");
       priceEl.textContent = `Price: ${data.price}`;
       wrapperEl.appendChild(priceEl);

   let highEl = document.createElement("li");
       highEl.textContent =`Daily High: ${data.day_high}`;
       wrapperEl.appendChild(highEl);
    
   let lowEl = document.createElement('li');
       lowEl.textContent = `Daily Low: ${data.day_low}`;
       wrapperEl.appendChild(lowEl);

   let changeEl = document.createElement("li");
       changeEl.textContent = `Day Change: ${data.day_change}`
       wrapperEl.appendChild(changeEl);
   
    //apply stock to div
    stockHook.appendChild(CardEl)}


    
    let cryptoCurrency = function(data){

        for( key in data ) {
            let fetchedData  = data[key]
          
        var cryptoName = cryptoInput.value;
        cryptoCardEl.innerHTML=''
        
    //create card div
    let cryptoInfo = document.createElement("div");
    cryptoInfo.classList.add("card", "blue-grey", "cardFormat", "white-text");
    cryptoInfo.setAttribute("id","cryptoBlock")
    //create card title from stock title
    let nameEl = document.createElement("h3");
       nameEl.classList.add("card-title", "capitalize");
       nameEl.textContent = `${cryptoName}`;
    
       cryptoInfo.appendChild(nameEl);
    
       //list wrapper for stock attributes
   let wrapperEl = document.createElement("ul");
       cryptoInfo.appendChild(wrapperEl)

    //attributes
  // let tickerEl = document.createElement("li");
    //   tickerEl.textContent = `${cryptoName}`;
      // wrapperEl.appendChild(tickerEl);

   let priceEl = document.createElement("li");
       priceEl.textContent = `Price: ${fetchedData.usd}`;
       wrapperEl.appendChild(priceEl);

   let highEl = document.createElement("li");
       highEl.textContent =`Market Cap (Billions): ${fetchedData.usd_market_cap}`;
       wrapperEl.appendChild(highEl);
    
   let lowEl = document.createElement('li');
       lowEl.textContent = `Volume (24 hours): ${fetchedData.usd_24h_vol}`;
       wrapperEl.appendChild(lowEl);
   
    //apply stock to div
    cryptoCardEl.appendChild(cryptoInfo)}
    
        }



function saveStocks(stockName) {

    if (localStorage.getItem('stockSearch') === null) {
        let stockSearchObj = {
            name: stockName
        };
        stockSearches.push(stockSearchObj)
        localStorage.setItem("stockSearch", JSON.stringify(stockSearches))
    } 
    else {
        stockSearches = localStorage.getItem('stockSearch')

        stockSearches = JSON.parse(stockSearches)

        let stockSearchObj = {
            name: stockName
        };
        stockSearches.push(stockSearchObj)
        localStorage.setItem("stockSearch", JSON.stringify(stockSearches))
    };
    displaySearches();
};

function saveCrypto(cryptoName) {

    if (localStorage.getItem('cryptoSearch') === null) {
        const cryptoSearchObj = {
            name: cryptoName
        };
        cryptoSearches.push(cryptoSearchObj)
        localStorage.setItem('cryptoSearch', JSON.stringify(cryptoSearches))
    }
    else {
        cryptoSearches = localStorage.getItem('cryptoSearch')

        cryptoSearches = JSON.parse(cryptoSearches)

        let cryptoSearchObj = {
            name: cryptoName
        };
        cryptoSearches.push(cryptoSearchObj)
        localStorage.setItem('cryptoSearch', JSON.stringify(cryptoSearches))
    };
    displaySearches();
};

function displaySearches() {
    cryptoButtonsEl.innerHTML = "";

    if (localStorage.getItem("cryptoSearch")) {

        cryptoSearches = JSON.parse(localStorage.getItem("cryptoSearch"))
    }

    if (cryptoSearches !== null) {
        for (var i = 0; i < cryptoSearches.length; i++) {

            // create elements
            const searchedCrypto = document.createElement("button");
            searchedCrypto.setAttribute("type", "button");
            searchedCrypto.classList = "waves-effect waves-light btn-small red lighten-1 recentSearchBtn";
            searchedCrypto.textContent = cryptoSearches[i].name;
            cryptoButtonsEl.appendChild(searchedCrypto);
        }
    }

    stockButtonsEl.innerHTML = "";

    if (localStorage.getItem("stockSearch")) {

        stockSearches = JSON.parse(localStorage.getItem("stockSearch"))
    }

    if (stockSearches !== null) {
        for (var i = 0; i < stockSearches.length; i++) {

            // create stock elements
            const searchedStock = document.createElement("button");
            searchedStock.setAttribute("type", "button");
            searchedStock.classList = "waves-effect waves-light btn-small red lighten-1 recentSearchBtn";
            searchedStock.textContent = stockSearches[i].name;
            stockButtonsEl.appendChild(searchedStock);
        }
    }
}




form2.addEventListener("submit",form2Handler)

displaySearches();