<head>
    <link rel="stylesheet" type="text/css" href="css/header_styles.css">
    <script src="js/header.js" defer></script>
</head>

<div class="navigation" style="display: none;">
    <div class="nav-element">
        <img class="logo" src="img/logo2.png" width="200" alt="Logo 2">
    </div>

    <div class="nav-element">
        <a href="index.php" class="tab-button" id="button1">Listings</a>
    </div>

    <div class="nav-element">
        <a href="agents.php" class="tab-button" id="button2">Agents</a>
    </div>

    <div class="nav-element">
        <a href="calculators.php" class="tab-button" id="button3">Calculators</a>
    </div>

    <div class="nav-element">
        <a href="favourites.php" class="tab-button" id="button4">Favourites</a>
    </div>

    <div class="nav-element">
        <div class="login-register" style="display: none;">
            <span class="login-register-element">
                <button id="login-button">
                    <img class="login-register-img" src="img/login.png" alt="Login">
                    <p class="login-register-text">Login</p>
                </button>
            </span>

            <span class="login-register-element">
                <button id="register-button">
                    <img class="login-register-img" src="img/register.png" alt="Register">
                    <p class="login-register-text">Register</p>
                </button>
            </span>
        </div>

        <div class="user-info" style="display: none;">
            <span style="align-items: flex-end; margin-right: 10px;">
                <label class="profile-container" for="fileField" style="cursor: pointer;">
                    <img class="profile-img" src="img/profile.png" width=50 alt="Profile Picture">
                    <img class="profle-img-add" src="img/add.png" alt="Add image">
                </label>
                
                <input type="file" id="fileField" name="file" accept="image/*" style="display: none;" onchange="setProfilePicture(event)">
            </span>

            <span style="align-items: flex-start; margin-left: 10px;">
                <div class="username">
                    User
                </div>

                <div>
                    <button class="logout" onclick="logout()">Log out</button>
                </div>
            </span>
        </div>
    </div>
</div>

<div id="popupContainer">
    <div id="popupContent">
        <button id="closePopup">
            <img src="img/close.png" width="20"></img>
        </button>

        <form id="login-form" style="display: none; width: 100%; height: 100%;">
            <div class="form-group">
                Login
            </div>

            <hr>

            <div class="form-group">
                <input type="email" class="login-email" name="login-email" placeholder="Email" required>
            </div>

            <div class="form-group">
                <input type="password" class="login-password" name="login-password" placeholder="Password" required>
            </div>

            <hr>

            <div class="form-group">
                <input type="submit" value="Login" class="login-submit" onclick="submitLoginForm(event)">
            </div>
        </form>

        <form id="register-form" style="display: none; width: 100%; height: 100%;">
            <div class="form-group">
                Register
            </div>

            <hr>

            <div class="form-group">
                <span class="register-left">
                    <input type="text" class="register-fname" name="register-fname" placeholder="Name" required>
                </span>

                <span class="register-right">
                    <input type="text" class="register-lname" name="register-lname" placeholder="Surname" required>
                </span>
            </div>

            <div class="form-group">
                <span class="register-left">
                    <input type="email" class="register-email" name="register-email" placeholder="Email" required>
                </span>

                <span class="register-right">
                    <input type="password" class="register-password" name="register-password" placeholder="Password" required>
                </span>
            </div>

            <hr>

            <div class="form-group">
                <input type="submit" value="Register" class="register-submit" onclick="submitRegisterForm(event)">
            </div>
        </form>

        <div class="sortby" style="display: none; width: 100%; height: 100%;">
            <div class="form-group">
                Sort by
            </div>

            <hr>

            <div class="form-group">
                <span>
                    <button class="sortBtn" onclick="setSort(null)">Default</button>
                </span>

                <span>
                    <button class="sortBtn" onclick="setSort('price')">Price</button>
                </span>

                <span>
                    <button class="sortBtn" onclick="setSort('title')">Title</button>
                </span>
            </div>

            <hr>

            <div class="form-group">
                <span>
                    <button class="sortBtn" onclick="setOrder('ASC')">Ascending</button>
                </span>

                <span>
                    <button class="sortBtn" onclick="setOrder('DESC')">Descending</button>
                </span>
            </div>

            <hr>

            <div class="form-group">
                <button class="sort-submit" onclick="submitSort(false)">Sort</button>
            </div>
        </div>

        <div class="filterby" style="display: none; width: 100%; height: 100%;">
            <div class="form-group">
                Filter by
            </div>

            <hr>

            <div class="form-group">
                <span>
                    <input type="number" id="bathsearch" class="filterField" name="bathrooms" placeholder=" Bathrooms">
                </span>

                <span>
                    <input type="number" id="bedsearch" class="filterField" name="bedrooms" placeholder=" Bedrooms">
                </span>
            </div>

            <div class="form-group">
                <span>
                    <input type="number" id="minpricesearch" class="filterField" name="price_min" placeholder=" Minimum Price">
                </span>

                <span>
                    <input type="number" id="maxpricesearch" class="filterField" name="price_max" placeholder=" Maximum Price">
                </span>
            </div>

            <hr>

            <div class="form-group">
                <button class="filter-submit" onclick="submitFilter(false)">Filter</button>
            </div>
        </div>
    </div>
</div>