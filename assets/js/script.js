var cryptoInput= document.getElementById("cryptoInput");
var cryptoBtn = document.getElementById("cryptoBtn");
var cryptoCardEL = document.querySelector("#cryptoCard");

const stockHook = document.querySelector("#stockCard")
const form2 = document.querySelector('#form2')
//key for stockdata.org. 
const stockDataKey = 'cLpuGFilZPWRk7OLK4tniIxMab5iHAJfifiHTK5m'
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

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var symbols = cryptoInput.value.trim();

    if (symbols) {
      cryptoData(symbols);

          // clear old content

    // cryptoInput.value = "";
      
    } 
    else {
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
              cryptoCurrency(data)
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
                    console.log(stock)
                    console.log(stock.data[0])
                    }
                    )
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
        cryptoCardEL.innerHTML=''
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
    cryptoCardEL.appendChild(cryptoInfo)}
    cryptoInput.value =""
        }

function form2Handler(event){
    event.preventDefault()
    //get value of form input field
    textInput = document.getElementById('stockInput')
    //remove space
    let ticker = textInput.value.trim()
    console.log(ticker)
    //pass ticker value into fetchStock
    fetchStock(ticker)

    textInput.value=""
}




form2.addEventListener("submit",form2Handler)

