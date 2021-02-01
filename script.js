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
  //
  //
  var locationResult = function (location) {
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      "&appid=" +
      APIKey;

    var forecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
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
    $.ajax({
      url: forecast,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  };
  //   locationResult("Seoul"); //*this is the default location

  //! Button results
  $("#searchbtn").on("click", function buttons() {
    event.preventDefault();
    var inputCity = $("#locationInput").val();
    console.log(inputCity);
    localStorage.setItem("City", inputCity);
    locationResult(inputCity);
  });

  locationResult(localStorage.getItem("City"));
});
