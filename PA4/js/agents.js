/* Reece Jordaan u23547104*/

// Reasoning: I chose synchronous AJAX calls because the sequential nature of synchronous AJAX calls increased the reliablility
// of my website since I certain that the request would be finished by the time I need to use the returned data.

var agentsCount = 500;

function loadPage() {
    if(localStorage.getItem("apikey") == null) {
        document.querySelector(".agents").style.display = "none";
        document.querySelector("#loading").style.display = "none";
        document.querySelector(".login-to-view").style.display = "block";
        document.querySelector(".user-info").style.display = "none";
        document.querySelector(".login-register").style.display = "flex";
        document.querySelector(".theme-container").style.display = "none";
        document.querySelector(".navigation").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";
        document.querySelector("#button2").style.backgroundColor = "#9A9B9B";
    }else {
        setTheme();
        document.querySelector(".agents").style.display = "none";
        document.querySelector("#loading").style.display = "block";
        document.querySelector(".login-to-view").style.display = "none";
        document.querySelector(".user-info").style.display = "flex";
        document.querySelector(".login-register").style.display = "none";
        document.querySelector(".theme-container").style.display = "flex";

        setTimeout(function() {
            populatePage();
            setTheme(); // TODO: prevent flashbang on reload
            document.querySelector(".navigation").style.display = "flex";
            document.querySelector(".footer").style.display = "flex";
            document.querySelector("#loading").style.display = "none";
            document.querySelector(".agents").style.display = "flex";
        }, "50");
    }
}

function populatePage() {
    var agentsInfo = new XMLHttpRequest();
    agentsInfo.open("POST", "https://wheatley.cs.up.ac.za/api/", false);

    var text = {studentnum:"u23547104",
    apikey:"45ef79b2fde631bc3dc11a0c2a3a3ba2",
    type:"GetAllAgents",
    limit:agentsCount
    };

    agentsInfo.setRequestHeader('Content-Type', 'application/json');
    agentsInfo.send(JSON.stringify(text));
    var agentsInfoJSON = JSON.parse(agentsInfo.responseText);

    var agentsDiv = document.querySelector("body > div.agents");
    agentsDiv.replaceChildren();

    for(var i = 0; i < agentsInfoJSON.data.length; i++) {
        var agentImg = new XMLHttpRequest();
        agentImg.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?agency=" + agentsInfoJSON.data[i].name, false);
        agentImg.send();

        var col = document.createElement("div");
        col.className = "column";
        col.id = "column" + i;
        agentsDiv.appendChild(col);

        var img = document.createElement("img");
        img.className = "agentImg";
        img.alt = "agent " + i;
        img.style.objectFit = "cover";
        img.style.width = "100%";

        if(agentImg.status == 200) {
            img.src = JSON.parse(agentImg.responseText).data;   
        }

        col.appendChild(img);

        var agent = document.createElement("div");
        agent.className = "agent";
        col.appendChild(agent);

        agent.innerHTML = agentsInfoJSON.data[i].name;

        var features = document.createElement("p");
        features.className = "features";
        features.innerHTML = agentsInfoJSON.data[i].description;
        agent.appendChild(features);

        var link = document.createElement("a");
        link.className = "link";
        link.href = agentsInfoJSON.data[i].url;
        link.target = "_blank";
        link.innerHTML = "🌐 Website";
        agent.appendChild(link);
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

        var agents = document.querySelectorAll(".agent");
        agents.forEach(function(agent) {
            agent.style.backgroundColor = "#e4e4e4";
            agent.style.color = "#005c91";
            agent.querySelector(".features").style.color = "#313133";
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

        var agents = document.querySelectorAll(".agent");
        agents.forEach(function(agent) {
            agent.style.backgroundColor = "#3E3E3E";
            agent.style.color = "#ffffff";
            agent.querySelector(".features").style.color = "#ffffff";
        });

        document.querySelector(".footer").style.backgroundColor = "#3E3E3E";
        var footerParas = document.querySelectorAll(".author-container > p");
        footerParas.forEach(function(footerPara) {
            footerPara.style.color = "#ffffff";
        });

        document.querySelector(".empty").style.color = "#ffffff";
    }

    document.querySelector("#button2").style.backgroundColor = "#9A9B9B";
}