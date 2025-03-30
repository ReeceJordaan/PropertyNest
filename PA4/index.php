<!--Reece Jordaan u23547104--> 

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Listings</title>
        <link rel="stylesheet" href="css/listings_styles.css">
        <script src="js/listings.js" defer></script>
    </head>

    <body onload="loadPage(true)">
        <div id="loading"></div>

        <?php include "header.php"; ?>

        <div class="utilities" style="display: none;">
            <span class="span">
                <input class="search" type="text" placeholder="Search location..." onkeypress="return searchKeyPress(event);">
            </span>

            <span class="span">
                <label class="switch">
                    <input type="checkbox" class="buy-rent" onclick="loadPage(false)">
                    <span class="slider round">
                        <span class="slider-text slider-text-buy">Buy</span>
                        <span class="slider-text slider-text-rent">Rent</span>
                    </span>
                </label>
            </span>

            <span class="span">
                <button class="dropbtn">Sort by</button>
            </span>

            <span class="span">
                <button class="filterbtn">Filter by</button>
            </span>
        </div>

        <div class="listings"  style="display: none;"></div>

        <div class="empty" style="display: none">No listings currently available</div>

        <div class="login-to-view" style="display: none">Login to view content</div>

        <?php include "footer.php"; ?>
    </body>
</html>