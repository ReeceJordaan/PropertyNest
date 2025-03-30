<!--Reece Jordaan u23547104--> 

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Favourites</title>
        <link rel="stylesheet" href="css/favourites_styles.css">
        <script src="js/favourites.js"></script>
    </head>

    <body onload="loadPage()">
        <div id="loading"></div>
    
        <?php include "header.php"; ?>

        <div class="listings" style="display: none"></div>

        <div class="empty" style="display: none">No favourites found</div>

        <div class="login-to-view" style="display: none">Login to view content</div>

        <?php include "footer.php"; ?>
    </body>
</html>