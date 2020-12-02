var gifBtn = document.getElementById("gif-btn");
gifBtn.addEventListener("click", getGIF);

var mainContentContainer = document.getElementById("main-container");
var queryHist = [];

function getGIF(query) {
    removeAllChildNodes(mainContentContainer);
    let searchQuery;
    if (query.length > 0) {
        searchQuery = query;
    } else {
        searchQuery = document.getElementById("gif-input").value;
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

    axios.get("http://api.giphy.com/v1/gifs/search?api_key=WqveMC9zydrTtIyrQ6XHFg3KZG8x2SJg&q=" + searchQuery).then(function (res) {
        let contentArr = res.data.data;
        contentArr.map(gif => {
            const url = gif.images.downsized.url;
            const desc = gif.title;

            let newGIFContainer = document.createElement("div");

            let newGIFImg = document.createElement("img");
            newGIFImg.src = url;

            let gifDesc = document.createElement("p");
            gifDesc.innerHTML = desc;

            newGIFContainer.className = "gif-item";
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