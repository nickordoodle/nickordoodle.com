var kanyeBtn = document.getElementById("kanye-btn");
kanyeBtn.addEventListener("click", getKanyeQuote);

function getKanyeQuote() {
    axios.get("https://api.kanye.rest/").then(function (res) {
        let quote = res.data.quote;
        let newQuoteP = document.createElement("p");
        newQuoteP.innerHTML = quote;
        document.getElementById("main-container").appendChild(newQuoteP);
    });
}