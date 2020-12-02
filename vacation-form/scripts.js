var submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("click", addWishListItem);

function addWishListItem(event) {
    //extract values
    var nameInput = document.getElementById("destination-name").value;
    var locationInput = document.getElementById("location").value;
    var imageURL = document.getElementById("photo-url").value;
    var descriptionInput = document.getElementById("description").value;
    //add to new element
    let container = document.getElementById("right-container");

    let newGroup = document.createElement("div");
    newGroup.style.backgroundColor = "black";
    newGroup.innerHTML = "New Item";

    //child elements to new item
    let name = document.createElement("p");
    name.innerHTML = nameInput;
    name.style.color = "white";

    let location = document.createElement("p");
    location.innerHTML = locationInput;
    location.style.color = "white";

    let photo = document.createElement("img");
    photo.src = imageURL;

    let description = document.createElement("p");
    description.innerHTML = descriptionInput;
    description.style.color = "white";



    newGroup.appendChild(name);
    newGroup.appendChild(location);
    newGroup.appendChild(photo);
    newGroup.appendChild(description);

    newGroup.className = "wishlist-item";

    container.appendChild(newGroup);
}