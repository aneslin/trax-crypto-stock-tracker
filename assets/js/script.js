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
        if (response.ok){
                response.json()
                .then(function(data){
                    console.log(data)
                    }
                    )
                    }
    }//else error modal 
    )
};

let stockMaker = function(data){
    let CardEl = document.createElement("div");
    CardEl.classList.add("card", "blue-grey");
   let nameEl = document.createElement("h3");
   nameEl.classList.add("card-title");
   let wrapperEl = document.createElement("ul");
   let tickerEl = document.createElement("li");
   let priceEl = document.createElement("li");
   let highEl = document.createElement("li");
   let lowEl = document.createElement('li');
   let changeEl = document.createElement("li");
   nameEl.textContent = data.name;
   tickerEl.textContent = ` Symbol: ${data.ticker}`;
   priceEl.textContent = `Price: ${data.price}`;
   highEl.textContent =`Daily High: ${data.day_high}`;
   lowEl.textContent = `Daily Low: ${data.day_low}`;
   changeEl.textContent = `Day Change: ${data.day_change}`
   wrapperEl.appendChild(tickerEl);
   wrapperEl.appendChild(priceEl);
   wrapperEl.appendChild(highEl);
   wrapperEl.appendChild(lowEl);
   wrapperEl.appendChild(changeEl);
   CardEl.appendChild(nameEl);
   CardEl.appendChild(wrapperEl)
    stockHook.appendChild(CardEl)
}


stockMaker(testData)