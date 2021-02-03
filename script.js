var APIKey = "eeae76131291ea13fc8e4cd946e40faf";

//todo link local storge to save searches
//todo event listener for search city tie in above todo   use .trim()
//todo add enter press
//todo  icon rep
// todo UV color corresponding identifiers
//todo 5 day forecast that displays the date, icon rep if condisitons, temp, and humidity
//todo search histroy need to go into  a button that can recall it - goes into already created event lsitener
//*"history button"
//todo

$(document).ready(function () {
  //

  var locationResult = function (location) {
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
      var iconUrl =
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      $("#currentCity")
        .html(
          "<h2 >" +
            response.name +
            "&nbsp" +
            "<img src='" +
            iconUrl +
            "'>" +
            "</h2>" +
            "<ul >" +
            "Temperature: " +
            tempF +
            " °F" +
            "</ul>" +
            "<ul >" +
            "Humidity: " +
            response.main.humidity +
            "%" +
            "</ul>" +
            "<ul>" +
            "Wind Speed: " +
            response.wind.speed +
            " MPH" +
            "</ul>"
        )
        .addClass("currentCity");

      var forecast =
        "https://api.openweathermap.org/data/2.5/onecall?" +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=45e45c0bb2ef540df33fa21a29aafa8a";

      $.ajax({
        url: forecast,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        var fiveDay = response.daily;

        for (i = 0; i < 5; i++) {
          let unix_timestamp = fiveDay[i].dt;
          var date = new Date(unix_timestamp * 1000).toLocaleDateString(
            "en-US"
          );
          var fivedayIcon =
            "http://openweathermap.org/img/w/" +
            fiveDay[i].weather[0].icon +
            ".png";
          $("." + [i] + "forecastDate").html(date);
          var tempF = fiveDay[i].temp.day.toFixed(1);
          $("." + [i] + "forecastTemp").html(tempF + "° F");
          $("." + [i] + "forecastHumidity").html(
            "Humidity: " + fiveDay[i].humidity + "%"
          );
          $("." + [i] + "forecastIcon").attr("src", fivedayIcon); //! THIS
          console.log(fivedayIcon);
        }

        $("#currentCity").append(
          "<button id='uvIndex'>" +
            "UV Index: " +
            response.current.uvi +
            "</button>" +
            "</div>"
        );

        if (response.current.uvi <= 2) {
          $("#uvIndex").addClass("green");
        } else if (response.current.uvi <= 5) {
          $("#uvIndex").addClass("yellow");
        } else if (response.current.uvi <= 10) {
          $("#uvIndex").addClass("red");
        } else if (response.current.uvi <= 40) {
          $("#uvIndex").addClass("purple");
        }
        $("#currentCity").text();
      });
    });
  };
  //   locationResult("Seoul"); //*this is the default location

  //! Button results
  $("#searchbtn").on("click", function buttons() {
    var searchedCities = [];
    var inputCity = $("#locationInput").val();
    event.preventDefault();

    searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    searchedCities.push(inputCity);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
    console.log(inputCity);
    $("#cityButtons").prepend(
      "<div class='list-group' >" +
        "<button class='list-group-item'>" +
        inputCity +
        "</button>"
    );
    locationResult(inputCity);
  });

  var history = JSON.parse(window.localStorage.getItem("searchedCities")) || [];
  if (history.length > 0) {
    locationResult(history[history.length - 1]);
  }

  //! fix this
  if (history.length === 0) {
    $(".cardBox").addClass("hide");
  }

  function showCities() {
    $("#cityButtons").empty();
    var arrayFromStorage =
      JSON.parse(localStorage.getItem("searchedCities")) || [];

    for (var i = 0; i < arrayFromStorage.length; i++) {
      var cityNameFromArray = arrayFromStorage[i];
      $("#cityButtons").prepend(
        "<div class='list-group' >" +
          "<button class='list-group-item'>" +
          cityNameFromArray +
          "</button>"
      );
    }
  }
  //
  showCities();

  $("#cityButtons").on("click", ".list-group-item", function (event) {
    event.preventDefault();
    var cityInput = $(this).text();

    locationResult(cityInput);
  });
});
