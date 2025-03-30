function getParameterByName(name) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(window.location.href);
  if (!results) {
    return null;
  }
  
  if (!results[2]) {
    return '';
  }
  
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadPage() {
  if(localStorage.getItem("apikey") == null) {
    document.querySelector(".listing").style.display = "none";
    document.querySelector("#loading").style.display = "none";
    document.querySelector(".login-to-view").style.display = "block";
    document.querySelector(".user-info").style.display = "none";
    document.querySelector(".login-register").style.display = "flex";
    document.querySelector(".theme-container").style.display = "none";
    document.querySelector(".navigation").style.display = "flex";
    document.querySelector(".footer").style.display = "flex";
  }else {
    setTheme();
    document.querySelector(".listing").style.display = "none";
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
      document.querySelector(".listing").style.display = "block";
    }, "50");
  }
}

function populatePage() {
  var houseInfo = new XMLHttpRequest();
  houseInfo.open("POST", "../../api.php", false);

  var text = {type: "GetAllListings",
  apikey: localStorage.getItem("apikey"),
  return: ["title", "location", "price", "bedrooms", "bathrooms", "parking_spaces", "amenities", "description", "url", "type", "images"],
  limit: 1,
  search: {id: parseInt(getParameterByName("listing_id"))
  }};

  houseInfo.setRequestHeader('Content-Type', 'application/json');
  houseInfo.send(JSON.stringify(text));
  var houseInfoJSON = JSON.parse(houseInfo.responseText);

  document.querySelector("body > div.listing > div.listinginfo > div.header > h1.title").innerText = houseInfoJSON.data[0].title;

  var item1 = document.createElement("li");
  formatter = new Intl.NumberFormat('en-ZA', {style: 'currency', currency: 'ZAR', maximumFractionDigits: 0});
  item1.innerText = formatter.format(houseInfoJSON.data[0].price);
  document.querySelector("body > div.listing > div.listinginfo > ul.list").appendChild(item1);

  var item5 = document.createElement("li");
  if(houseInfoJSON.data[0].type == "sale") {
    item5.innerText = "For " + houseInfoJSON.data[0].type;

    document.querySelector("body > div.listing > div.listinginfo > div.header > div.score").innerText = calculateSalesScore(houseInfoJSON.data[0].bedrooms, houseInfoJSON.data[0].bathrooms, houseInfoJSON.data[0].parking_spaces, houseInfoJSON.data[0].price);
  }else {
    item5.innerText = "To " + houseInfoJSON.data[0].type;

    document.querySelector("body > div.listing > div.listinginfo > div.header > div.score").innerText = calculateRentalScore(houseInfoJSON.data[0].bedrooms, houseInfoJSON.data[0].bathrooms, houseInfoJSON.data[0].parking_spaces, houseInfoJSON.data[0].price);
  }
  document.querySelector("body > div.listing > div.listinginfo > ul.list").appendChild(item5);

  var item2 = document.createElement("li");
  item2.innerText = "Located in " + houseInfoJSON.data[0].location;
  document.querySelector("body > div.listing > div.listinginfo > ul.list").appendChild(item2);

  var item3 = document.createElement("li");
  item3.innerText = houseInfoJSON.data[0].bedrooms + " Bedroom(s)";
  document.querySelector("body > div.listing > div.listinginfo > ul.list").appendChild(item3);

  var item4 = document.createElement("li");
  item4.innerText = houseInfoJSON.data[0].bathrooms + " Bathroom(s)";
  document.querySelector("body > div.listing > div.listinginfo > ul.list").appendChild(item4);

  var item7 = document.createElement("li");
  if(houseInfoJSON.data[0].parking_spaces == null) {
    item7.innerText = 0 + " Parking spot(s)";
  }else {
    item7.innerText = houseInfoJSON.data[0].parking_spaces + " Parking spot(s)";
  }
  document.querySelector("body > div.listing > div.listinginfo > ul.list").appendChild(item7);

  document.querySelector("body > div.listing > div.listinginfo > p.amenities").innerText = houseInfoJSON.data[0].amenities.substring(2);

  document.querySelector("body > div.listing > div.listinginfo > p.description").innerText = houseInfoJSON.data[0].description.substring(2);

  document.querySelector("body > div.listing > div.listinginfo > a.link").href = houseInfoJSON.data[0].url;

  var slideshow = document.querySelector("body > div.listing > div.media > div.slideshow-container");
  var count = 0;

  for(var i = 0; i < houseInfoJSON.data[0].images.length; i++) {
    if(houseInfoJSON.data[0].images[i] != "") {
      count++;
    }
  }

  for(i = 0; i < houseInfoJSON.data[0].images.length; i++) {
    if(houseInfoJSON.data[0].images[i] != "") {
      var slide = document.createElement("div");
      slide.className = "mySlides fade";
      slideshow.appendChild(slide);

      var number = document.createElement("div");
      number.className = "numbertext";
      number.innerHTML = (i+1) + " / " +  count;
      slide.appendChild(number);

      var img = document.createElement("img");
      img.alt = "slide " + i;
      img.style.width = "500px";
      img.style.height = "500px";
      img.src = houseInfoJSON.data[0].images[i];

      slide.appendChild(img);
    }
  }

  showSlides(slideIndex);

  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + houseInfoJSON.data[0].location + ', South Africa')
  .then(function(response) {return response.json();})
  .then(function(data) {
    if (data.length > 0) {
      var lat = data[0].lat;
      var lon = data[0].lon;

      var map = L.map('map').setView([lat, lon], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup(houseInfoJSON.data[0].location + ", South Africa")
        .openPopup();
      } else {
        console.error('Location not found');
    }
  })
  .catch(function(error) {
    console.error('Error fetching geolocation:', error);
  });
}

