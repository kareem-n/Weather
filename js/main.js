async function api(country) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=fdac17cf896b4d0889e132524220206&q=${country}&days=3&aqi=no&alerts=no
	`
  );
  var final = await response.json();
  display(final);
}

var search = document.querySelector("#search");
var find = document.querySelector("#find");

var list = document.querySelector(".list");

search.addEventListener("keyup", async function () {
  var response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=fdac17cf896b4d0889e132524220206&q=${search.value}&days=3&aqi=no&alerts=no
		`
  );
  var final = await response.json();

  var temp = ``;
  for (var i = 0; i < final.length; i++) {
    list.classList.replace("d-none", "d-block");
    temp += `
		<li class="px-3 item py-1">${final[i].name}</li>
		`;
  }
  document.querySelector(".list ul").innerHTML = temp;
  var items = document.querySelectorAll(".item");

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function (e) {
      var x = e.target;
      api(x.innerHTML);
      list.classList.replace("d-block", "d-none");
    });
  }
});

(function () {
  api("cairo");
})();

function display(final) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date();

  var dayName = days[d.getDay()];
  var nextDayName;
  var nextDayName2;
  if (d.getDay() == 6) {
    nextDayName = days[0];
    nextDayName2 = days[1];
  } else if (d.getDay() == 5) {
    nextDayName = days[6];
    nextDayName2 = days[0];
  } else {
    nextDayName = days[d.getDay() + 1];
    nextDayName2 = days[d.getDay() + 2];
  }

  console.log(nextDayName2);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[d.getMonth()];

  var temp = `
  <div class="col-lg-4 box-color overflow-hidden p-0 rounded-3">
    <div class="top p-2 d-flex justify-content-between">
      <h6>${dayName}</h6>
      <h6>${d.getDay()} ${month}</h6>
    </div>
    <div class="p-4">
      <h5 class="my-2">${final.location.name}</h5>
      <div class="d-flex align-items-center">
        <h1 class="me-4 large-font">${
          final.current.temp_c
        }<span>&#176;</span>c</h1>
        <img src="${final.current.condition.icon}" />
      </div>
      <h5 class="py-3 statues">${final.current.condition.text}</h5>
      <div class="row py-2">
        <div class="col d-flex align-items-center">
          <i class="fa-solid me-2 fa-umbrella"></i>
          <p class="p-0 m-0">${final.current.humidity}%</p>
        </div>
        <div class="col d-flex align-items-center">
          <i class="fa-solid me-2 fa-wind"></i>
          <p class="p-0 m-0">${final.current.wind_mph} m/h</p>
        </div>
        <div class="col d-flex align-items-center">
          <i class="fa-solid me-2 fa-compass"></i>
          <p class="p-0 m-0">${final.current.wind_dir}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-4 box-center-color overflow-hidden p-0 rounded-3">
      <div class="top-cetner p-2 d-flex justify-content-center">
        <h6>${nextDayName}</h6>
      </div>
      <div class="text-center p-5">
        <img src="${final.forecast.forecastday[1].day.condition.icon}"  />
        <h3>${
          final.forecast.forecastday[1].day.maxtemp_c
        }<span>&#176;</span>c</h3>
        <p class="m-0">${
          final.forecast.forecastday[1].day.mintemp_c
        }<span>&#176;</span>c</p>
        <p class="statues fs-5 my-3">${
          final.forecast.forecastday[1].day.condition.text
        }</p>
        </div>
     </div>
     
	<div class="col-lg-4 box-color overflow-hidden p-0 rounded-3">
		  <div class="top p-2 d-flex justify-content-center">
			  <h6>${nextDayName2}</h6>
		  </div>
		  <div class="text-center p-5">
		    <img src="${final.forecast.forecastday[2].day.condition.icon}"  />
		    <h3>${final.forecast.forecastday[2].day.maxtemp_c}<span>&#176;</span>c</h3>
		    <p class="m-0">${
          final.forecast.forecastday[2].day.mintemp_c
        }<span>&#176;</span>c</p>
		    <p class="statues fs-5 my-3">${
          final.forecast.forecastday[2].day.condition.text
        }</p>
		  </div>
		</div>
 
  `;
  document.getElementById("row").innerHTML = temp;
}
