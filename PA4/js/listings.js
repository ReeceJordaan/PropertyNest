/* Reece Jordaan u23547104*/

// Reasoning: I chose synchronous AJAX calls because the sequential nature of synchronous AJAX calls increased the reliablility
// of my website since I certain that the request would be finished by the time I need to use the returned data.

var sortBtn = document.querySelector('.dropbtn');
var sortBy = document.querySelector('.sortby');
var filterBtn = document.querySelector('.filterbtn');
var filterBy = document.querySelector('.filterby');

var listingCount = 30;
var sort = null;
var order = "DESC";
var bed = null;
var bath = null;
var minprice = null;
var maxprice = null;

function loadPage(useCookies) {
    if(localStorage.getItem("apikey") == null) {
        document.querySelector(".listings").style.display = "none";
        document.querySelector("#loading").style.display = "none";
        document.querySelector(".login-to-view").style.display = "block";
        document.querySelector(".user-info").style.display = "none";
        document.querySelector(".login-register").style.display = "flex";
        document.querySelector(".theme-container").style.display = "none";
        document.querySelector(".navigation").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";
        document.querySelector("#button1").style.backgroundColor = "#9A9B9B";
    }else {
        setTheme();
        document.querySelector(".listings").style.display = "none";
        document.querySelector("#loading").style.display = "block";
        document.querySelector(".login-to-view").style.display = "none";
        document.querySelector(".user-info").style.display = "flex";
        document.querySelector(".login-register").style.display = "none";
        document.querySelector(".theme-container").style.display = "flex";
        document.querySelector(".savebtn").style.display = "block";

        var search;
        var type;

        if(useCookies) {
            type = localStorage.getItem("type");
            order = localStorage.getItem("order");
            bed = parseInt(localStorage.getItem("bedrooms"));
            bath = parseInt(localStorage.getItem("bathrooms"));
            minprice = parseFloat(localStorage.getItem("price_min"));
            maxprice = parseFloat(localStorage.getItem("price_max"));

            if(localStorage.getItem("search") == "") {
                search = null
            }else {
                search = localStorage.getItem("search");
            }

            if(localStorage.getItem("sort") == "null" || localStorage.getItem("sort") == "") {
                sort = null
            }else {
                sort = localStorage.getItem("sort");
            }

            if(type == "sale") {
                document.querySelector(".buy-rent").checked = false;
            }else {
                document.querySelector(".buy-rent").checked = true;
            }
        }else {
            if(document.querySelector(".search").value == "") {
                search = null;
            }else {
                search = document.querySelector(".search").value;
            }

            if(document.querySelector(".buy-rent").checked == false) {
                type = "sale";
            }else {
                type = "rent";
            }
        }

        document.querySelector(".search").value = search;
        document.querySelector("#bedsearch").value = bed;
        document.querySelector("#bathsearch").value = bath;
        document.querySelector("#minpricesearch").value = minprice;
        document.querySelector("#maxpricesearch").value = maxprice;

        setTimeout(function() {
            populatePage(order, search, type, bed, bath, minprice, maxprice);
            setTheme();
            document.querySelector(".navigation").style.display = "flex";
            document.querySelector(".utilities").style.display = "flex";
            document.querySelector(".footer").style.display = "flex";
            document.querySelector("#loading").style.display = "none";
            document.querySelector(".listings").style.display = "block";
        }, "50");
    }
}

function populatePage(order, loc, type, bed, bath, minprice, maxprice) {
    var houseInfo = new XMLHttpRequest();
    houseInfo.open("POST", "../../api.php", false);

    var text = {type: "GetAllListings",
                apikey: localStorage.getItem("apikey"),
                return: ["id", "title", "location", "price", "bedrooms", "bathrooms", "type", "images"],
                limit: listingCount,
                sort: sort,
                order: order,
                search: {location: loc,
                        price_min: minprice,
                        price_max: maxprice,
                        bedrooms: bed,
                        bathrooms: bath,
                        type: type}
                };

    houseInfo.setRequestHeader('Content-Type', 'application/json');
    houseInfo.send(JSON.stringify(text));
    var houseInfoJSON = JSON.parse(houseInfo.responseText);

    var listingsDiv = document.querySelector("body > div.listings");
    listingsDiv.replaceChildren();

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
        input.className = "heart-checkbox";
        input.type = "checkbox";
        input.id = "heart-checkbox-" + houseInfoJSON.data[i].id;
        input.name = houseInfoJSON.data[i].id;
        input.addEventListener("change", function(event) {
            checkboxChanged(event.target.name);
        });
        col.appendChild(input);

        var label = document.createElement("label");
        label.htmlFor = "heart-checkbox-" + houseInfoJSON.data[i].id;
        col.appendChild(label);

        if(localStorage.getItem("favourites") != null && localStorage.getItem("favourites").includes(houseInfoJSON.data[i].id)) {
            input.checked = true;
        }

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

    if(listingsDiv.getElementsByClassName("column").length == 0) {
        document.querySelector(".empty").style.display = "block";
    }else {
        document.querySelector(".empty").style.display = "none";
    }
}

