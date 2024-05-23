async function getCountryDetails() {
  try {
    var response = await fetch("https://restcountries.com/v3.1/all");
    let countries = await response.json();

    var count = countries.length;
    //var count = 3;

    var containerDiv = document.createElement("div"),
      heading = document.createElement("h1"),
      rowDiv = document.createElement("div");

    containerDiv.setAttribute("class", "container");
    heading.setAttribute("id", "title");
    heading.setAttribute("class", "text-center");
    heading.innerHTML = "REST Countries";
    rowDiv.setAttribute("class", "row");

    document.body.append(containerDiv);
    containerDiv.append(heading, rowDiv);

    for (i = 0; i < count; i++) {
      var collg4Div = document.createElement("div"),
        cardDiv = document.createElement("div"),
        cardBodyDiv = document.createElement("div"),
        cardBodyHearder = document.createElement("div"),
        cardImg = document.createElement("img"),
        cardContentDiv = document.createElement("div"),
        cardContentCapital = document.createElement("p"),
        cardContentRegion = document.createElement("p"),
        cardContentCountryCode = document.createElement("p"),
        // cardContentLatLng = document.createElement("p"),
        cardWeatherButton = document.createElement("button");

      collg4Div.setAttribute("class", "col-sm-6 col-md-4 col-lg-4 col-xl-4");
      collg4Div.setAttribute("id", "column");
      cardDiv.setAttribute("class", "card h-100");

      cardDiv.setAttribute("id", "gradient-background");

      // cardHeaderDiv.setAttribute("class", "card-header");
      cardBodyHearder.setAttribute("class", "card-header");
      cardBodyHearder.style.textAlign = "center";
      cardBodyDiv.setAttribute("class", "card-body");
      cardBodyDiv.style.textAlign = "center";
      //cardBodyDiv.setAttribute("id", "card-body");
      cardImg.setAttribute("class", "card-img-top");
      // cardContentCapital.setAttribute("class", "card-title content");
      cardContentDiv.setAttribute("class", "card-text");
      cardContentCapital.setAttribute("class", "card-title content");
      cardContentRegion.setAttribute("class", "card-title content");
      cardContentCountryCode.setAttribute(
        "class",
        "card-body card-title content"
      );
      //cardContentLatLng.setAttribute("class", "card-title content");
      // cardContentLatLng.setAttribute("id", "latlng");
      cardWeatherButton.setAttribute("class", "btn btn-primary");
      cardWeatherButton.setAttribute("type", "button");

      cardBodyHearder.innerHTML = countries[i].name.common;
      cardImg.setAttribute("src", countries[i].flags.png);
      //cardImg.style.width = "150px";
      cardContentCapital.innerHTML = "Capital: " + countries[i].capital;
      cardContentRegion.innerHTML = "Region: " + countries[i].region;
      cardContentCountryCode.innerHTML = "Country Code: " + countries[i].cca3;

      cardWeatherButton.textContent = "Click for Weather";

      //using closure to avoid index issues
      (function (index) {
        cardWeatherButton.addEventListener("click", () => {
          var lat = countries[index].latlng[0];
          var lng = countries[index].latlng[1];
          var country = countries[index].name.common;
          getWeather(country, lat, lng);
        });
      })(i);

      rowDiv.append(collg4Div);
      //collg4Div.append(colsm12Div);
      collg4Div.append(cardDiv);
      // cardDiv.append(cardHeaderDiv);
      cardDiv.append(cardBodyHearder, cardBodyDiv);
      //cardHeaderDiv.append();

      cardBodyDiv.append(cardImg, cardContentDiv, cardWeatherButton);
      cardContentDiv.append(
        cardContentCapital,
        cardContentRegion,
        cardContentCountryCode
      );
    }
  } catch (e) {
    console.log(e);
  }
}

async function getWeather(country, latitude, longitude) {
  let weatherdata = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0e7160dfc0fa55f2d6cd7162440b7f0d`
  );

  let response = await weatherdata.json();

  alert(
    country +
      "'s" +
      " Current Temperature is " +
      response.main.temp +
      " and Humidity is " +
      response.main.humidity
  );
}

getCountryDetails();
