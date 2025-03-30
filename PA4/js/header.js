var loginBtn = document.getElementById('login-button');
var loginForm = document.getElementById('login-form');
var registerBtn = document.getElementById('register-button');
var registerForm = document.getElementById('register-form');
var popupContainer = document.getElementById('popupContainer');
var closePopupBtn = document.getElementById('closePopup');

loginBtn.addEventListener('click', function() {
    popupContainer.style.display = 'block';
    loginForm.style.display = 'block';
});

registerBtn.addEventListener('click', function() {
    popupContainer.style.display = 'block';
    registerForm.style.display = 'block';
});

closePopupBtn.addEventListener('click', function() {
    popupContainer.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    sortBy.style.display = 'none';
    filterBy.style.display = 'none';
});

popupContainer.addEventListener('click', function(event) {
    if (event.target === popupContainer) {
        popupContainer.style.display = 'none';
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        sortBy.style.display = 'none';
        filterBy.style.display = 'none';
    }
});

function submitLoginForm(event) {
    event.preventDefault();
    var loginInfo = new XMLHttpRequest();
    loginInfo.open("POST", "../../api.php", false);

    var formData = {
        type: "Login",
        email: document.querySelector('input[name="login-email"]').value,
        password: document.querySelector('input[name="login-password"]').value
    };

    loginInfo.setRequestHeader('Content-Type', 'application/json');
    loginInfo.send(JSON.stringify(formData));
    var loginInfoJSON = JSON.parse(loginInfo.responseText);

    if(loginInfoJSON["status"] == "error") {
        alert(loginInfoJSON["data"]);
    }else 
        localStorage.setItem("apikey", loginInfoJSON["data"]["apikey"]);
        localStorage.setItem("name", loginInfoJSON["data"]["name"]);
        localStorage.setItem("picture", loginInfoJSON["data"]["picture"]);
        localStorage.setItem("theme", loginInfoJSON["data"]["theme"]);
        localStorage.setItem("search", loginInfoJSON["data"]["search"]);
        localStorage.setItem("type", loginInfoJSON["data"]["type"]);
        localStorage.setItem("order", loginInfoJSON["data"]["order"]);
        localStorage.setItem("sort", loginInfoJSON["data"]["sort"]);
        localStorage.setItem("bathrooms", loginInfoJSON["data"]["bathrooms"]);
        localStorage.setItem("bedrooms", loginInfoJSON["data"]["bedrooms"]);
        if(loginInfoJSON["data"]["bathrooms"] == null) { localStorage.setItem("bathrooms", ""); }
        else { localStorage.setItem("bathrooms", loginInfoJSON["data"]["bathrooms"]); }
        if(loginInfoJSON["data"]["bedrooms"] == null) { localStorage.setItem("bedrooms", ""); }
        else { localStorage.setItem("bedrooms", loginInfoJSON["data"]["bedrooms"]); }
        if(loginInfoJSON["data"]["price_min"] == null) { localStorage.setItem("price_min", ""); }
        else { localStorage.setItem("price_min", loginInfoJSON["data"]["price_min"]); }
        if(loginInfoJSON["data"]["price_max"] == null) { localStorage.setItem("price_max", ""); }
        else { localStorage.setItem("price_max", loginInfoJSON["data"]["price_max"]); }
        localStorage.setItem("favourites", loginInfoJSON["data"]["favourites"]);
        location.reload();
    
}

function submitRegisterForm(event) {
    event.preventDefault();
    var registerInfo = new XMLHttpRequest();
    registerInfo.open("POST", "../../api.php", false);

    var formData = {
        type: "Register",
        name: document.querySelector('input[name="register-fname"]').value,
        surname: document.querySelector('input[name="register-lname"]').value,
        email: document.querySelector('input[name="register-email"]').value,
        password: document.querySelector('input[name="register-password"]').value
    };

    registerInfo.setRequestHeader('Content-Type', 'application/json');
    registerInfo.send(JSON.stringify(formData));
    var registerInfoJSON = JSON.parse(registerInfo.responseText);

    if(registerInfoJSON["status"] == "error") {
        alert(registerInfoJSON["data"]);
    }else {
        alert("Registration successful!");
        location.reload();
    }
}

function setProfilePicture(event) {
    if (localStorage.getItem("apikey") != null) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const pictureData = e.target.result;

            var pictureInfo = new XMLHttpRequest();
            pictureInfo.open("POST", "../../api.php", false);

            var formData = {
                type: "SetPicture",
                apikey: localStorage.getItem("apikey"),
                picture: pictureData
            };

            pictureInfo.setRequestHeader('Content-Type', 'application/json');
            pictureInfo.send(JSON.stringify(formData));

            document.querySelector('.profile-img').src = pictureData;
            localStorage.setItem("picture", pictureData);
        };

        reader.readAsDataURL(file);
    }
}

function logout() {
    localStorage.removeItem('apikey');
    localStorage.removeItem('theme');
    localStorage.removeItem('name');
    localStorage.removeItem('picture');
    localStorage.removeItem('search');
    localStorage.removeItem('type');
    localStorage.removeItem('order');
    localStorage.removeItem('sort');
    localStorage.removeItem('bathrooms');
    localStorage.removeItem('bedrooms');
    localStorage.removeItem('price_min');
    localStorage.removeItem('price_max');
    localStorage.removeItem('favourites');
    window.location.replace("index.php");
}

if(localStorage.getItem("apikey") != null) {
    document.querySelector(".profile-img").src = localStorage.getItem("picture");
}

if(localStorage.getItem("apikey") != null) {
    document.querySelector(".username").innerText = localStorage.getItem("name")
}