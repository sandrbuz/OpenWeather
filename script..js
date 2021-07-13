let btnGet = document.querySelector('.btn');
let btnFahr = document.querySelector('.fahr');
let btnCels = document.querySelector('.cels');



const getWeather = (cityName) => {
    if (cityName) {


        document.querySelector('.filter').style.display = 'block';
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=655fdcf1aed1280abf8e870e95b28149`)

            .then(resp => resp.json())
            .then(data => {
                console.log(data);



                document.querySelector('.city-name-error').textContent = '';

                document.querySelector('.filter').style.display = 'none';


                document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like - 273) + '&#8451;';
                document.querySelector('.wind-value').innerHTML = data.wind.speed + ' m/s';
                document.querySelector('.hum-value').innerHTML = data.main.humidity + '%';
                document.querySelector('.press-value').innerHTML = data.main.pressure + ' hPa';

                document.querySelector('.city').textContent = data.name;
                document.querySelector('.country').textContent = data.sys.country;
                document.querySelector('.weather').textContent = data.weather[0]['description'];

                if (cityName.length > 13) {
                    document.querySelector('.city').style.fontSize = '30px';
                    document.querySelector('.city').style.marginTop = '30px';
                } else {
                    document.querySelector('.city').style.fontSize = '60px';
                    document.querySelector('.city').style.marginTop = '0px';

                }

                let val = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
                $('#icon').attr('src', val);

                //   ---------------------------------------------------
                //     btnCels.disabled = true;
                //     btnFahr.disabled = false;

                //     btnFahr.addEventListener('click', function () {
                //         document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8457;';
                //         btnFahr.disabled = true;
                //         btnCels.disabled = false;
                //         document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like) + '&#8451';
                //     });
                //     btnCels.addEventListener('click', function () {
                //         document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                //         btnCels.disabled = true;
                //         btnFahr.disabled = false;
                //         document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like - 273) + '&#8451;';



                //     });
                //     ---------------------------------------------------
                // function gradus() {
                // const chb = document.querySelector('.chbox')
                // if (chb.checked) {
                //     alert('Выбран');
                //     document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8457;';

                // }
                // else {
                //     document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';

                //     alert('Не выбран');
                // }
                // }
                //   ---------------------------------------------------
                $(":checkbox").change(function () {
                    if (this.checked) {
                        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8457;';
                        document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like) + '&#8457';

                    } else {
                        document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                        document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like - 273) + '&#8451;';

                    }
                });
                //    ----------------------------------------------------------- 
                // if (window.innerWidth < 350) {

                //     if (cityName = 'Saint Petersburg') {
                //         document.querySelector('.city').style.color = 'red';

                //     } else {
                //         document.querySelector('.city').style.color = 'green';

                //     }

                // }



                // ----------------------------------------------------------------------------
                // current time
                d = new Date();
                localTime = d.getTime();
                localOffset = d.getTimezoneOffset() * 60000;
                utc = localTime + localOffset;
                var cit = utc + (1000 * data.timezone);

                var date = new Date(cit);
                var h, m, s;
                h = date.getHours();
                m = date.getMinutes();
                mth = date.getMonth();
                d = date.getDate();

                let arrMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                let mo = arrMonth[mth];

                if (m < 10) {
                    var correct_date = h + ':' + '0' + m + ' ' + mo + ' ' + d;
                } else {
                    var correct_date = h + ':' + m + ' ' + mo + ' ' + d;
                }

                document.querySelector('.time').innerHTML = correct_date;
                document.querySelector('.time-s1').innerHTML = correct_date;


                // ------------------------------------------------------------------------

            })
            .catch(function () {

                document.querySelector('.city-name-error').textContent = 'Not found';

            })
    }
    else {
        document.querySelector('.city-name-error').textContent = 'Bad request';

    }
}

// default city
getWeather('Moscow');

// On btnGet
let userInput = document.querySelector('.inp');
btnGet.addEventListener('click', function () {
    const cityName = userInput.value;
    getWeather(cityName)

})


// on key Press (Enter)
userInput.onkeypress = function (event) {

    if (event.key == 'Enter') {
        const cityName = userInput.value;
        getWeather(cityName)
    }
}

