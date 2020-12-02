var alphaBtn = document.getElementById("get-prices-btn");
alphaBtn.addEventListener("click", getSampleData);

function getSampleData() {

    // VYCZ0EX0DSCTQ2OV
    axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=VYCZ0EX0DSCTQ2OV").then(function (res) {
        console.log(res)
    });
}