function changeTheme() {
    if(document.querySelector(".light-dark").checked == false) {
        var themeInfo = new XMLHttpRequest();
        themeInfo.open("POST", "../../api.php", true);

        var themeInfoData = {
            type: "SetTheme",
            apikey: localStorage.getItem("apikey"),
            theme: "light"
        };

        themeInfo.setRequestHeader('Content-Type', 'application/json');
        themeInfo.send(JSON.stringify(themeInfoData));

        localStorage.setItem("theme", "light");
        setTheme();
    }else {
        var themeInfo = new XMLHttpRequest();
        themeInfo.open("POST", "../../api.php", true);

        var themeInfoData = {
            type: "SetTheme",
            apikey: localStorage.getItem("apikey"),
            theme: "dark"
        };

        themeInfo.setRequestHeader('Content-Type', 'application/json');
        themeInfo.send(JSON.stringify(themeInfoData));

        localStorage.setItem("theme", "dark");
        setTheme();
    }
}