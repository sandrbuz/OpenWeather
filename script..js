let btnGet = document.querySelector(".btn-get");
let btnFahr = document.querySelector(".fahr");
let btnCels = document.querySelector(".cels");
let chbox = document.querySelector('#chboxid');

const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = '655fdcf1aed1280abf8e870e95b28149';





const getWeather = (cityName) => {
    if (cityName) {
        document.querySelector(".filter").style.display = "block";
        fetch(
            `${BASE_URL}/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
        )
            .then((resp) => resp.json())
            .then((data) => {
                document.querySelector(".city-name-error").textContent = "";
                document.querySelector(".filter").style.display = "none";

                document.querySelector(".temp").innerHTML =
                    Math.round(data.main.temp - 273) + "&#8451;";
                document.querySelector(".feel-value").innerHTML =
                    Math.round(data.main.feels_like - 273) + "&#8451;";
                document.querySelector(".wind-value").innerHTML =
                    data.wind.speed + " m/s";
                document.querySelector(".hum-value").innerHTML =
                    data.main.humidity + "%";
                document.querySelector(".press-value").innerHTML =
                    data.main.pressure + " hPa";



                // if (cityName == 'Saint Petersburg' || cityName == 'Санкт Петербург' || cityName == 'saint petersburg' || cityName == 'санкт петербург') {
                //     document.querySelector('.city').textContent = "Saint P."
                // } else if (cityName == 'New York' || cityName == 'new york') {
                //     document.querySelector('.city').textContent = "New Y."
                // } else if (cityName == 'Los Angeles' || cityName == 'Los angeles' || cityName == 'los angeles') {
                //     document.querySelector('.city').textContent = "Los Ang."
                // } else {
                //     document.querySelector(".city").textContent = data.name;
                // }

                document.querySelector(".city").textContent = data.name;
                document.querySelector(".country").textContent = data.sys.country;
                document.querySelector(".weather").textContent = data.weather[0]["description"];

                if (/[\s]/gi.test(document.querySelector(".city").textContent) && cityName.length >= 8) {
                    var cityText = document.querySelector(".city");
                    var indOfSpace = cityText.textContent.indexOf(' ');
                    cityText.textContent = cityText.textContent.slice(0, indOfSpace) + cityText.textContent.slice(indOfSpace, indOfSpace + 2) + '.';
                }


                // if (cityName.length > 13) {
                // document.querySelector(".city").textContent = data.name.slice(0, 5);
                // document.querySelector(".city").style.fontSize = "30px";
                // document.querySelector(".city").style.marginTop = "30px";
                // } else {
                //     document.querySelector(".city").style.fontSize = "60px";
                //     document.querySelector(".city").style.marginTop = "0px";
                // }

                let val = `http://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
                $("#icon").attr("src", val);

                //   ---------------------------------------------------
                // document.querySelector('.chbox').checked = "true";

                $(":checkbox").change(function () {
                    if (this.checked) {
                        document.querySelector(".temp").innerHTML =
                            Math.round(data.main.temp) + "&#8457;";
                        document.querySelector(".feel-value").innerHTML =
                            Math.round(data.main.feels_like) + "&#8457";
                    } else {
                        document.querySelector(".temp").innerHTML =
                            Math.round(data.main.temp - 273) + "&#8451;";
                        document.querySelector(".feel-value").innerHTML =
                            Math.round(data.main.feels_like - 273) + "&#8451;";
                    }
                });

                if (chbox.checked = true) {
                    chbox.checked = false;
                }

                //    -----------------------------------------------------------
                // ask Joseph



                // if (window.outerWidth < 350) {

                //     if (cityName.indexOf(' ') >= 0 && cityName.length > 12) {
                //         document.querySelector('.city').style.fontSize = '10px !important';

                //     } else {
                //         document.querySelector('.city').style.fontSize = '30px';

                //     }

                // }






                // ----------------------------------------------------------------------------
                // current time
                d = new Date();
                localTime = d.getTime();
                localOffset = d.getTimezoneOffset() * 60000;
                utc = localTime + localOffset;
                var cit = utc + 1000 * data.timezone;

                var date = new Date(cit);
                var h, m, s;
                h = date.getHours();
                m = date.getMinutes();
                mth = date.getMonth();
                d = date.getDate();

                let arrMonth = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                let mo = arrMonth[mth];

                if (m < 10) {
                    var correct_date = h + ":" + "0" + m + " " + mo + " " + d;
                } else {
                    var correct_date = h + ":" + m + " " + mo + " " + d;
                }

                document.querySelector(".time").innerHTML = correct_date;
                document.querySelector(".time-s1").innerHTML = correct_date;

                // ------------------------------------------------------------------------
            })
            .catch(function () {
                document.querySelector(".city-name-error").textContent = "Not found";
            });
    } else {
        document.querySelector(".city-name-error").textContent = "Bad request";
    }
};

// default city
getWeather("Moscow");

// On btnGet
let userInput = document.querySelector(".inp");
btnGet.addEventListener("click", function () {
    const cityName = userInput.value;
    getWeather(cityName);
});

// on key Press (Enter)
userInput.onkeypress = function (event) {
    if (event.key == "Enter") {
        const cityName = userInput.value;
        getWeather(cityName);
    }
};
