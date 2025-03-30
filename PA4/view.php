<!--Reece Jordaan u23547104--> 

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>View</title>
        <link rel="stylesheet" href="css/view_styles.css">
        <script src="js/view.js" defer></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    </head>

    <body onload="loadPage()">
        <div id="loading"></div>

        <?php include "header.php"; ?>

        <div class="listing" style="display: none">
            <div class="media">
                <div class="slideshow-container">
                    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>
                </div>

                <div id="map"></div>
            </div>

            <div class="listinginfo">
                <div class="header">
                    <h1 class="title">temp</h1>
                    <div class="score">5</div>
                </div>
                
                <ul class="list"></ul>

                <h2>Amenities</h2>
                <p class="amenities"></p>

                <h2>Description</h2>
                <p class="description"></p>

                <a class="link" href="" target="_blank">
                    🌐 Website
                </a>
            </div>
        </div>

        <div class="empty" style="display: none">Listing is currently not available</div>

        <div class="login-to-view" style="display: none">Login to view content</div>

        <?php include "footer.php"; ?>
    </body>
</html>