function searchKeyPress(e) {
    if (e.keyCode == 13) {
        loadPage(false);
        return false;
    }
    return true;
}

function setSort(value) {
    sort = value;
}

function setOrder(value) {
    order = value;
}

function setBath(value) {
    if(value == "") {
        bath = null;
    }else {
        bath = parseInt(value);
    }
}

function setBed(value) {
    if(value == "") {
        bed = null;
    }else {
        bed = parseInt(value);
    }
}

function setMin(value) {
    if(value == "") {
        minprice = null;
    }else {
        minprice = parseFloat(value);
    }
}

function setMax(value) {
    if(value == "") {
        maxprice = null;
    }else {
        maxprice = parseFloat(value);
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

        document.querySelector(".utilities").style.backgroundColor = "#e4e4e4";

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

        document.querySelector(".utilities").style.backgroundColor = "#3E3E3E";

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

    document.querySelector("#button1").style.backgroundColor = "#9A9B9B";
}

function updateDBFilters() {
    var filterInfo = new XMLHttpRequest();
    filterInfo.open("POST", "../../api.php", true);

    var dbsort;
    var bathrooms;
    var bedrooms;
    var price_min;
    var price_max;

    if(localStorage.getItem("sort") == "null") {
        dbsort = null;
    }else {
        dbsort = localStorage.getItem("sort");
    }

    if(localStorage.getItem("bathrooms") == "") {
        bathrooms = null;
    }else {
        bathrooms = localStorage.getItem("bathrooms");
    }

    if(localStorage.getItem("bedrooms") == "") {
        bedrooms = null;
    }else {
        bedrooms = localStorage.getItem("bedrooms");
    }

    if(localStorage.getItem("price_min") == "") {
        price_min = null;
    }else {
        price_min = localStorage.getItem("price_min");
    }

    if(localStorage.getItem("price_max") == "") {
        price_max = null;
    }else {
        price_max = localStorage.getItem("price_max");
    }

    var filterInfoData = {
        type: "SetFilters",
        apikey: localStorage.getItem("apikey"),
        search: localStorage.getItem("search"),
        sorttype: localStorage.getItem("type"),
        order: localStorage.getItem("order"),
        sort: dbsort,
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        price_min: price_min,
        price_max: price_max
    };

    filterInfo.setRequestHeader('Content-Type', 'application/json');
    filterInfo.send(JSON.stringify(filterInfoData));
}

function saveFilters() {
    localStorage.setItem("search", document.querySelector(".search").value);

    localStorage.setItem("sort", sort);

    localStorage.setItem("order", order);

    if(document.querySelector(".buy-rent").checked == true) {
        localStorage.setItem("type", "rent");
    }else {
        localStorage.setItem("type", "sale");
    }

    localStorage.setItem("bathrooms", document.querySelector("#bathsearch").value);
    localStorage.setItem("bedrooms", document.querySelector("#bedsearch").value);
    localStorage.setItem("price_min", document.querySelector("#minpricesearch").value);
    localStorage.setItem("price_max", document.querySelector("#maxpricesearch").value);

    alert("Saved!");

    updateDBFilters();
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

    if (temp == "") {
        temp = id;
    } else {
        temp += "," + id;
    }
    localStorage.setItem("favourites", temp);

    updateFavourites();
}

function removeFromFavourites(id) {
    var temp = localStorage.getItem("favourites");

    if (!temp.includes(",")) {
        localStorage.setItem("favourites", "");
    } else {
        if (temp.startsWith(id + ",")) {
            temp = temp.replace(id + ",", "");
        } else {
            temp = temp.replace("," + id, "");
        }
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

sortBtn.addEventListener('click', function() {
    popupContainer.style.display = 'block';
    sortBy.style.display = 'flex';
});

filterBtn.addEventListener('click', function() {
    popupContainer.style.display = 'block';
    filterBy.style.display = 'flex';
});

function submitSort(useCookies) {   
    popupContainer.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    sortBy.style.display = 'none';
    filterBy.style.display = 'none';
    loadPage(useCookies);
}

function submitFilter(useCookies) {
    setBath(document.querySelector("#bathsearch").value);
    setBed(document.querySelector("#bedsearch").value);
    setMin(document.querySelector("#minpricesearch").value);
    setMax(document.querySelector("#maxpricesearch").value);

    popupContainer.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    sortBy.style.display = 'none';
    filterBy.style.display = 'none';
    loadPage(useCookies);
}