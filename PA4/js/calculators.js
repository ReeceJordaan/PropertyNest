/* Reece Jordaan u23547104*/

function loadPage() {
    if(localStorage.getItem("apikey") == null) {
        document.querySelector(".calculators").style.display = "none";
        document.querySelector("#loading").style.display = "none";
        document.querySelector(".login-to-view").style.display = "block";
        document.querySelector(".user-info").style.display = "none";
        document.querySelector(".login-register").style.display = "flex";
        document.querySelector(".theme-container").style.display = "none";
        document.querySelector(".navigation").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";
        document.querySelector("#button3").style.backgroundColor = "#9A9B9B";
    }else {
        setTheme(); 
        document.querySelector(".calculators").style.display = "none";
        document.querySelector("#loading").style.display = "block";
        document.querySelector(".login-to-view").style.display = "none";
        document.querySelector(".user-info").style.display = "flex";
        document.querySelector(".login-register").style.display = "none";
        document.querySelector(".theme-container").style.display = "flex";

        setTimeout(function() {
            setTheme(); // TODO: prevent flashbang on reload
            document.querySelector(".navigation").style.display = "flex";
            document.querySelector(".footer").style.display = "flex";
            document.querySelector("#loading").style.display = "none";
            document.querySelector(".calculators").style.display = "flex";
        }, "50");
    }
}

function bondRepayment() {
    var P = document.querySelector("#purchaseprice").value - document.querySelector("#deposit").value;
    var r = (document.querySelector("#interest").value/100)/12;
    var n = document.querySelector("#term").value*12;
    var M = P*((r*(Math.pow((1+r), n)))/((Math.pow((1+r), n))-1));
    document.querySelector("#result1").value = M.toFixed(2);
}

function bondTransferCost() {
    var M = (parseFloat(document.querySelector("#purchase_price").value) + parseFloat(document.querySelector("#deposit_").value))*0.0275072346;
    document.querySelector("#result2").value = M.toFixed(2);
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

        var calculators = document.querySelectorAll(".calculator");
        calculators.forEach(function(calculator) {
            calculator.style.backgroundColor = "#e4e4e4";
            calculator.style.color = "#005c91";
            calculator.querySelector(".title").style.color = "#313133";

            labels = document.querySelectorAll(".cal-label");
            labels.forEach(function(label) {
                label.style.color = "#313133";
            });
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

        var calculators = document.querySelectorAll(".calculator");
        calculators.forEach(function(calculator) {
            calculator.style.backgroundColor = "#3E3E3E";
            calculator.style.color = "#ffffff";
            calculator.querySelector(".title").style.color = "#ffffff";

            labels = document.querySelectorAll(".cal-label");
            labels.forEach(function(label) {
                label.style.color = "#ffffff";
            });
        });

        document.querySelector(".footer").style.backgroundColor = "#3E3E3E";
        var footerParas = document.querySelectorAll(".author-container > p");
        footerParas.forEach(function(footerPara) {
            footerPara.style.color = "#ffffff";
        });

        document.querySelector(".empty").style.color = "#ffffff";
    }

    document.querySelector("#button3").style.backgroundColor = "#9A9B9B";
}