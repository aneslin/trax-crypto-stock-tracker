//key for stockdata.org. 
const stockDataKey = 'cLpuGFilZPWRk7OLK4tniIxMab5iHAJfifiHTK5m'


let fetchStock = function(ticker){
    //url to call stockData
    let stockUrl = `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${stockDataKey}`
    fetch(stockUrl)
    .then(function(response){
        if (response.ok){
            response.json()
            .then(function(data){
                console.log(data)
                return data
            })
        }
    }//else error model 
    )
}


fetchStock('TSLA')