var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "block";
}

function calculateRentalScore(numBedrooms, numBathrooms, numParkingSpots, price) {
  bedroomWeight = 2;
  bathroomWeight = 1.5;
  parkingWeight = 1;
  priceWeight = 0.0004;

  score = (numBedrooms * bedroomWeight) + (numBathrooms * bathroomWeight) + (numParkingSpots * parkingWeight) - (price * priceWeight);

  return Math.round(Math.max(1, Math.min(10, score)));
}

function calculateSalesScore(numBedrooms, numBathrooms, numParkingSpots, price) {
  bedroomWeight = 2.5;
  bathroomWeight = 2;
  parkingWeight = 1.5;
  priceWeight = 0.000005;

  score = (numBedrooms * bedroomWeight) + (numBathrooms * bathroomWeight) + (numParkingSpots * parkingWeight) - (price * priceWeight);
  
  return Math.round(Math.max(1, Math.min(10, score)));
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

      document.querySelector(".listinginfo").style.backgroundColor = "#e4e4e4";
      document.querySelector(".listinginfo").style.color = "#313133";
      var list = document.querySelectorAll(".list > li");
      list.forEach(function(item) {
        item.style.color = "#313133";
      });
      document.querySelector(".amenities").style.color = "#313133";
      document.querySelector(".description").style.color = "#313133";

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

      document.querySelector(".listinginfo").style.backgroundColor = "#3E3E3E";
      document.querySelector(".listinginfo").style.color = "#ffffff";
      var list = document.querySelectorAll(".list > li");
      list.forEach(function(item) {
        item.style.color = "#ffffff";
      });
      document.querySelector(".amenities").style.color = "#ffffff";
      document.querySelector(".description").style.color = "#ffffff";

      document.querySelector(".footer").style.backgroundColor = "#3E3E3E";
      var footerParas = document.querySelectorAll(".author-container > p");
      footerParas.forEach(function(footerPara) {
          footerPara.style.color = "#ffffff";
      });

      document.querySelector(".empty").style.color = "#ffffff";
  }
}