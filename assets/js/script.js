const stockHook = document.querySelector("#stockCard")
//key for stockdata.org. 
const stockDataKey = 'cLpuGFilZPWRk7OLK4tniIxMab5iHAJfifiHTK5m'
const testData = {
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
};




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
                .then(function(data){
                    console.log(data)
                    }
                    )
                    }
    }//else error modal 
    )
};

let stockMaker = function(data){
    //create card div
    let CardEl = document.createElement("div");
        CardEl.classList.add("card", "blue-grey");
    
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
    stockHook.appendChild(CardEl)
   
   
   
   

   
   
   
   
   
   
   
}

fetchStock("TSLA")
stockMaker(testData)