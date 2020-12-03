// Initialize HTML container references and query list
var mainContentContainer = document.getElementById("main-container");
var searchBar = document.getElementById("search");
var keywordCardContainer = document.getElementById("keyword-container");
var createKeywordBtn = document.getElementById("create-keyword-btn");
// Query History keeps
var queryHist = [];
// Add Btn Listener
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
    axios.get("http://www.omdbapi.com/?apikey=dbf8339d&type=movie&s=" + query).then(function (res) {
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
    }

    axios.get("http://api.giphy.com/v1/gifs/search?api_key=WqveMC9zydrTtIyrQ6XHFg3KZG8x2SJg&q=" + searchQuery).then(function (res) {
        let contentArr = res.data.data;
        contentArr.map(gif => {
            const url = gif.images.downsized.url;
            const desc = gif.title;

            // Create a container for the new content
            let newGIFContainer = document.createElement("div");

            // Create the img and description elements
            createImgElementAndAppend(newGIFContainer, url);
            createPElementAndAppend(newGIFContainer, desc);

            newGIFContainer.className = "content-item";
            // Add the new GIF container and its children to the main content
            mainContentContainer.appendChild(newGIFContainer);
        });

    });
}

// Clears all children of the passed in HTML container/parent. 
// So if div X is passed in with 3 "p" children, it will remove
// all of those p tags
function removeAllChildNodes(parentNode) {
    parentNode.innerHTML = '';
}

function createBtnElementAndReturn(text) {
    let newBtn = document.createElement("button");
    newBtn.innerHTML = text;
    return newBtn;
}

function createImgElementAndAppend(parentContainer, imgURL) {
    let newImg = document.createElement("img");
    newImg.src = imgURL;
    parentContainer.appendChild(newImg);
}

function createPElementAndAppend(parentContainer, text) {
    let newParagraph = document.createElement("p");
    newParagraph.innerHTML = text;
    parentContainer.appendChild(newParagraph);
}