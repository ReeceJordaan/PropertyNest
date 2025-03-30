function loadPage() {
    if(localStorage.getItem("apikey") == null) {
        document.querySelector(".listings").style.display = "none";
        document.querySelector("#loading").style.display = "none";
        document.querySelector(".login-to-view").style.display = "block";
        document.querySelector(".user-info").style.display = "none";
        document.querySelector(".login-register").style.display = "flex";
        document.querySelector(".theme-container").style.display = "none";
        document.querySelector(".navigation").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";
        document.querySelector("#button4").style.backgroundColor = "#9A9B9B";
    }else {
        setTheme();
        document.querySelector(".listings").style.display = "none";
        document.querySelector("#loading").style.display = "block";
        document.querySelector(".login-to-view").style.display = "none";
        document.querySelector(".user-info").style.display = "flex";
        document.querySelector(".login-register").style.display = "none";
        document.querySelector(".theme-container").style.display = "flex";

        setTimeout(function() {
            populatePage();
            setTheme();
            document.querySelector(".navigation").style.display = "flex";
            document.querySelector(".footer").style.display = "flex";
            document.querySelector("#loading").style.display = "none";
            document.querySelector(".listings").style.display = "block";
        }, "50");
    }
}

function populatePage() {
    var favouritesArr = [];

    if(localStorage.getItem("favourites") != "") {
        favouritesArr = localStorage.getItem("favourites").split(",");
    }

    var listingsDiv = document.querySelector("body > div.listings");
    listingsDiv.replaceChildren();

    for(var j = 0; j < favouritesArr.length; j++) {
        var houseInfo = new XMLHttpRequest();
        houseInfo.open("POST", "../../api.php", false);

        var text = {type: "GetAllListings",
        apikey: localStorage.getItem("apikey"),
        return: ["id", "title", "location", "price", "bedrooms", "bathrooms", "type", "images"],
        limit: 1,
        search: {id: parseInt(favouritesArr[j])}
        };

        houseInfo.setRequestHeader('Content-Type', 'application/json');
        houseInfo.send(JSON.stringify(text));
        var houseInfoJSON = JSON.parse(houseInfo.responseText);

        for(var i = 0; i < houseInfoJSON.data.length; i++) {
            var col = document.createElement("div");
            col.className = "column";
            col.id = i;
            listingsDiv.appendChild(col);

            var anchor = document.createElement("a");
            anchor.href = "view.php?listing_id=" + houseInfoJSON.data[i].id;
            col.appendChild(anchor);

            var img = document.createElement("img");
            img.className = "house";
            img.alt = "House " + (i+1);
            img.style.objectFit = "cover";
            img.style.width = "100%";
            img.src = houseInfoJSON.data[i].images[0];

            anchor.appendChild(img);

            var listing = document.createElement("div");
            listing.className = "listing";
            col.appendChild(listing);

            var input = document.createElement("input");
            input.type = "checkbox";
            input.id = "heart-checkbox-" + houseInfoJSON.data[i].id;
            input.name = houseInfoJSON.data[i].id;
            input.addEventListener("change", function(event) {
                checkboxChanged(event.target.name);
            });
            input.checked = true;
            col.appendChild(input);

            var label = document.createElement("label");
            label.htmlFor = "heart-checkbox-" + houseInfoJSON.data[i].id;
            col.appendChild(label);

            listing.innerHTML = houseInfoJSON.data[i].title;

            var features = document.createElement("ul");
            features.className = "features";
            listing.appendChild(features);

            var price = document.createElement("li");
            formatter = new Intl.NumberFormat('en-ZA', {style: 'currency', currency: 'ZAR', maximumFractionDigits: 0});
            price.innerHTML = formatter.format(houseInfoJSON.data[i].price);
            features.appendChild(price);

            loc = document.createElement("li");
            loc.className = "location";
            loc.innerHTML = houseInfoJSON.data[i].location;
            features.appendChild(loc);

            bed = document.createElement("li");
            bed.innerHTML = houseInfoJSON.data[i].bedrooms + " Bedrooms";
            features.appendChild(bed);

            bath = document.createElement("li");
            bath.innerHTML = houseInfoJSON.data[i].bathrooms + " Bathrooms";
            features.appendChild(bath);

            type = document.createElement("li");
            type.className = "type";
            if(houseInfoJSON.data[i].type == "sale") {
                type.innerHTML = "For " + houseInfoJSON.data[i].type;
            }else {
                type.innerHTML = "To " + houseInfoJSON.data[i].type;
            }
            features.appendChild(type);
        }
    }

    if(listingsDiv.getElementsByClassName("column").length == 0) {
        document.querySelector(".empty").style.display = "block";
    }else {
        document.querySelector(".empty").style.display = "none";
    }
}

