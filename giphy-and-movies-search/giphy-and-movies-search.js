var keywordContainer = document.getElementById("keyword-container");
var contentContainer = document.getElementById("main-container");
var mainContentContainer = document.getElementById("main-container");
var queryHist = [];


var searchBar = document.getElementById("search");
var keywordCardContainer = document.getElementById("keyword-container");

var createKeywordBtn = document.getElementById("create-keyword-btn");
createKeywordBtn.addEventListener("click", () => {
    createKeyWordCard(keywordCardContainer, searchBar.value);
});


function createKeyWordCard(containerParent, keyword) {

    let outsideContainer = document.createElement("div");
    outsideContainer.className = "col-xs-1-12";
    let cardContainer = document.createElement("div");
    cardContainer.className = "card";

    outsideContainer.appendChild(cardContainer);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    cardContainer.appendChild(cardBody);


    let cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.textContent = keyword;

    let cardMovieBtn = document.createElement("button");
    cardMovieBtn.innerHTML = "Movies";
    cardMovieBtn.addEventListener("click", () => {
        getMovies(cardTitle.textContent);
    });

    let cardGIFBtn = document.createElement("button");
    cardGIFBtn.innerHTML = "GIFs";
    cardGIFBtn.addEventListener("click", () => {
        getGIF(cardTitle.textContent);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardMovieBtn);
    cardBody.appendChild(cardGIFBtn);

    containerParent.appendChild(outsideContainer);
}


function getMovies(query) {
    removeAllChildNodes(mainContentContainer);
    axios.get("http://www.omdbapi.com/?apikey=YOUR_API_KEY_GOES_HERE&type=movie&s=" + query).then(function (res) {
        let responseArray = res.data.Search;
        for (let i = 0; i < 11; i++) {
            let newMovieContainer = document.createElement("div");
            newMovieContainer.className = "content-item";

            let moviePosterSrcImg = responseArray[i].Poster;
            let movieTitle = responseArray[i].Title;

            let newMovieImg = document.createElement("img");
            newMovieImg.src = moviePosterSrcImg;

            let newMovieTitle = document.createElement("h3");
            newMovieTitle.textContent = movieTitle;

            newMovieContainer.appendChild(newMovieTitle);
            newMovieContainer.appendChild(newMovieImg);
            mainContentContainer.appendChild(newMovieContainer);
        }
    });

}



function getGIF(query) {
    removeAllChildNodes(mainContentContainer);
    let searchQuery;
    if (query.length > 0) {
        searchQuery = query;
    } else {
        searchQuery = searchBar.value;
    }


    if (!(queryHist.includes(searchQuery))) {
        let newSearchBtn = document.createElement("button");
        newSearchBtn.innerHTML = searchQuery;
        newSearchBtn.addEventListener("click", function () {
            getGIF(this.innerHTML);
        });
        queryHist.push(searchQuery);
        document.body.prepend(newSearchBtn);
    }

    axios.get("http://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY_GOES_HERE&q=" + searchQuery).then(function (res) {
        let contentArr = res.data.data;
        contentArr.map(gif => {
            const url = gif.images.downsized.url;
            const desc = gif.title;

            let newGIFContainer = document.createElement("div");

            let newGIFImg = document.createElement("img");
            newGIFImg.src = url;

            let gifDesc = document.createElement("p");
            gifDesc.innerHTML = desc;

            newGIFContainer.className = "content-item";
            newGIFContainer.appendChild(newGIFImg);
            newGIFContainer.appendChild(gifDesc);


            mainContentContainer.appendChild(newGIFContainer);
        });

    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}