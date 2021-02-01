var APIKey = "eeae76131291ea13fc8e4cd946e40faf";

//todo link local storge to save searches
//todo

$(document).ready(function () {
  var locationSearch = function (location) {
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
      //   var tempF = Math.floor(response.main.temp - 273.15) * 1.8 + 32;
      //   $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      //   $(".wind").text("Wind speed: " + response.wind.speed);
      //   $(".humidity").text("Humidity: " + response.main.humidity);
      //   $(".temp").text("Current temp in F: " + tempF);
    });
  };
  locationSearch("Denver,Colorado");
});