function setTheme() {
    if(localStorage.getItem("theme") == "light" || localStorage.getItem("theme") == null) {
        document.querySelector(".light-dark").checked = false;

        document.querySelector("#loading").style.backgroundColor = "#ffffff";

        document.body.style.backgroundColor = "#ffffff";

        document.querySelector(".navigation").style.backgroundColor = "#e4e4e4";
        var tabButtons = document.querySelectorAll(".tab-button");
        tabButtons.forEach(function(tabButton) {
            tabButton.style.backgroundColor = "#e4e4e4";
            tabButton.style.color = "#313133";
        });
        document.querySelector(".username").style.color = "#313133";
        document.querySelector(".logout").style.color = "#313133";

        var listings = document.querySelectorAll(".listing");
        listings.forEach(function(listing) {
            listing.style.backgroundColor = "#e4e4e4";
            listing.style.color = "#005c91";
            var featuresList = listing.querySelector(".features");
            if (featuresList) {
                var featureItems = featuresList.querySelectorAll("li");
                featureItems.forEach(function(item) {
                    item.style.color = "#313133";
                });
            }
        });

        document.querySelector(".footer").style.backgroundColor = "#e4e4e4";
        var footerParas = document.querySelectorAll(".author-container > p");
        footerParas.forEach(function(footerPara) {
            footerPara.style.color = "#313133";
        });

        document.querySelector(".empty").style.color = "#313133";
    }else {
        document.querySelector(".light-dark").checked = true;

        document.querySelector("#loading").style.backgroundColor = "#000000";

        document.body.style.backgroundColor = "#000000";

        document.querySelector(".navigation").style.backgroundColor = "#3E3E3E";
        var tabButtons = document.querySelectorAll(".tab-button");
        tabButtons.forEach(function(tabButton) {
            tabButton.style.backgroundColor = "#3E3E3E";
            tabButton.style.color = "#ffffff";
        });
        document.querySelector(".username").style.color = "#ffffff";
        document.querySelector(".logout").style.color = "#ffffff";

        var listings = document.querySelectorAll(".listing");
        listings.forEach(function(listing) {
            listing.style.backgroundColor = "#3E3E3E";
            listing.style.color = "#ffffff";
            var featuresList = listing.querySelector(".features");
            if (featuresList) {
                var featureItems = featuresList.querySelectorAll("li");
                featureItems.forEach(function(item) {
                    item.style.color = "#ffffff";
                });
            }
        });

        document.querySelector(".footer").style.backgroundColor = "#3E3E3E";
        var footerParas = document.querySelectorAll(".author-container > p");
        footerParas.forEach(function(footerPara) {
            footerPara.style.color = "#ffffff";
        });

        document.querySelector(".empty").style.color = "#ffffff";
    }

    document.querySelector("#button4").style.backgroundColor = "#9A9B9B";
}

function checkboxChanged(id) {
    var checkbox = document.getElementById("heart-checkbox-" + id);
    if (checkbox.checked) {
        addToFavourites(id);
    } else {
        removeFromFavourites(id);
    }
}

function addToFavourites(id) {
    var temp = localStorage.getItem("favourites");

    if(temp == "") {
        temp = id;
        localStorage.setItem("favourites", temp);
    }else {
        temp += "," + id;
        localStorage.setItem("favourites", temp);
    }

    updateFavourites();
}

function removeFromFavourites(id) {
    var temp = localStorage.getItem("favourites");

    if(!temp.includes(",")) {
        localStorage.setItem("favourites", "");
    }else {
        temp = temp.replace("," + id, "");
        localStorage.setItem("favourites", temp);
    }

    updateFavourites();
}

function updateFavourites() {
    var favouritesInfo = new XMLHttpRequest();
    favouritesInfo.open("POST", "../../api.php", true);

    var favouritesInfoData = {
        type: "SetFavourites",
        apikey: localStorage.getItem("apikey"),
        favourites: localStorage.getItem("favourites")
    };

    favouritesInfo.setRequestHeader('Content-Type', 'application/json');
    favouritesInfo.send(JSON.stringify(favouritesInfoData));
}