<!--Reece Jordaan u23547104--> 

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agents</title>
        <link rel="stylesheet" href="css/agents_styles.css">
        <script src="js/agents.js" defer></script>
    </head>

    <body onload="loadPage()">
        <div id="loading"></div>

        <?php include "header.php"; ?>

        <div class="agents" style="display: none"></div>

        <div class="empty" style="display: none">No agents currently available</div>

        <div class="login-to-view" style="display: none">Login to view content</div>

        <?php include "footer.php"; ?>
    </body>
</html>